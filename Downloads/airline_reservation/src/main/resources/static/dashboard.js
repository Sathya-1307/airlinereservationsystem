document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem("username") || "Guest";  
    document.getElementById("username").textContent = username;
});

function logout() {
    sessionStorage.removeItem("username"); 
    alert("✅ You have logged out!");
    window.location.href = "login.html";
}

function bookFlight() {
    window.location.href = "index.html";  
}

function viewBookings() {
    window.location.href = "index2.html";  
}

function profile() {
    const profileContainer = document.createElement("div");
    profileContainer.className = "profile-container";

    profileContainer.innerHTML = `
        <h2>👤 User Profile</h2>
        <p><strong>Username:</strong> Sathya</p>
        <p><strong>Password:</strong> 2312049</p>
        <button onclick="closeProfile()">❌ Close</button>
    `;

    document.body.appendChild(profileContainer);
}

function closeProfile() {
    document.querySelector(".profile-container").remove();
}
