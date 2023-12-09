import Comments from './comments-service.js';
import { Router } from 'express';

const routerComment = Router();
const comment = new Comments();

// Rotas para comentários
routerComment.get('/comments', async (req, res) => { //listar comentarios
  const comments = await comment.listComments();
  res.json(comments);
});

routerComment.post('/comments', async (req, res) => { //criar comentario
  const { postId, userId, content } = req.body;

  try {
    const comentario = await comment.createComment(postId, userId, content);
    res.json(comentario);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerComment.delete('/comments/:commentId', async (req, res) => { //deletar comentario
  const commentId = parseInt(req.params.commentId);

  try {
    const deletedComment = await comment.deleteComment(commentId);
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerComment;