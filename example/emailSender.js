import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false, // Disable SSL for local server
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  ignoreTLS: true,
});

export async function sendEmail(email) {
  try {
    const mailOptions = {
      from: "test@myapp.com",
      to: email,
      subject: "Email verification",
      text: `This is a demo email. Do not reply back`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Mock Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
sendEmail("one@mail.com")