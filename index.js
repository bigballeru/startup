const express = require('express');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const http = require('http');
const { peerProxy } = require('./peerProxy.js');

const app = express();
const PORT = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 4000;

// Use express.json() to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET route to retrieve user data by name
app.get('/people/:name', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    const people = user.people;
    if (people[req.params.name]) {
      res.json(people[req.params.name]);
      return;
    } else {
      res.status(404).send('Person not found');
    }
  }
  res.status(401).json({ redirectTo: 'index.html' });
});

// GET route to retrieve all users
app.get('/people', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.json(user.people);
    return;
  }
  res.status(401).json({ redirectTo: 'index.html' });
});

// POST route to add or update user data
app.post('/people', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    const person = req.body;
    if (person.name) {
      await DB.addPerson(user.username, person);
      res.status(200).send('Person added successfully');
      return;
    }
    else {
      res.status(400).send('User data must include a name.');
    }
  }
  res.status(401).json({ redirectTo: 'index.html' });
});

app.post('/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.post('/register', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
  
    // Set the cookie
    setAuthCookie(res, user.token);
  
    res.send({
      id: user._id,
    });
  }
});

function setAuthCookie(res, authToken) {
  // Cookie expires after one hour so we need to login again
  const expireTime = 1000 * 60 * 60;

  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: expireTime
  });
}

// Start the server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

peerProxy(server);