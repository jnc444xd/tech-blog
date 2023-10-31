const signupHandler = async (event) => {
    event.preventDefault();
    // Grab values from form
    const username = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
    // Verify username and password
    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to homepage

        } else {
            alert(response.statusText);
        }
    }
};

const loginHandler = async (event) => {
    event.preventDefault();
    // Grab values from form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    // Verify name and password
    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to homepage

        } else {
            alert('Incorrect Username and/or Password.');
        }
    }
};

// Event listeners
document.querySelector('#signupBtn').addEventListener('click', signupHandler);
document.querySelector('#loginBtn').addEventListener('click', loginHandler);