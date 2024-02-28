function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("password", passwordEl.value)
    localStorage.setItem("email", nameEl.value);
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
          username: form.username.value,
          password: form.password.value,
      };

      modal.style.display = 'none';
  };
}

document.addEventListener('DOMContentLoaded', modalHandler)