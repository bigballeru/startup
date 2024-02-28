
const peopleDetails = {
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
    },
    "Bob Johnson": {
        imgSrc: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1708905600&semt=ais",
        name: "Bob Johnson",
        meta: "BYU",
        contactDetails: {
            phone: "727-712-8192",
            email: "bjohnson@gmail.com",
            address: "600 Penn Avenue Las Vegas, NV 84321"
        },
        mainDetails: {
            career: "Bob is an absolute dog",
            family: "Bob loves to eat good food"
        }
    },
};

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
    numPeople();
}

numPeople();

const peopleArray = Object.values(peopleDetails);

function linkPeople() {
    var links = document.querySelectorAll('#list h1');

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            var personName = link.textContent;

            updatePersonDetails(personName);
        });
    });

    function updatePersonDetails(personName) {
        // Get the details for the clicked person
        var details;

        for (const person of peopleArray) {
            if (person.name === personName) {
                details = person;
                break;
            }
        }

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

function loadPeople() {
    var container = document.getElementById('list');

    document.getElementById('list').innerHTML = '';

    peopleArray.forEach(function(person) {
        var h1 = document.createElement('h1');
        h1.textContent = person.name;
        container.appendChild(h1);
    });

    linkPeople();
}

document.addEventListener('DOMContentLoaded', loadPeople);

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


document.addEventListener('DOMContentLoaded', function() {
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
    peopleDetails[newPerson.name] = newPerson;
    peopleArray.push(newPerson);
    loadPeople();

      modal.style.display = 'none';
    };
});
  