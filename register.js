document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('registerMessage');

  try {
    const response = await fetch('https://expense-tracker-backend-1-ejz2.onrender.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (data.success) {
      message.textContent = '✅ Account created successfully! Redirecting to login...';
      message.style.color = '#51cf66';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000); // 2 seconds delay
    } else {
      message.textContent = '❌ ' + data.message;
      message.style.color = '#ff6b6b';
    }
  } catch (error) {
    console.error(error);
    message.textContent = '❌ Error connecting to server';
    message.style.color = '#ff6b6b';
  }
});
