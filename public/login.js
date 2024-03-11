function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: nameEl.value,
            password: passwordEl.value,
        }),
    })
      .then(response => {
          if (!response.ok) {
              throw new Error('Login failed');
          }
          return response.json();
      })
      .then(data => {
          console.log('Login successful', data);
          window.location.href = "homepage.html";
      })
      .catch(error => {
          console.error('Error:', error);
      });

    window.location.href = "homepage.html";
}


function modalHandler() {
  var toClick = document.getElementById('signupform');

  // Get the modal
  var modal = document.getElementById('addAccountModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks on the button, open the modal
  toClick.onclick = function() {
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
  var form = document.getElementById('addAccountForm');

  // Handle the form submission
  form.onsubmit = function(event) {
    event.preventDefault();
    const newUser = {
        userName: form.username.value,
        password: form.password.value,
    };

    fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Assuming the server sends back JSON
    })
    .then(data => {
        console.log('Success:', data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    modal.style.display = 'none';
};

}

document.addEventListener('DOMContentLoaded', modalHandler)