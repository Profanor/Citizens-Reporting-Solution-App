// JavaScript for login.html
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(loginForm);
    const response = await fetch('/users/login', {
        method: 'POST',
        body: formData
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
