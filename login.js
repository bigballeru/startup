function login() {
    const nameEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("password", passwordEl.value)
    localStorage.setItem("email", nameEl.value);
    window.location.href = "homepage.html";
  }