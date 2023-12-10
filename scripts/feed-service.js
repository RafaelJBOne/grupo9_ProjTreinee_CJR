class FeedService {
    constructor() {
      this.url = "http://localhost:3000/posts";
    }
  
    async createPost(userId, content) { // criar publicação
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
  
    async deletePost(postId) { // deletar publicação
      const response = await fetch(`${this.url}/${postId}`, {
        method: "DELETE",
      });
      const deletedPost = await response.json();
      return deletedPost;
    }

    }

export default FeedService;





