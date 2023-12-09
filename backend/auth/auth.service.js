import jwt from 'jsonwebtoken';
import Users from '../users/users-service.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const userService = new Users();

class AuthService {
    async signIn(email, password) {
        const user = await userService.listUserByEmail(email)

        if (!user) throw new Error('Usuário não encontrado')

        if (!(await bcrypt.compare(password, user.password))) throw new Error('Senha incorreta');

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '60m'})

        return token;

    }

    async signUp(username, email, password, job_title, gender, admin) {
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        const newUser = await userService.createUser(username, email, password, job_title, gender, admin)
        return newUser
    }
} 

export default AuthService