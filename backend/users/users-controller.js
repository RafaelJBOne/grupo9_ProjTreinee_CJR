import Users from './users-service.js';
import { Router } from 'express';

const routerUser = Router();
const users = new Users();

// Rotas para usuários

routerUser.post('/users', async (req, res) => { //criar usuários
  const { username, email, password, job_title_id, gender, admin } = req.body;
  
  try {
    const usuario = await users.createUser(username, email, password, job_title_id, gender, admin);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerUser.get('/users', async (req, res) => { //listar usuários
  const usuariosListados = await users.listUsers();
  res.json(usuariosListados);
});

routerUser.delete('/users/:userId', async (req, res) => { //deletar usuário
  const userId = req.params.userId.int();

  try {
    const deletedUser = await users.deleteUser(userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerUser;