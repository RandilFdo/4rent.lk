import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { sendEmail, emailTemplates } from '@/app/libs/emailService';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (add your cron secret)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const fiveDaysFromNow = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000));
    const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));

    // Find businesses with trial ending in 5 days
    const trialEndingSoon = await prisma.business.findMany({
      where: {
        status: 'trial',
        trialEndDate: {
          gte: now,
          lte: fiveDaysFromNow
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    // Find businesses with payment due in 3 days
    const paymentDueSoon = await prisma.business.findMany({
      where: {
        status: 'active',
        nextPaymentDue: {
          gte: now,
          lte: threeDaysFromNow
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    // Find expired trials
    const expiredTrials = await prisma.business.findMany({
      where: {
        status: 'trial',
        trialEndDate: {
          lt: now
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    const results = {
      trialReminders: 0,
      paymentReminders: 0,
      expiredNotifications: 0,
      errors: [] as string[]
    };

    // Send trial ending reminders
    for (const business of trialEndingSoon) {
      try {
        const template = emailTemplates.trialReminder(
          business.businessName,
          business.trialEndDate.toLocaleDateString()
        );
        
        await sendEmail({
          to: business.user.email!,
          subject: template.subject,
          html: template.html
        });
        
        results.trialReminders++;
      } catch (error) {
        console.error(`Failed to send trial reminder to ${business.user.email}:`, error);
        results.errors.push(`Trial reminder failed for ${business.user.email}`);
      }
    }

    // Send payment due reminders
    for (const business of paymentDueSoon) {
      try {
        const template = emailTemplates.paymentReminder(
          business.businessName,
          business.nextPaymentDue.toLocaleDateString()
        );
        
        await sendEmail({
          to: business.user.email!,
          subject: template.subject,
          html: template.html
        });
        
        results.paymentReminders++;
      } catch (error) {
        console.error(`Failed to send payment reminder to ${business.user.email}:`, error);
        results.errors.push(`Payment reminder failed for ${business.user.email}`);
      }
    }

    // Update expired trials and send notifications
    for (const business of expiredTrials) {
      try {
        // Update status to expired
        await prisma.business.update({
          where: { id: business.id },
          data: { status: 'expired' }
        });

        // Send expiration notification
        const template = emailTemplates.trialExpired(business.businessName);
        
        await sendEmail({
          to: business.user.email!,
          subject: template.subject,
          html: template.html
        });
        
        results.expiredNotifications++;
      } catch (error) {
        console.error(`Failed to process expired trial for ${business.user.email}:`, error);
        results.errors.push(`Expired trial processing failed for ${business.user.email}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email reminders processed',
      results
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
