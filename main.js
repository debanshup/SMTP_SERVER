import { SMTPServer } from 'smtp-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Step 1: Get the current directory in ES Module
const __filename = fileURLToPath(import.meta.url); // Get the filename
const __dirname = path.dirname(__filename); // Get the directory name

// Step 2: Define the directory path
const emailDir = path.join(__dirname, 'emails');

// Step 3: Create SMTP server
const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    let emailContent = '';

    // Step 4: Check if the 'emails' directory exists
    if (!fs.existsSync(emailDir)) {
      fs.mkdirSync(emailDir, { recursive: true, }); // Create the directory if it doesn't exist
    }

    // Step 5: Collect email content as it streams
    stream.on('data', (chunk) => {
      emailContent += chunk.toString(); // Convert chunk to string
    });

    stream.on('end', () => {
      // Step 6: Generate a unique filename based on timestamp
      const timestamp = Date.now(); // Get the current timestamp
      const emailFileName = `email_${timestamp}.eml`; // Create unique filename
      const emailFilePath = path.join(emailDir, emailFileName); // Define the full path

      // Step 7: Write the email content to the new file
      fs.writeFileSync(emailFilePath, emailContent);
      console.log(`Email saved as ${emailFileName}`);
      
      callback(null); // End the process
    });
  }
});

// Step 8: Start SMTP server
server.listen(1025, () => {
  console.log('SMTP Server is running on port 1025');
});





// issue in saving token