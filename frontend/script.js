document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const addNote = document.getElementById('note');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:4500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                window.location.href = '/frontend/home.html';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:4500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                window.location.href = '/frontend/login.html';
            }
        });
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('auth-link');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        authLink.innerHTML = '<a href="#" id="logout">Logout</a>';
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
        });
    }
});

// Example function to handle login (this would be part of your login process)
function handleLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/frontend/home.html'; // Redirect to home or another page after login
}