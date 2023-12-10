const openModalBtn = document.getElementById("openModalBtn");
const createCommentModal = document.getElementById("createCommentModal");
const closeModalBtn = document.getElementById("closeModalBtn")

let isModalopen = false;

const simplemde = new SimpleMDE({ element: document.getElementById("commentContent") });

openModalBtn.addEventListener("click", () => { // abrir modal
    if (!isModalopen) {
        createCommentModal.style.display = "block";
        isModalopen = true;
    }
});

closeModalBtn.addEventListener("click", () => { // fechar modal
    createCommentModal.style.display = "none";
    isModalopen = false;
});

window.addEventListener("click", (event) => { // fechar modal ao clicar fora dele
    if (event.target === createCommentModal) {
        createCommentModal.style.display = "none";
        isModalopen = false;
    }
});

const submitCommentBtn = document.getElementById("publishCommentBtn"); // botao de publicar comentario
const commentContentInput = document.getElementById("commentContent"); // obter conteúdo do comentário
const imageInput = document.getElementById("imageInput"); // obter imagem do comentário

submitCommentBtn.addEventListener("click", () => { 
    const commentContent = simplemde.value();
    console.log("Conteúdo do Comentário:", commentContent);
    createCommentModal.style.display = "none";
});

publishCommentBtn.addEventListener('click', async () => { // criar comentário
    const commentContent = commentContentInput.value; 

    const imageFile = imageInput.file[0];

    try {
        const formData = new FormData();
        formData.append('content', commentContent);
        formData.append('image', imageFile);

        const response = await fetch('http://localhost:3000/comments', { // rota para enviar/receber dados do comentario
            method: 'POST',
            mode: "no-cors",
            body: formData,
            headers: {
                "Content-Type": "application/json",
              },
        });

        const newComment = await response.json();
        console.log('Novo comentário criado:', newComment);

        commentContentInput.value = '';
        imageInput.value = '';
        loadComments();
        createCommentModal.style.display = 'none';
        isModalopen = false;
    } catch (error) {
        console.error('Erro ao criar novo comentário', error);
    }
});

async function loadComments() { // carregar comentarios
    try {
        const response = await fetch('http://localhost:3000/comments');
        const comments = await response.json();

        const commentsContainer = document.getElementById('Coluna-comentarios');
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.id = `Comentario${comment.id}`;
            commentDiv.className = 'comentarios';

            commentDiv.innerHTML = `
                <div class="UsernDate">
                    <a href="..\TelasDePerfil\TelaPerfilDeslogada.html">
                        <button class="botoes-foto-perfil-publicacao">
                            <img src="..\imagens\pfp.jpg" alt="Foto de Perfil">
                        </button>
                    </a>
                    <a href="..\TelasDePerfil\TelaPerfilDeslogada.html">
                        <button class="botoes-nome-usuario-publicacao">    
                            <h1>${comment.username}</h1>
                        </button>
                    </a>
                    <h2>${comment.created_at}</h2>
                </div>
                <a href="..\TelasDeComentário\TelaComentarioDeslogada.html" class="texto-publicacao">
                    <p>${comment.content}</p>
                </a>
            `;

            commentsContainer.appendChild(commentDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}