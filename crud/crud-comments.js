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