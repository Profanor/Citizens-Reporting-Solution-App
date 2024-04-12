// JavaScript for signup.html
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(signupForm);
    const response = await fetch('/users/signup', {
        method: 'POST',
        body: formData
    });
    
    if (response.ok) {
        // Signup successful
        window.location.href = '/index.html'; // Redirect to index page
    } else {
        // Signup failed
        const errorMessage = await response.text();
        console.error(errorMessage);
    }
});
