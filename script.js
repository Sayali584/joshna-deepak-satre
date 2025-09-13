// Show Signup Form
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("formTitle").innerText = "Sign Up";
}

// Show Login Form
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("formTitle").innerText = "Login";
}

// Signup Functionality
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("signup-username").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  let users = JSON.parse(localStorage.getItem("students")) || [];

  // check if user already exists
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("students", JSON.stringify(users));

  alert("Signup successful! Please login.");
  showLogin();
});

// Login Functionality
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("students")) || [];

  let validUser = users.find(u => u.username === username && u.password === password);

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login credentials!");
  }
});

// Dashboard Page
if (window.location.pathname.includes("dashboard.html")) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    window.location.href = "index.html"; // redirect if not logged in
  } else {
    document.getElementById("studentName").innerText = loggedInUser.username;
    document.getElementById("profile-username").innerText = loggedInUser.username;
    document.getElementById("profile-email").innerText = loggedInUser.email;
  }
}

// Switch Sections
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
