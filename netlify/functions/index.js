// This file ensures Netlify Functions use Node.js CommonJS syntax
// and loads environment variables from the root .env.local

require('dotenv').config({ path: '../../.env.local' });
    console.log(process.env.NETLIFY_DATABASE_URL);


module.exports = {};
