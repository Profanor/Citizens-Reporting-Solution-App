// JavaScript for login.html
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form input values
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Perform input validation
    if (!usernameInput.value || !passwordInput.value) {
      console.error('Please fill in all the fields');
      return;
  }

    // Create an object with the login credentials
    const credentials = {
      username: usernameInput.value,
      password: passwordInput.value
  };

    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    
    if (response.ok) {
        // Login successful
        window.location.href = '/index.html'; // Redirect to index page
    } else {
        // Login failed
        const errorMessage = await response.text();
        console.error(errorMessage);
    }
});
