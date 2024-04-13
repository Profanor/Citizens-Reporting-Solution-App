// JavaScript for signup.html
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form input values
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Perform input validation
    if (!usernameInput.value || !passwordInput.value || !confirmPasswordInput.value) {
        console.error('Please fill in all the fields');
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        console.error('Passwords do not match');
        return;
    }

    // If input is valid, proceed with form submission
    const formData = new FormData(signupForm);
    const plainFormData = Object.fromEntries(formData.entries());
    const requestBody = JSON.stringify(plainFormData);

    const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: requestBody
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
