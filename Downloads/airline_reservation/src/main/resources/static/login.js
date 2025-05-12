document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const jsError = document.getElementById("jsError");

    if (username === "" || password === "") {
        jsError.textContent = "❌ Both fields are required!";
        return;
    }

    // ✅ Static login validation
    if (username === "sathya" && password === "2312049") {
        alert("✅ Login successful! Redirecting...");
        
        // ✅ Store username in session for dashboard use
        sessionStorage.setItem("username", username);
        
        // ✅ Redirect to `dashboard.html`
        window.location.href = "dashboard.html";
    } else {
        jsError.textContent = "❌ Invalid Username or Password!";
    }
});
