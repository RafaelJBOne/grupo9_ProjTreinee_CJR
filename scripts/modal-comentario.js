const openModalBtn = document.getElementById("openModalBtn");
const createCommentModal = document.getElementById("createCommentModal");
const closeModalBtn = document.getElementById("closeModalBtn")

let isModalopen = false;

const simplemde = new SimpleMDE({ element: document.getElementById("commentContent") });

openModalBtn.addEventListener("click", () => {
    if (!isModalopen) {
        createCommentModal.style.display = "block";
        isModalopen = true;
    }
});

closeModalBtn.addEventListener("click", () => {
    createCommentModal.style.display = "none";
    isModalopen = false;
});

window.addEventListener("click", (event) => {
    if (event.target === createCommentModal) {
        createCommentModal.style.display = "none";
        isModalopen = false;
    }
});

const submitCommentBtn = document.getElementById("publishCommentBtn"); 
submitCommentBtn.addEventListener("click", () => {
    const commentContent = simplemde.value();
    console.log("Conteúdo do Comentário:", commentContent);
    createCommentModal.style.display = "none";
});

publishCommentBtn.addEventListener('click', async () => {
    const commentContent = commentContentInput.value;

    const imageFile = imageInput.file[0];

    try {
        const formData = new FormData();
        formData.append('content', commentContent);
        formData.append('image', imageFile);

        const response = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            body: formData,
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