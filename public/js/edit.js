const editPostHandler = async (event) => {
    event.preventDefault();

    // Get post ID to edit
    const id = event.target.getAttribute('data-id')

    // Grab values from text area
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    // Verify title and text
    if (title && text) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
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
document.querySelector('#editBtn').addEventListener('click', editPostHandler);