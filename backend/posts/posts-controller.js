import Posts from './posts-service.js';
import { Router } from 'express';

const routerPost = Router();
const post = new Posts();

// Rotas para posts
routerPost.get('/posts', async (req, res) => { //listar posts
  const posts = await post.listPosts();
  res.json(posts);
});

routerPost.post('/posts', async (req, res) => { //criar posts
  const { email, content } = req.body;
  console.log( email, content );
  try {
    const publicacao = await post.createPost(email, content);
    res.json(publicacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerPost.delete('/posts/:postId', async (req, res) => { //deletar post
  const postId = parseInt(req.params.postId);

  try {
    const deletedPost = await post.deletePost(postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerPost.get('/post/:post_id', async (req, res) => { //listar usuario por id do post
    const postId = parseInt(req.params.post_id);
  
    try {
      const username = await post.UserByPostId(postId);
      res.json(username);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
)

export default routerPost;