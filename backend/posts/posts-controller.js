import Posts from './posts-service.js';
import { Router } from 'express';

const routerPost = Router();
const post = new Posts();

// Rotas para posts
routerPost.get('/posts', async (req, res) => { //listar posts
  const posts = await prisma.posts.findMany();
  res.json(posts);
});

routerPost.post('/posts', async (req, res) => { //criar posts
  const newPost = req.body;

  try {
    const post = await prisma.posts.create({ data: newPost });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o post.' });
  }
});

routerPost.delete('/posts/:postId', async (req, res) => { //deletar post
  const postId = req.params.postId.int();

  try {
    const deletedPost = await prisma.posts.delete({
      where: { id: postId }
    });
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o post.' });
  }
});

export default routerPost;