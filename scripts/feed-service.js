class FeedService {
    constructor() {
      this.url = "http://localhost:3000/posts";
    }
  
    async getPosts() {
      const response = await fetch(this.url);
      const posts = await response.json();
      return posts;
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



async function getPosts() {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    
  }

  async function createPosts() {
    const post_id = 
    const user_id = 
    const content = 
    const response = await fetch("http://localhost:3000/comments");
    const movies = await response.json();
    console.log(movies);
  }

  async function deletePosts() {
    const response = await fetch("http://localhost:3000/comments");
    const movies = await response.json();
    console.log(movies);
  }