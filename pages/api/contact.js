import { render } from "@react-email/render";
import WelcomeTemplate from "../../emails/WelcomeEmail";
import { sendEmail } from "../../lib/email";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  // Get data submitted in request's body.
  const { name, email, message } = req.body;
  // Optional logging to see the responses in the command line where the
  // Next.js app is running.

  // Guard clause checks for email and returns early if it is not found.
  if (!name || !email || !message) {
    // Sends a HTTP bad request error code.
    return res.status(400).json({
      error: "One or more of the following not found: name, email, message",
    });
  }
  try {
    await sendEmail({
      // to: process.env.COMPANY_EMAIL,
      to: "cenenaci.cz@gmail.com",
      subject: "Nová zpráva - PES Design",
      html: `
      <h2>New message from ${name}</h2>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error sending message" });
  }
  return res.status(200).json({ message: "Email sent successfully" });

  // Here, you could send the message to a service like Supabase to read later.
  //
  // This is just an example, so we won't do anything except redirect back to
  // the homepage.
}
