import Users from './users-service.js';
import JwtGuard from '../auth/guards/jwt.guards.js';
import { Router } from 'express';
import jwt from 'jsonwebtoken'

const routerUser = Router();
const users = new Users();

// Rotas para usuários

routerUser.get('/users', async (req, res) => { //listar usuários
  const usuariosListados = await users.listUsers();
  res.json(usuariosListados);
});

routerUser.delete('/users/:id', JwtGuard, async (req, res) => { //deletar usuário
  const user = req.user

  if (user.id !== +req.params.id)
    return res.status(403).json({message: 'Você não tem permissão para deletar este usuário'})

  const {id} = req.params;

  try {
    const deletedUser = await users.deleteUser(+id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerUser.get('/user/:id', async (req, res) => { //listar usuário por id
  const { id } = req.params;

  console.log(req.params)

  try {
    const usuario = await users.listUserById(+id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerUser;
