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