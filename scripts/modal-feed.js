const openModalBtn = document.getElementById('openModalBtn');
const createPostModal = document.getElementById('createPostModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Variável para verificar se o modal está aberto
let isModalOpen = false;

const simplemde = new SimpleMDE({ element: document.getElementById('postContent') });

openModalBtn.addEventListener('click', () => {
    // Verifique se o modal já está aberto antes de tentar abri-lo novamente
    if (!isModalOpen) {
        createPostModal.style.display = 'block';
        isModalOpen = true;

        // Inicialize o SimpleMDE
    }
});

closeModalBtn.addEventListener('click', () => { // fechar modal
    createPostModal.style.display = 'none';
    // createPostModal = 'null';
    isModalOpen = false;
});

window.addEventListener('click', (event) => { // fechar modal ao clicar fora dele
    if (event.target === createPostModal) {
        createPostModal.style.display = 'none';
        // createPostModal = 'null';
        isModalOpen = false;
    }
});

const publishPostBtn = document.getElementById('publishPostBtn'); // botao de publicar publicação
const postContentInput = document.getElementById('postContent'); // obter conteúdo da publicação
const imageInput = document.getElementById('imageInput'); // obter imagem da publicação

publishPostBtn.addEventListener('click', async () => { // criar publicação
    const postContent = postContentInput.value;

    // Obtenha o arquivo de imagem
    const imageFile = imageInput.files[0]; //

    try {
        // Crie um objeto FormData para enviar dados binários (imagem)
        const formData = new FormData();
        formData.append('content', postContent);
        console.log(postContent)
        // formData.append('image', imageFile);

        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            email: JSON.parse(localStorage.getItem('email')),
            content: postContent,
            headers: {
                "Content-Type": "application/json",
              },
        });

        const newPost = await response.json();
        console.log('Novo post criado:', newPost);

        // Limpe o campo de texto e atualize a exibição das publicações
        postContentInput.value = '';
        imageInput.value = ''; // Limpe o campo de seleção de arquivo
        loadPublications(); // Esta função deve ser definida no seu script para carregar as publicações novamente após a criação de uma nova
        createPostModal.style.display = 'none'; // Feche o modal após a publicação
        isModalOpen = false;
    } catch (error) {
        console.error('Erro ao criar novo post:', error);
    }
});
