import Comments from './comments-service.js';

import { Router } from 'express';

const routerComment = Router();
const comment = new Comments();

// Rotas para comentários
routerComment.get('/comments', async (req, res) => { //listar comentarios
    const comments = await prisma.comments.findMany();
    res.json(comments);
  });
  
  routerComment.post('/comments', async (req, res) => { //criar comentario
    const newComment = req.body;
    const comment = await prisma.comments.create({ data: newComment });
    res.json(comment);
  });
  
  routerComment.listen(PORT, () => { //deletar comentario
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  
  routerComment.delete('/comments/:commentId', async (req, res) => {
      const commentId = req.params.commentId.int();
    
      try {
        const deletedComment = await prisma.comments.delete({
          where: { id: commentId }
        });
        res.json(deletedComment);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o comentário.' });
      }
    });

export default routerComment;