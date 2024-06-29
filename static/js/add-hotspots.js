// Get references to input fields
const addressInput = document.getElementById('address');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const descriptionInput = document.getElementById('description'); 
const photosInput = document.getElementById('photos');
//const uploadedPhoto = document.getElementById('uploadedPhoto');
const photoPreview = document.getElementById('photoPreview');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');

// Get today's date
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

// Format today's date in YYYY-MM-DD format
const formattedDate = yyyy + '-' + mm + '-' + dd;

// Set the date input field's value to today's date
dateInput.value = formattedDate;

// Event listener for address input change
addressInput.addEventListener('input', async () => {
    // ... (existing geocoding logic)
    

    validateForm();
});

// Get the user's current position
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        latitudeInput.value = latitude;
        longitudeInput.value = longitude;
    },
    (error) => {
        console.error('Error getting location:', error.message);
        latitudeInput.value = 'Location unavailable';
        longitudeInput.value = 'Location unavailable';
        validateForm();
    }
);





 // Event listener for photo upload
 photosInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        displayPhotoPreview(files);
        validateForm();
    }
});

// Function to display photo preview
function displayPhotoPreview(files) {
    photoPreview.innerHTML = ''; // Clear existing previews
    for (const file of files) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        img.style.marginBottom = '10px'; // Add some spacing between images
        photoPreview.appendChild(img);
    }
}

// Function to validate form
function validateForm() {
    let isValid = true;
    const fields = [addressInput, descriptionInput, photosInput, dateInput];

    // Clear invalid class from all fields and hide error message
    fields.forEach(field => field.classList.remove('invalid'));
    errorMessage.style.display = 'none';

    fields.forEach(field => {
        if (field.value.trim() === '' || (field === photosInput && field.files.length === 0)) {
            field.classList.add('invalid');
            isValid = false;
        }
    });

    if (!isValid) {
        errorMessage.textContent = 'All fields are mandatory. Please fill out all fields.';
        errorMessage.style.display = 'block';
    }

    submitButton.disabled = !isValid;
}