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
    // Create new table with unique id
    await client.query(`CREATE TABLE IF NOT EXISTS minutes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      section TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )`);
    // Insert new record with generated id
    await client.query(
      `INSERT INTO minutes (section, content, date) VALUES ($1, $2, $3)`,
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
