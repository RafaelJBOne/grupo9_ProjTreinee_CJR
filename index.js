import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas para usuários
app.get('/users', async (req, res) => { //listar usuários
  const users = await prisma.users.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => { //criar usuários
  const newUser = req.body;
  const user = await prisma.users.create({ data: newUser });
  res.json(user);
});

// Rotas para posts
app.get('/posts', async (req, res) => { //listar posts
  const posts = await prisma.posts.findMany();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const newPost = req.body;

  try {
      const post = await prisma.posts.create({ data: newPost });
      res.json(post);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o post.' });
  }
});

app.delete('/posts/:postId', async (req, res) => { //deletar post
    const postId = parseInt(req.params.postId, 10);
  
    try {
      const deletedPost = await prisma.posts.delete({
        where: { id: postId }
      });
      res.json(deletedPost);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o post.' });
    }
  });

// Rotas para comentários
app.get('/comments', async (req, res) => { //listar comentarios
  const comments = await prisma.comments.findMany();
  res.json(comments);
});

app.post('/comments', async (req, res) => { //criar comentario
  const newComment = req.body;
  const comment = await prisma.comments.create({ data: newComment });
  res.json(comment);
});

app.listen(PORT, () => { //deletar comentario
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.delete('/comments/:commentId', async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
  
    try {
      const deletedComment = await prisma.comments.delete({
        where: { id: commentId }
      });
      res.json(deletedComment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o comentário.' });
    }
  });