/**
 * Admin Password Update Script
 * 
 * Usage:
 *   node seed.js <your-new-password>
 *
 * This script updates the ADMIN_PASSWORD in your .env file.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '.env');

const run = async () => {
  const password = process.argv[2];

  if (!password) {
    console.error('\n❌ Error: No password provided.');
    console.log('Usage: node seed.js <your-new-password>\n');
    process.exit(1);
  }

  try {
    let envContent = fs.readFileSync(ENV_FILE, 'utf8');

    // Remove any existing hash to avoid confusion
    envContent = envContent.replace(/^ADMIN_PASSWORD_HASH=.*/gm, '');

    // Update or add ADMIN_PASSWORD
    if (envContent.includes('ADMIN_PASSWORD=')) {
      envContent = envContent.replace(/^ADMIN_PASSWORD=.*/gm, `ADMIN_PASSWORD=${password}`);
      console.log('♻️ Updated ADMIN_PASSWORD in .env');
    } else {
      envContent = envContent.trim() + `\nADMIN_PASSWORD=${password}\n`;
      console.log('➕ Added ADMIN_PASSWORD to .env');
    }

    // Clean up empty lines
    envContent = envContent.replace(/\n\s*\n/g, '\n');

    fs.writeFileSync(ENV_FILE, envContent, 'utf8');
    console.log('✅ .env file synchronized successfully.\n');
    console.log(`💡 Password updated to: ${password}`);
    console.log('💡 Restart your server for changes to take effect.\n');
  } catch (err) {
    console.warn('\n⚠️ Could not update .env file automatically.\n');
    console.log('Please update ADMIN_PASSWORD manually in your .env');
  }
};

run();
