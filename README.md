
---

# SMTP Server

This project implements a **simple SMTP server** for sending and receiving emails without relying on third-party email services. It allows users to mock email functionality and test email-based workflows.

## Features

- Send and receive emails locally.
- Mock email functionality for development and testing.
- Avoid reliance on third-party email providers.

## Prerequisites

- **Node.js** installed on your system.
- Basic understanding of networking and SMTP protocols.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/debanshup/SMTP_SERVER.git
   cd SMTP_SERVER
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

1.  **Start the SMTP server**:

    ```bash
    npm start
    ```

    The server will start and listen on the default port. You can modify the port in the code if needed.

2.  **Configure email client**:

    - Use `localhost` as the SMTP server.
    - Set the same port as in the server.

3.  **Test sending an email**:

    - Use any email client or a script to send an email to the server.
    - Example using `nodemailer`:
      ```javascript
      const nodemailer = require('nodemailer');

           const transporter = nodemailer.createTransport({

      host: "localhost",
      port: 1025,
      secure: false, // Disable SSL for local server
      tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
      },
      ignoreTLS: true,
      });

           transporter.sendMail({
             from: 'sender@example.com',
             to: 'receiver@example.com',
             subject: 'Test Email',
             text: 'Hello, this is a test!',
           }, (error, info) => {
             if (error) {
               return console.log(error);
             }
             console.log('Message sent: %s', info.messageId);
           });
           ```

## Configuration

- Modify the port and other server parameters inside `main.js`.
- Add additional handlers for incoming emails if needed.

## Contributing

Feel free to submit issues or pull requests to enhance this project.

## License

This project is licensed under the **MIT License**.

---
