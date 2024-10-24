import { SMTPServer } from "smtp-server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const emailDir = path.join(__dirname, "received_emails");

// Create SMTP server
const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    let emailContent = "";

    if (!fs.existsSync(emailDir)) {
      fs.mkdirSync(emailDir, { recursive: true }); // Create the directory if it doesn't exist
    }

    stream.on("data", (chunk) => {
      emailContent += chunk.toString(); // Convert chunk to string
    });

    stream.on("end", () => {
      // Generate a unique filename based on timestamp
      const timestamp = Date.now(); 
      const emailFileName = `email_${timestamp}.eml`;
      const emailFilePath = path.join(emailDir, emailFileName);

      // Write the email content to the new file
      fs.writeFileSync(emailFilePath, emailContent);
      console.log(`Email saved as ${emailFileName}`);

      callback(null); // End the process
    });
  },
});

// Start SMTP server
server.listen(1025, () => {
  console.log("SMTP Server is running on port 1025");
});
