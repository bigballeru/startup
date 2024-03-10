const express = require('express');

const app = express();
const PORT = process.argv.length > 2 ? process.argv[2] : 3000;

// This will hold users in this format: { 'John Doe': { ...user data... } }
let users = {};

// Use body-parser to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET route to retrieve user data by name
app.get('/users/:name', (req, res) => {
  const userName = req.params.name;
  if (users[userName]) {
    res.json(users[userName]);
  } else {
    res.status(404).send('User not found');
  }
});

// POST route to add or update user data
app.post('/users', (req, res) => {
  const user = req.body;
  if (user.name) {
    users[user.name] = user;
    res.send(`User ${user.name} has been added/updated.`);
  } else {
    res.status(400).send('User data must include a name.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
