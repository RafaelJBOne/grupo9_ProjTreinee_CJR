document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('camposLogin');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('loginInput').value;
        const password = document.getElementById('senhaInput').value;

        try {
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to log in');
            }

            const token = await response.json();
            localStorage.setItem('token', token);
            // You can redirect to another page or perform other actions after successful login
            window.location.href = '/dashboard'; // Replace with the desired URL

        } catch (error) {
            console.error(error);
            // Handle the error, e.g., show an error message to the user
        }
    });
});
