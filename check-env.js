// Quick script to check environment variables
console.log('🔍 Environment Variables Check:');
console.log('================================');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '❌ Not set');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set');
console.log('GITHUB_ID:', process.env.GITHUB_ID ? '✅ Set' : '❌ Not set');
console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET ? '✅ Set' : '❌ Not set');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
console.log('================================');

console.log('\n📋 Next Steps:');
console.log('1. If any are "❌ Not set", you need to set them in Vercel');
console.log('2. For local development, create a .env.local file');
console.log('3. Make sure Google Console has correct redirect URIs');
console.log('4. Redeploy after setting environment variables');
