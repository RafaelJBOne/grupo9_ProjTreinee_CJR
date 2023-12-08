import {Router} from 'express'
import AuthService from './auth.service'

const authService = new AuthService()
const authRouter = Router();

authRouter.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);
        res.status(200).json(token);
    }
    catch  (e) {
        res.status(400).json({message: e.message});
    }
})

authRouter.post('/sign-up', async (req, res) => {
    const {username, email, password, job_title_id, gender, admin} = req.body;

    try {
        const NewUser = await authService.signUp(username, email, password, job_title_id, gender, admin)
        res.status(200).json(newUser)
    }
    catch (e) {
        res.status(400).json({message: e.message})
    }
})

export default authRouter;