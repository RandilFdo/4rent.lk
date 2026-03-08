// Script to help debug Vercel environment variables
console.log('🔧 Vercel OAuth Environment Check');
console.log('=====================================');
console.log('');

console.log('📋 CRITICAL: Set these in your Vercel Dashboard:');
console.log('');
console.log('1. Go to: https://vercel.com/dashboard');
console.log('2. Select your project: 4rent-lk-66uy');
console.log('3. Go to Settings → Environment Variables');
console.log('4. Add these EXACT variables:');
console.log('');

console.log('Variable Name: NEXTAUTH_URL');
console.log('Variable Value: https://4rent-lk-66uy.vercel.app');
console.log('Environment: Production');
console.log('');

console.log('Variable Name: NEXTAUTH_SECRET');
console.log('Variable Value: a643141fc894352e3e085dee6305e5edd0e3e6279d6cc6b1d2208b51c03d9bf0');
console.log('Environment: Production');
console.log('');

console.log('Variable Name: GOOGLE_CLIENT_ID');
console.log('Variable Value: [YOUR_ACTUAL_GOOGLE_CLIENT_ID]');
console.log('Environment: Production');
console.log('');

console.log('Variable Name: GOOGLE_CLIENT_SECRET');
console.log('Variable Value: [YOUR_ACTUAL_GOOGLE_CLIENT_SECRET]');
console.log('Environment: Production');
console.log('');

console.log('🌐 GOOGLE OAUTH CONSOLE SETUP:');
console.log('================================');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Navigate to: APIs & Services → Credentials');
console.log('3. Select your OAuth 2.0 Client ID');
console.log('4. Update Authorized redirect URIs:');
console.log('   - http://localhost:3000/api/auth/callback/google');
console.log('   - https://4rent-lk-66uy.vercel.app/api/auth/callback/google');
console.log('5. Update Authorized JavaScript origins:');
console.log('   - http://localhost:3000');
console.log('   - https://4rent-lk-66uy.vercel.app');
console.log('');

console.log('🚀 AFTER SETTING VARIABLES:');
console.log('============================');
console.log('1. Redeploy your Vercel app');
console.log('2. Test: https://4rent-lk-66uy.vercel.app/oauth-status');
console.log('3. Try OAuth: https://4rent-lk-66uy.vercel.app/api/auth/signin');
console.log('');

console.log('❌ CURRENT ERROR EXPLANATION:');
console.log('==============================');
console.log('The OAuthSignin error with nested callback URLs indicates:');
console.log('- Environment variables are missing in Vercel');
console.log('- Google OAuth redirect URIs are incorrect');
console.log('- NEXTAUTH_URL mismatch between local and production');
console.log('');
console.log('✅ Once you set the variables above, the error should be resolved!');
