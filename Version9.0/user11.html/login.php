<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TripHub | Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="CSS/product.css">
    <style>
      body { background: #f8f9fa; }
      .auth-card { max-width: 420px; margin: 5rem auto; }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">TripHub</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="destinations.html">Plan Trip</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
            <li class="nav-item"><a class="nav-link active" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="auth-card">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h1 class="h3 mb-3">Login</h1>
          <div id="loginAlert"></div>
          <form id="loginForm">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input type="text" name="username" class="form-control" autocomplete="username">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" name="password" class="form-control" autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
          <p class="mt-3 mb-0 text-center">Don't have an account? <a href="register.html">Register</a>.</p>
        </div>
      </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const loginForm = document.getElementById('loginForm');
      const loginAlert = document.getElementById('loginAlert');

      function showMessage(type, text) {
        loginAlert.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
      }

      function getUserData() {
        try {
          return JSON.parse(localStorage.getItem('tripHubUser'));
        } catch (error) {
          return null;
        }
      }

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (!username || !password) {
          showMessage('warning', 'Please enter both username and password.');
          return;
        }

        const user = getUserData();
        if (!user || user.username !== username || user.password !== password) {
          showMessage('danger', 'Invalid username or password.');
          return;
        }

        localStorage.setItem('tripHubLoggedIn', 'true');
        localStorage.setItem('tripHubCurrentUser', username);
        showMessage('success', 'Login successful. Redirecting to the homepage...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      });
    </script>
  </body>
</html>
