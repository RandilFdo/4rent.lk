import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron job request (you can add authentication here)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const results = {
      expiredAds: 0,
      expiredFeatured: 0,
      expiredBusinesses: 0,
      errors: [] as string[]
    };

    // 1. Expire featured flags
    try {
      const featuredExpired = await prisma.listing.updateMany({
        where: {
          isFeatured: true,
          featuredUntil: {
            lt: now
          }
        },
        data: {
          isFeatured: false
        }
      });
      results.expiredFeatured = featuredExpired.count;
      console.log(`Expired ${featuredExpired.count} featured ads`);
    } catch (error: any) {
      results.errors.push(`Featured expiry error: ${error.message}`);
    }

    // 2. Expire ads by freshness (30 days)
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const expiredAds = await prisma.listing.updateMany({
        where: {
          status: 'APPROVED',
          OR: [
            {
              expiresAt: {
                lt: now
              }
            },
            {
              AND: [
                { expiresAt: null },
                { createdAt: { lt: thirtyDaysAgo } }
              ]
            }
          ]
        },
        data: {
          status: 'EXPIRED'
        }
      });
      results.expiredAds = expiredAds.count;
      console.log(`Expired ${expiredAds.count} ads by freshness`);
    } catch (error: any) {
      results.errors.push(`Ad expiry error: ${error.message}`);
    }

    // 3. Check business subscriptions and expire if payment overdue
    try {
      const gracePeriod = new Date();
      gracePeriod.setDate(gracePeriod.getDate() - 7); // 7 days grace period

      const expiredBusinesses = await prisma.business.updateMany({
        where: {
          status: {
            in: ['trial', 'active']
          },
          nextPaymentDue: {
            lt: gracePeriod
          }
        },
        data: {
          status: 'expired',
          verified: false
        }
      });
      results.expiredBusinesses = expiredBusinesses.count;
      console.log(`Expired ${expiredBusinesses.count} businesses`);
    } catch (error: any) {
      results.errors.push(`Business expiry error: ${error.message}`);
    }

    // 4. Update businessVerified flag for listings from expired businesses
    try {
        const expiredBusinessIds = await prisma.business.findMany({
          where: { status: 'expired' },
          select: { id: true }
        });

        if (expiredBusinessIds.length > 0) {
          await prisma.listing.updateMany({
            where: {
              businessId: {
                in: expiredBusinessIds.map((b: any) => b.id)
              }
            },
            data: {
              businessVerified: false
            }
          });
          console.log(`Updated businessVerified flag for listings from ${expiredBusinessIds.length} expired businesses`);
        }
    } catch (error: any) {
      results.errors.push(`Business verification update error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Cron job completed successfully',
      results,
      timestamp: now.toISOString()
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}
