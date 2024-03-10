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
        const encodedName = encodeURIComponent(personName);

        fetch(`/people/${encodedName}`)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse the JSON in the response
            })
            .then(details => {
                document.querySelector('#person img').src = details.imgSrc || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2048px-Blue_question_mark_icon.svg.png';
                document.querySelector('#person h2').textContent = details.name;
                document.querySelector('#person h3').textContent = details.meta;
                document.querySelector('#phone').textContent = details.contactDetails.phone;
                document.querySelector('#email').textContent = details.contactDetails.email;
                document.querySelector('#address').textContent = details.contactDetails.address;
                document.querySelector('#career').textContent = details.mainDetails.career;
                document.querySelector('#family').textContent = details.mainDetails.family;
            })
            .catch(error => {
                console.error('Fetching person details failed:', error);
            });
    }
}

// Loads the people list based off of who is in mapOfPeople
function loadPeople() {
    var container = document.getElementById('list');

    // Empties it before loading to not duplicate
    document.getElementById('list').innerHTML = '';

    fetch(`/people`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Convert the object to an array of its values
            const people = Object.values(data);
            people.forEach(function(person) {
                var h1 = document.createElement('h1');
                h1.textContent = person.name;
                container.appendChild(h1);
            });
            linkPeople();
        })
        .catch(error => {
            console.error('Fetching person details failed:', error);
        });
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

        fetch('/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then((result) => {
                console.log(result);
                // Reload/update the people list to reflect the addition/update
                loadPeople();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        form.reset();
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