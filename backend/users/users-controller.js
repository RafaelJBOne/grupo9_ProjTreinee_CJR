import Users from './users-service.js';

import { Router } from 'express';

const routerUser = Router();
const users = new Users();

// Rotas para usuários
routerUser.get('/users', async (req, res) => { //listar usuários
  const users = await prisma.users.findMany();
  res.json(users);
});

routerUser.post('/users', async (req, res) => { //criar usuários
  const newUser = req.body;
  const user = await prisma.users.create({ data: newUser });
  res.json(user);
});

routerUser.delete('/users/:userId', async (req, res) => { //deletar usuário
  const userId = req.params.userId.int();

  try {
    const deletedUser = await prisma.users.delete({where: { id: userId }});
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
});

export default routerUser;