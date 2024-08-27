const express = require('express');
const router = express.Router();
const { createClient } = require('redis');

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

/* GET statistics. */
router.get('/', async (req, res) => {
  try {
    // Retrieve the number of added todos from Redis
    let addedTodos = await client.get('added_todos');
    addedTodos = addedTodos ? parseInt(addedTodos) : 0;

    res.send({ added_todos: addedTodos });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
