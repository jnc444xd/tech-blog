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
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/') // Redirect to homepage

        } else {
            alert(response.statusText)
        }
    }
};

const loginPageHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/login');
};

// Event listeners
document.querySelector('.signupBtn').addEventListener('click', signupHandler);
document.querySelector('.loginPage').addEventListener('click', loginPageHandler);