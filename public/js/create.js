const createPostHandler = async (event) => {
    event.preventDefault();

    // Grab values from text area
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    // Verify title and text
    if (title && text) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard'); // Redirect to dashboard
        } else {
            alert('Error creating new post');
        }
    }
};

// Event Listener
document.querySelector('#createBtn').addEventListener('click', createPostHandler);