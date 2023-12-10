class FeedService {
    constructor() {
      this.url = "http://localhost:3000/posts";
    }
  
    async createPost(userId, content) {
      const response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(userId, content),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdPost = await response.json();
      return createdPost;
    }
  
    async deletePost(postId) {
      const response = await fetch(`${this.url}/${postId}`, {
        method: "DELETE",
      });
      const deletedPost = await response.json();
      return deletedPost;
    }
  }

export default FeedService;



async function loadPublications() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        const publications = await response.json();

        const publicationsContainer = document.getElementById('Coluna-publicacoes');
        publicationsContainer.innerHTML = '';

        publications.forEach(publication => {
            const publicationDiv = document.createElement('div');
            publicationDiv.id = `Publicacao${publication.id}`;
            publicationDiv.className = 'publicacoes';

            // Crie a estrutura HTML para exibir a publicação (modifique conforme necessário)
            publicationDiv.innerHTML = `
                <div class="UsernDate">
                    <a href="..\TelasDePerfil\TelaPerfilDeslogada.html">
                        <button class="botoes-foto-perfil-publicacao">
                            <img src="..\imagens\pfp.jpg" alt="Foto de Perfil">
                        </button>
                    </a>
                    <a href="..\TelasDePerfil\TelaPerfilDeslogada.html">
                        <button class="botoes-nome-usuario-publicacao">    
                            <h1>${publication.username}</h1>
                        </button>
                    </a>
                    <h2>${publication.created_at}</h2>
                </div>
                <a href="..\TelasDeComentário\TelaComentarioDeslogada.html" class="texto-publicacao">
                    <p>${publication.content}</p>
                </a>
            `;

            publicationsContainer.appendChild(publicationDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar publicações:', error);
    }
}