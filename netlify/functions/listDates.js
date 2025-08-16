// Netlify Function: listDates.js
// Returns all unique dates for which minutes exist in the database

const { Client } = require('pg');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT DISTINCT date FROM minutes ORDER BY date DESC');
    await client.end();
    const dates = res.rows.map(row => row.date);
    return {
      statusCode: 200,
      body: JSON.stringify({ dates }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
