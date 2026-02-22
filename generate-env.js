const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

// Try to load .env file for local development (won't exist on Vercel)
require('dotenv').config({path: path.join(__dirname, 'src', '.env')});

const envFile = `export const environment = {
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_SECRET_KEY: '${process.env.SUPABASE_SECRET_KEY}',
    SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}',
};
`;

// Generate environment.ts (used by production builds)
const prodPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
fs.writeFileSync(prodPath, envFile);
console.log(successColor, `${checkSign} Successfully generated environment.ts`);

// Also generate environment.development.ts (used by development builds)
const devPath = path.join(__dirname, 'src', 'environments', 'environment.development.ts');
fs.writeFileSync(devPath, envFile);
console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
