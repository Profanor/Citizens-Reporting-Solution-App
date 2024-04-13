// Handle form submission and send data to backend server
document.getElementById('incidentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    
    // Append selected files to FormData
    const picturesInput = document.getElementById('pictures');
    for (let i = 0; i < picturesInput.files.length; i++) {
        formData.append('pictures', picturesInput.files[i]);
    }

    // Perform input validation
    if (!formData.get('title') || !formData.get('description') || !formData.get('category') || picturesInput.files.length === 0) {
        console.error('Please fill out all fields and select at least one picture.');
        return;
    }

    // Disable form submit button to prevent multiple submissions
    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    // Retrieve geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Add latitude and longitude to formData
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            // Send formData to backend using fetch
            sendFormData(formData, submitButton);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Continue without geolocation data
        // Send formData to backend without latitude and longitude
        sendFormData(formData, submitButton);
    }
});

function sendFormData(formData, submitButton) {
    fetch('http://localhost:3000/users/incident', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Failed to submit incident');
        }
    })
    .then(data => {
        console.log('Response:', data);
        // Enable form submit button after successful submission
        submitButton.disabled = false;
        // Reset form fields
        document.getElementById('incidentForm').reset();
    })
    .catch(error => {
        console.error('Error submitting incident:', error);
        // Enable form submit button in case of error
        submitButton.disabled = false;
    });
}

//javascript to preview the selected image
document.getElementById('pictures').addEventListener('change', function(event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById('imagePreview');

    // Check if any file is selected
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(fileInput.files[0]); // Convert selected file to Data URL
    } else {
        imagePreview.src = '#';
        imagePreview.style.display = 'none'; // Hide the image preview if no file is selected
    }
});
