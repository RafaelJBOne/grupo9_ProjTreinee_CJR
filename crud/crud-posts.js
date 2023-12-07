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