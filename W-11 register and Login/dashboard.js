document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Grab the plain string we saved for the current user
    let currentUser = localStorage.getItem('loggedInUser');
    
    // Add some safety: If they try to open the dashboard without logging in, kick them out!
    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    // Set the welcome message
    document.getElementById('welcomeMsg').innerText = `Welcome back, ${currentUser}!`;

    // 2. Grab the array of all users
    let users = JSON.parse(localStorage.getItem('myUsers')) || [];
    const tbody = document.getElementById('userTableBody');

    // 3. Loop through directly (not users.array.forEach)
    users.forEach(element => {
        // Warning: Watch your closing tags! You had <td>...<td> instead of <td>...</td>
        tbody.innerHTML += `
            <tr>
                <td>${element.name}</td>
                <td>${element.username}</td>
                <td>${element.email}</td>
                <td>${element.phn}</td>
                <td>${element.dob}</td>
                <td>${element.city}</td>
                <td>${element.address}</td>
            </tr>`;
    });
});