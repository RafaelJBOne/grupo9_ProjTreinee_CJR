
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('camposLogin');

    loginForm.addEventListener('submit', async (event) => { 
        event.preventDefault();

        const email = document.getElementById('loginInput').value;
        const password = document.getElementById('senhaInput').value;

        try {            
            const response = await fetch('http://localhost:3000/sign-in', { // cadastrar usuário
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",},
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to log in');
            }

            const token = await response.json();
            
            authorization: `Bearer ${token}`,

            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('email', JSON.stringify(email));

            fetch('http://localhost:3000/sign-in', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password }),
            });

            // You can redirect to another page or perform other actions after successful login
            window.location.href = 'http://127.0.0.1:5500/htmls/TelaFeedLogado.html'; // Replace with the desired URL

        } catch (error) {
            console.error(error);
            // Handle the error, e.g., show an error message to the user
        }
    });
});