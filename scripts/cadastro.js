
document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('.fm');

    signUpForm.addEventListener('submit', async (event) => { 
        event.preventDefault();

        const username = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const job_title = document.getElementById('cargo').value;
        const gender = document.getElementById('genero').value;

        try {            
            const response = await fetch('http://localhost:3000/sign-up', { // cadastrar usuário
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",},
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    job_title,
                    gender,
                    admin: false,
                }),
            });

            if (response.ok) {
                // Handle successful registration (redirect or show a success message)
                console.log('Registration successful!');
            } else {
                const data = await response.json();
                console.error(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    });
});

