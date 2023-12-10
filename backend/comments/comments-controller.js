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
  const {post_id, user_id, content} = req.body;

  try {
    const comentario = await comment.createComment(post_id, user_id, content);
    res.json(comentario);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerComment.delete('/comments/:commentId', async (req, res) => { //deletar comentario
  const comment_id = parseInt(req.params.commentId);

  try {
    const deletedComment = await comment.deleteComment(comment_id);
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerComment;