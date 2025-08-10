// Netlify Function: getMinutes.js
// Retrieves meeting minutes from Neon PostgreSQL

const { Client } = require('pg');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const section = event.queryStringParameters && event.queryStringParameters.section;
  if (!section) {
    return {
      statusCode: 400,
      body: 'Missing section parameter',
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT content FROM minutes WHERE section = $1', [section]);
    await client.end();
    if (res.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ content: res.rows[0].content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
