import { Router } from 'express'
import AuthService from './auth.service.js'
import { error } from 'console';

const authService = new AuthService()
const authRouter = Router();

authRouter.post('/sign-in', async (req, res) => { // logar usuário
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
})

authRouter.post('/sign-up', async (req, res) => { // cadastrar usuário
    console.log(req.body)
    const { username, email, password, job_title, gender, admin } = req.body;    

    try {
        const NewUser = await authService.signUp(username, email, password, job_title, gender, admin)
        res.status(200).json(NewUser)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
})

export default authRouter;