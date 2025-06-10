document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  try {
    const response = await fetch('https://expense-tracker-backend-1-ejz2.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
      window.location.href = 'dashboard.html'; // Redirect to dashboard after login
    } else {
      message.textContent = '❌ Invalid username or password';
      message.style.color = '#ff6b6b';
    }
  } catch (error) {
    console.error(error);
    message.textContent = '❌ Error connecting to server';
    message.style.color = '#ff6b6b';
  }
});

// Handle create account link
document.getElementById('createAccount').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'register.html';
});
