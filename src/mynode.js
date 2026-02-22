const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

// Try to load .env file for local development (won't exist on Vercel)
require('dotenv').config({path: path.join(__dirname, '.env')});

const envFile = `export const environment = {
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_SECRET_KEY: '${process.env.SUPABASE_SECRET_KEY}',
    SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}',
};
`;
const targetPath = path.join(__dirname, './environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});
