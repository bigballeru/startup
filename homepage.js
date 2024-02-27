const peopleDetails = {
    "John Doe": {
        imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
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

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('#list nav a');

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            var personName = link.textContent;

            updatePersonDetails(personName);
        });
    });

    function updatePersonDetails(personName) {
        // Get the details for the clicked person
        var details = peopleDetails[personName];

        // Update information showing
        document.querySelector('#person img').src = details.imgSrc;
        document.querySelector('#person h2').textContent = details.name;
        document.querySelector('#person h3').textContent = details.meta;
        document.querySelector('#phone').textContent = details.contactDetails.phone;
        document.querySelector('#email').textContent = details.contactDetails.email;
        document.querySelector('#address').textContent = details.contactDetails.address;
        document.querySelector('#career').textContent = details.mainDetails.career;
        document.querySelector('#family').textContent = details.mainDetails.family;
    }
});

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