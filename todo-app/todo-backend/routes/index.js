const express = require('express');
const router = express.Router();
const { createClient } = require('redis');

// Import configs
const configs = require('../util/config');

// Create Redis client
const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

/* GET index data. */
router.get('/', async (req, res) => {
  try {
    // Retrieve the current visit count from Redis
    let visits = await client.get('visits');
    visits = visits ? parseInt(visits) : 0;

    // Increment the visit count
    visits++;

    // Update the visit count in Redis
    await client.set('visits', visits);

    // Respond with the updated visit count and configs
    res.send({
      ...configs,
      visits,
    });
  } catch (err) {
    console.error('Error accessing Redis:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
