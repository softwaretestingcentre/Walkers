// Netlify Function: saveMinutes.js
// Saves meeting minutes to Neon PostgreSQL

const { Client } = require('pg');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }


  const { section, content, date } = JSON.parse(event.body || '{}');
  if (!section || typeof content !== 'string' || !date) {
    return {
      statusCode: 400,
      body: 'Missing section, content, or date',
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS minutes (
      section TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )`);
    await client.query(
      `INSERT INTO minutes (section, content, date) VALUES ($1, $2, $3)
       ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content, date = EXCLUDED.date`,
      [section, content, date]
    );
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
