
async function getComments() {
    const response = await fetch("http://localhost:3000/comments");
    const comments = await response.json();
    console.log(movies);
  }

  async function createComment() {
    const post_id = ,
    const user_id = ,
    const content = ,
    const response = await fetch("http://localhost:3000/comments");
    const movies = await response.json();
    console.log(movies);
  }

  async function deleteComment() {
    const response = await fetch("http://localhost:3000/comments");
    const movies = await response.json();
    console.log(movies);
  }

