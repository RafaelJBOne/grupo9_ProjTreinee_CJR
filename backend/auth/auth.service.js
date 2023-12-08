import jwt from 'jsonwebtoken'
import Users from '../user/user-service.js'

class AuthService {
    async signIn(email, password) {
        const user = await userService.listUserByEmail(email)

        if (!user) throw new Error('Usuário não encontrado')

        if (user.password !== password) throw new Error('Senha incorreta');

        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '15m'})

        return {token};

    }

    async signUp(username, email, password, job_title_id, gender, admin) {
        const newUser = await userService.createUser(username, email, password, job_title_id, gender, admin)
        return newUser
    }
} 

export default AuthService