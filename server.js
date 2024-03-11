const express = require('express');

const app = express();
const PORT = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 3000;

let people = {
    "John Doe": {
        imgSrc: "https://static.vecteezy.com/system/resources/previews/031/725/956/large_2x/ai-generated-studio-portrait-of-handsome-indian-man-on-colour-background-photo.jpg",
        name: "John Doe",
        meta: "Jefferies",
        contactDetails: {
            phone: "801-312-4174",
            email: "john.doe@gmail.com",
            address: "123 Main Street Provo, UT 84321"
        },
        mainDetails: {
            career: "John is going to work at MS MP this summer...",
            family: "John is married to Caroline..."
        }
    },
    "Jane Smith": {
        imgSrc: "https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944",
        name: "Jane Smith",
        meta: "Smith Corporation",
        contactDetails: {
            phone: "801-312-4174",
            email: "jane.smith@gmail.com",
            address: "123 New Avenue Draper, UT 84321"
        },
        mainDetails: {
            career: "Jane just got married",
            family: "Jane has two children."
        }
    }
};

let users = {};

// Use express.json() to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET route to retrieve user data by name
app.get('/people/:name', (req, res) => {
  const userName = req.params.name;
  if (people[userName]) {
    res.json(people[userName]);
  } else {
    res.status(404).send('Person not found');
  }
});

// GET route to retrieve all users
app.get('/people', (req, res) => {
    res.json(people);
});

// POST route to add or update user data
app.post('/people', (req, res) => {
  const person = req.body;
  if (person.name) {
    people[person.name] = person;
    res.send(`${person.name} has been added/updated.`);
  } else {
    res.status(400).send('User data must include a name.');
  }
});

app.post('/login', (req, res) => {
    // Will update this next project
    res.send(`Login worked.`)
});

app.post('/register', (req, res) => {
    const { userName, password } = req.body;
    res.json({ message: 'User registered successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
