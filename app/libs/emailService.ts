import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (emailData: EmailData) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid not configured, email would be sent:', emailData);
      return { success: true, message: 'Email logged (SendGrid not configured)' };
    }

    const msg = {
      to: emailData.to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@4rent.lk',
      subject: emailData.subject,
      text: emailData.text || emailData.subject,
      html: emailData.html,
    };

    await sgMail.send(msg);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

// Email templates
export const emailTemplates = {
  trialReminder: (businessName: string, trialEndDate: string) => ({
    subject: 'Your 4Rent Business Trial Ends Soon',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Trial Ending Soon - ${businessName}</h2>
        <p>Hello,</p>
        <p>Your 4Rent business trial will end on <strong>${trialEndDate}</strong>.</p>
        <p>To continue enjoying unlimited listings and premium features, please subscribe to our business plan.</p>
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Business Plan Benefits:</h3>
          <ul>
            <li>Unlimited property and vehicle listings</li>
            <li>Priority support</li>
            <li>Featured listing options</li>
            <li>Advanced analytics</li>
          </ul>
          <p><strong>Price: LKR 1,500/month</strong></p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/business/dashboard" 
           style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Subscribe Now
        </a>
        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `
  }),

  paymentReminder: (businessName: string, nextPaymentDate: string) => ({
    subject: 'Payment Due Soon - 4Rent Business',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Payment Due Soon - ${businessName}</h2>
        <p>Hello,</p>
        <p>Your next payment of <strong>LKR 1,500</strong> is due on <strong>${nextPaymentDate}</strong>.</p>
        <p>Please ensure your payment method is up to date to avoid service interruption.</p>
        <a href="${process.env.NEXTAUTH_URL}/business/dashboard" 
           style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Manage Subscription
        </a>
        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `
  }),

  trialExpired: (businessName: string) => ({
    subject: 'Trial Expired - 4Rent Business Account Suspended',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">Trial Expired - ${businessName}</h2>
        <p>Hello,</p>
        <p>Your 4Rent business trial has expired. Your account has been suspended.</p>
        <p>To reactivate your account and continue listing, please subscribe to our business plan.</p>
        <div style="background-color: #FEF2F2; border: 1px solid #FECACA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #DC2626;">Account Status: Suspended</h3>
          <p>Your listings are no longer visible to customers. Subscribe now to reactivate your account.</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/business/dashboard" 
           style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reactivate Account
        </a>
        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `
  }),

  paymentFailed: (businessName: string) => ({
    subject: 'Payment Failed - 4Rent Business Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC2626;">Payment Failed - ${businessName}</h2>
        <p>Hello,</p>
        <p>We were unable to process your payment for your 4Rent business subscription.</p>
        <p>Please update your payment method to avoid service interruption.</p>
        <div style="background-color: #FEF2F2; border: 1px solid #FECACA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #DC2626;">Action Required</h3>
          <p>Please update your payment information to continue using our services.</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/business/dashboard" 
           style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Update Payment Method
        </a>
        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `
  })
};
