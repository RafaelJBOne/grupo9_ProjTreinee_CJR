const email = document.getElementById('email').value;
const senha = document.getElementById('senha').value;
const nome = document.getElementById('nome').value;
const genero = document.getElementById('genero').value;
const cargo = document.getElementById('cargo').value;

const dadosUsuario = {
    username: nome,
    email: email, 
    password: senha, 
    job_title: cargo, 
    gender: genero, 
    admin: false
};

// Enviar uma solicitação POST para o backend
fetch('http://localhost:3000/sign-in', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosUsuario)
})
    .then(response => response.json())
    .then(data => {
        // Lidar com a resposta do backend
        console.log('Resposta do backend:', data);
        // Redirecionar ou realizar outras ações conforme necessário
    })
    .catch(error => {
        console.error('Erro ao enviar a solicitação:', error);
    });