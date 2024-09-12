// Select necessary elements
const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const login = document.querySelector(".login-link");

// Form and input elements
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const responseDiv = document.getElementById('response');

// Ensure the form exists before adding the event listener
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get trimmed input values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear previous messages
        clearMessages();

        // Validate username and password fields
        if (!validateUsername(username)) {
            displayError('username-error', 'Invalid username or email');
            return;
        }

        if (!validatePassword(password)) {
            displayError('password-error', 'Invalid password');
            return;
        }

        // API Integration (mock request)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            // Mock success condition; update based on actual response
            if (data) {
                displayResponse('Login successful!');
            } else {
                displayResponse('Login failed. Please try again.');
            }
        })
        .catch(error => {
            displayResponse('Error: ' + error.message);
        });
    });
}

// Function to validate the username (email format)
function validateUsername(username) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(username);
}

// Function to validate the password (minimum length)
function validatePassword(password) {
    return password.length >= 6;
}

// Function to display error messages
function displayError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Function to display response messages (success or error)
function displayResponse(message) {
    if (responseDiv) {
        responseDiv.textContent = message;
    }
}

// Function to clear all messages
function clearMessages() {
    if (usernameError) usernameError.textContent = "";
    if (passwordError) passwordError.textContent = "";
    if (responseDiv) responseDiv.textContent = "";
}

// Show/hide password functionality
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            } else {
                pwField.type = "password";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

// Toggle to show login form
if (login) {
    login.addEventListener("click", () => {
        container.classList.remove("active");
    });
}



