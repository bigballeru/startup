import React, { useEffect, useState } from 'react';
import './homepage.css';

const HomePage = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [userCount, setUserCount] = useState('Users: 0');
  const [quote, setQuote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.addEventListener('open', () => console.log('WebSocket connection established'));
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userNumber') {
        setUserCount(`Users: ${data.number}`);
      }
    });
    socket.addEventListener('close', () => console.log('WebSocket connection closed'));
    socket.addEventListener('error', (event) => console.error('WebSocket error:', event));

    return () => socket.close();
  }, []);

  useEffect(() => {
    loadPeople();
    loadQuote();
  }, []);

  // Get's the people so we can have a list of people
  const loadPeople = () => {
    fetch(`/api/people`)
      .then(response => response.json())
      .then(data => setPeople(Object.values(data)))
      .catch(error => console.error('Fetching people list failed:', error));
  };

  // Let's me show the persons details
  const updatePersonDetails = (personName) => {
    const encodedName = encodeURIComponent(personName);

    fetch(`/api/people/${encodedName}`)
      .then(response => response.json())
      .then(details => setSelectedPerson(details))
      .catch(error => console.error('Fetching person details failed:', error));
  };

  // Quote Garden quote loader
  const loadQuote = () => {
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
      .then(response => response.json())
      .then(data => {
        setQuote(`"${data.data[0].quoteText}" - ${data.data[0].quoteAuthor}`);
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  };

  // Let's me put in a new person
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      imgSrc: null,
      name: event.target.name.value,
      meta: event.target.meta.value,
      contactDetails: {
        phone: event.target.phone.value,
        email: event.target.email.value,
        address: event.target.address.value,
      },
      mainDetails: {
        career: event.target.career.value,
        family: event.target.family.value,
      },
    };

    fetch('/api/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    })
    .then(() => {
      loadPeople();
      setIsModalOpen(false);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div id="main">
      <header>
        <input type="search" placeholder="Search notes..." />
        <button type="submit">Search</button>
      </header>
      <main style={{alignItems: 'normal'}}>
        <section id="people">
          <div id="head">
            <h2>People</h2>
            <button id="addPersonBtn" onClick={() => setIsModalOpen(true)}>Add</button>
          </div>
          <div id="list">
            {people.map((person, index) => (
              <h1 key={index} onClick={() => updatePersonDetails(person.name)}>{person.name}</h1>
            ))}
          </div>
          <div id="websocket">
            {userCount}
          </div>
        </section>
        <section id="notes">
          {selectedPerson && (
            <div id="person" style={{display: 'initial'}}>
              <img src={selectedPerson.imgSrc || 'https://static.vecteezy.com/system/resources/previews/031/725/956/large_2x/ai-generated-studio-portrait-of-handsome-indian-man-on-colour-background-photo.jpg'} alt={selectedPerson.name} width="100" height="100"/>
              <div id="metainfo" style={{display: 'inline-flex'}}>
                <h2>{selectedPerson.name}</h2>
                <h3>{selectedPerson.meta}</h3>
              </div>
              <div className="notebox">
                <h3>Contact Details</h3>
                <h4>Phone Number</h4>
                <p id="phone" style={{paddingTop: 0, textAlign: 'left'}}>{selectedPerson.contactDetails.phone}</p>
                <h4>Email</h4>
                <p id="email" style={{paddingTop: 0, textAlign: 'left'}}>{selectedPerson.contactDetails.email}</p>
                <h4>Address</h4>
                <p id="address" style={{paddingTop: 0, textAlign: 'left'}}>{selectedPerson.contactDetails.address}</p>
              </div>
              <div className="notebox">
                <h3>Main Details</h3>
                <h4>Career</h4>
                <p id="career" style={{paddingTop: 0, textAlign: 'left'}}>{selectedPerson.mainDetails.career}</p>
                <h4>Family</h4>
                <p id="family" style={{paddingTop: 0, textAlign: 'left'}}>{selectedPerson.mainDetails.family}</p>
              </div>
            </div>
          )}
        </section>
      </main>
      <footer style={{padding: 0}}>
        <p id="quote" style={{padding: 0}}>{quote}</p>
      </footer>
      {isModalOpen && (
        // Need to include if it is open or not here instead of in css for it to work properly
        <div id="addPersonModal" className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-content" style={{height: 'auto', maxHeight: 'fit-content'}}>
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form id="addPersonForm" onSubmit={handleSubmit}>
              <div className="modal-sep">
                <h2>How I Know Them</h2>
                <input type="text" id="name" name="name" placeholder="Name" required />
                <input type="text" id="meta" name="meta" placeholder="How You Know Them" required />
              </div>
              <div className="modal-sep">
                <h2>Contact Details</h2>
                <input type="tel" id="phone" name="phone" placeholder="Phone Number" />
                <input type="email" id="email" name="email" placeholder="Email" />
                <input type="text" id="address" name="address" placeholder="Address" />
              </div>
              <div className="modal-sep">
                <h2>Main Details</h2>
                <input type="text" id="career" name="career" placeholder="Career Info" />
                <input type="text" id="family" name="family" placeholder="Family Info" />
              </div>
              <div className="modal-sep">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
