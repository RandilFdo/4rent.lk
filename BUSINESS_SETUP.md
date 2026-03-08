# Business Registration Package System Setup

This document provides setup instructions for the Business Registration Package system integrated into your 4Rent application.

## Features Implemented

✅ **Database Models**: Business and RefundRequest models added to Prisma schema
✅ **API Endpoints**: Complete REST API for business registration and management
✅ **PayHere Integration**: Recurring payment system (LKR 1,500/month)
✅ **Frontend Pages**: Business registration, dashboard, and refund request pages
✅ **Email Notifications**: SendGrid integration for trial and payment reminders
✅ **Admin Dashboard**: Refund request management for administrators
✅ **Security**: PayHere webhook validation and authentication

## Environment Variables Required

Add these to your `.env.local` file:

```env
# PayHere Configuration
PAYHERE_MERCHANT_ID="your-merchant-id"
PAYHERE_MERCHANT_SECRET="your-merchant-secret"
PAYHERE_BASE_URL="https://sandbox.payhere.lk/pay/checkout" # Use https://www.payhere.lk/pay/checkout for production

# SendGrid Email Service
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@4rent.lk"

# Cron Job Security
CRON_SECRET="your-cron-secret-for-email-reminders"
```

## Setup Instructions

### 1. Database Migration

Run the Prisma migration to add the new models:

```bash
npx prisma db push
```

### 2. Install Dependencies

The required dependencies are already installed:
- `@sendgrid/mail` - For email notifications
- `crypto-js` - For PayHere signature validation

### 3. PayHere Setup

1. Register at [PayHere.lk](https://www.payhere.lk)
2. Get your Merchant ID and Secret
3. Configure webhook URL: `https://yourdomain.com/api/business/payhere-webhook`
4. Set up recurring payment settings in PayHere dashboard

### 4. SendGrid Setup

1. Create account at [SendGrid](https://sendgrid.com)
2. Generate API key
3. Verify sender email address
4. Configure domain authentication (recommended)

### 5. Cron Job Setup

Set up a cron job to send email reminders:

```bash
# Run every day at 9 AM
0 9 * * * curl -X GET "https://yourdomain.com/api/cron/email-reminders" -H "Authorization: Bearer your-cron-secret"
```

Or use a service like:
- **Vercel Cron Jobs** (if using Vercel)
- **GitHub Actions** with scheduled workflows
- **AWS Lambda** with EventBridge
- **cron-job.org** (free service)

## API Endpoints

### Business Registration
- `POST /api/business/register` - Register new business
- `GET /api/business/my-business` - Get user's business details
- `POST /api/business/subscribe` - Initiate PayHere subscription
- `POST /api/business/payhere-webhook` - PayHere payment webhook
- `POST /api/business/request-refund` - Submit refund request

### Admin Endpoints
- `GET /api/business/admin/refunds` - Get all refund requests
- `PUT /api/business/admin/refunds` - Update refund request status

### Cron Jobs
- `GET /api/cron/email-reminders` - Send email reminders

## Frontend Pages

- `/business/register` - Business registration form
- `/business/dashboard` - Business management dashboard
- `/business/refund` - Refund request submission
- `/business/payment/success` - Payment success page
- `/business/payment/cancel` - Payment cancellation page
- `/admin/refunds` - Admin refund management (admin only)

## Business Flow

### 1. Registration
1. User clicks "Become a Business" in navbar
2. Fills registration form with business details
3. Gets 30-day free trial automatically
4. Redirected to business dashboard

### 2. Trial Period
1. Can list unlimited properties/vehicles
2. Receives email reminder 5 days before trial ends
3. Can subscribe anytime during trial

### 3. Subscription
1. Click "Subscribe Now" in dashboard
2. Redirected to PayHere payment page
3. PayHere processes LKR 1,500/month recurring payment
4. Webhook updates business status to "active"

### 4. Active Subscription
1. Full access to all features
2. Receives payment reminder 3 days before due date
3. Automatic renewal via PayHere

### 5. Refund System
1. Business can request refunds via dashboard
2. Admin reviews requests in admin panel
3. Manual processing via PayHere dashboard

## Email Notifications

The system sends automated emails for:
- **Trial ending soon** (5 days before)
- **Payment due soon** (3 days before)
- **Trial expired** (when trial ends)
- **Payment failed** (when recurring payment fails)

## Security Features

- PayHere webhook signature validation
- User authentication required for all business operations
- Admin-only access to refund management
- Secure API key storage
- Input validation and sanitization

## Testing

### PayHere Sandbox
- Use sandbox environment for testing
- Test webhook with ngrok or similar tool
- Verify payment flows work correctly

### Email Testing
- SendGrid provides email activity logs
- Test with real email addresses
- Verify email templates render correctly

## Production Deployment

1. Update PayHere to production URLs
2. Configure production SendGrid settings
3. Set up production cron jobs
4. Test all payment flows
5. Monitor webhook logs
6. Set up error monitoring

## Support

For issues or questions:
1. Check PayHere documentation
2. Review SendGrid logs
3. Monitor application logs
4. Test webhook endpoints

## Next Steps

Consider implementing:
- Advanced analytics dashboard
- Business verification system
- Bulk listing tools
- Advanced payment options
- Mobile app integration
- API rate limiting
- Advanced email templates
- Business performance metrics
