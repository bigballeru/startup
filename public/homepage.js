let mapOfPeople = new Map();

const johnDoe = {
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
};

const janeSmith = {
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
};

mapOfPeople.set("John Doe", johnDoe);
mapOfPeople.set("Jane Smith", janeSmith);

// Fakes websocket functionality
function numPeople() {
    setTimeout(function() {
        toChange = document.querySelector('#websocket');
        toChange.innerHTML = "Users: 10";
    }, 5000);
    setTimeout(function() {
        toChange = document.querySelector('#websocket');
        toChange.innerHTML = "Users: 8";
    }, 10000);
    setTimeout(function() {
        toChange = document.querySelector('#websocket');
        toChange.innerHTML = "Users: 21";
    }, 15000);
}

// Turning list of people into links that pull up their info
function linkPeople() {
    var links = document.querySelectorAll('#list h1');

    // Adds the links for all the people with h1 tags
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            var personName = link.textContent;

            updatePersonDetails(personName);
        });
    });

    function updatePersonDetails(personName) {
        // Get the details for the clicked person
        var details = mapOfPeople.get(personName);

        // Update information showing
        document.querySelector('#person img').src = details.imgSrc || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2048px-Blue_question_mark_icon.svg.png';
        document.querySelector('#person h2').textContent = details.name;
        document.querySelector('#person h3').textContent = details.meta;
        document.querySelector('#phone').textContent = details.contactDetails.phone;
        document.querySelector('#email').textContent = details.contactDetails.email;
        document.querySelector('#address').textContent = details.contactDetails.address;
        document.querySelector('#career').textContent = details.mainDetails.career;
        document.querySelector('#family').textContent = details.mainDetails.family;
    }
}

// Loads the people list based off of who is in mapOfPeople
function loadPeople() {
    var container = document.getElementById('list');

    // Empties it before loading to not duplicate
    document.getElementById('list').innerHTML = '';

    // Adds all of the people in mapOfPeople
    mapOfPeople.forEach(function(person) {
        var h1 = document.createElement('h1');
        h1.textContent = person.name;
        container.appendChild(h1);
    });

    // Calls linkPeople to link all the info again
    linkPeople();
}

// Loads my quote using the API
function loadQuote() {
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.querySelector('#quote').textContent = `"${data.data[0].quoteText}"  -${data.data[0].quoteAuthor}`;
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error));
}

// Handles opening and closing the modal and also deals with form submissions
function modalHandler() {
    var btn = document.getElementById('addPersonBtn');
  
    // Get the modal
    var modal = document.getElementById('addPersonModal');
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];
  
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = 'block';
    }
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    }
  
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    }
  
    // Get the form inside the modal
    var form = document.getElementById('addPersonForm');
  
    // Handle the form submission
    form.onsubmit = function(event) {
        event.preventDefault();
        const newPerson = {
            imgSrc: null,
            name: form.name.value,
            meta: form.meta.value,
            contactDetails: {
                phone: form.phone.value,
                email: form.email.value,
                address: form.address.value
            },
            mainDetails: {
                career: form.career.value,
                family: form.family.value
            }
        };

        document.getElementById('addPersonForm').reset();
        mapOfPeople.set(newPerson.name, newPerson);
        loadPeople();

        modal.style.display = 'none';
    };
}

function runItAll() {
    numPeople();
    loadQuote();
    loadPeople();
    modalHandler();
    numPeople();
}

document.addEventListener('DOMContentLoaded', runItAll);