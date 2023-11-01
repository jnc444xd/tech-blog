const logoutHandler = async () => {
    console.log('click');
    const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/login"); // Redirect to login page
    } else {
        alert(response.statusText);
    }
};

// Event Listener
document.querySelector('.logoutBtn').addEventListener('click', logoutHandler);