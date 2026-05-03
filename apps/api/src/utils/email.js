/**
 * Email utility — stub for sending emails.
 * Replace sendEmail with a real provider (nodemailer, SendGrid, etc.)
 */

async function sendEmail({ to, subject, html, text }) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📧 [EMAIL STUB] To: ${to} | Subject: ${subject}`);
    return { success: true, stub: true };
  }
  // TODO: integrate real email provider
  throw new Error('Email provider not configured. Set NODE_ENV=development to use stub.');
}

function passwordResetEmail(to, resetUrl) {
  return sendEmail({
    to,
    subject: 'Reset Your HRMS Password',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`,
    text: `Reset your password at: ${resetUrl}`,
  });
}

function welcomeEmail(to, name) {
  return sendEmail({
    to,
    subject: 'Welcome to HRMS',
    html: `<h1>Welcome, ${name}!</h1><p>Your account has been created.</p>`,
    text: `Welcome, ${name}! Your account has been created.`,
  });
}

module.exports = { sendEmail, passwordResetEmail, welcomeEmail };
