const commentHandler = async (event) => {
    event.preventDefault();

    // Grab values
    const postID = event.target.getAttribute('data-id');
    const text = document.querySelector('#commentText').value.trim();

    const response = await fetch(`/api/post/comment/${postID}`, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace(`/comment/${postID}`) // Redirect to comment page
    } else {
        alert('Failed to create comment')
    }
};

// Event Listener
document.querySelector('#commentBtn').addEventListener('click', commentHandler);