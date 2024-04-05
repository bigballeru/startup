const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./db.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const users = db.collection('users');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return users.findOne({ username: username });
}

function getUserByToken(token) {
  return users.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    people: {}
  };
  await users.insertOne(user);

  return user;
}

async function addPerson(username, personDetails) {
    const updateResult = await users.updateOne(
        { username: username },
        { $set: { [`people.${personDetails.name}`]: personDetails } }
    );
  
    if (updateResult.matchedCount === 0) {
      console.log("No user found with the specified username.");
      return false;
    }
  
    if (updateResult.modifiedCount === 0) {
      console.log("The new person was not added.");
      return false;
    }
  
    console.log("New person added successfully.");
    return true;
}
  

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addPerson
};
