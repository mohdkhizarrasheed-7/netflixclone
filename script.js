let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Movie Listing Website with Authentication

// Sample movie data
const movies = [
    { title: "Inception", category: "Sci-Fi" },
    { title: "The Dark Knight", category: "Action" },
    { title: "Interstellar", category: "Sci-Fi" },
    { title: "Titanic", category: "Romance" },
    { title: "The Godfather", category: "Crime" }
];

// User Authentication Data (stored in localStorage for simplicity)
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = localStorage.getItem("currentUser");

// Display movies
function displayMovies(filter = "") {
    const movieContainer = document.getElementById("movie-list");
    movieContainer.innerHTML = "";
    
    movies.forEach(movie => {
        if (!filter || movie.category.toLowerCase() === filter.toLowerCase()) {
            const movieElement = document.createElement("div");
            movieElement.textContent = `${movie.title} (${movie.category})`;
            movieContainer.appendChild(movieElement);
        }
    });
}

displayMovies();

// Search movies
function searchMovies() {
    const query = document.getElementById("search-input").value.toLowerCase();
    displayMovies(query);
}

document.getElementById("search-btn").addEventListener("click", searchMovies);

// Signup function
function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }
    
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
}

document.getElementById("signup-btn").addEventListener("click", signUp);

// Login function
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.reload();
    } else {
        alert("Invalid username or password");
    }
}

document.getElementById("login-btn").addEventListener("click", login);

// Logout function
function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.reload();
}

document.getElementById("logout-btn").addEventListener("click", logout);

// Check login status
function checkLoginStatus() {
    if (currentUser) {
        document.getElementById("auth-section").innerHTML = `<p>Welcome, ${currentUser}! <button id='logout-btn'>Logout</button></p>`;
        document.getElementById("logout-btn").addEventListener("click", logout);
    }
}

checkLoginStatus();

