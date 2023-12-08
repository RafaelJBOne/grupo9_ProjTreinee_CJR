import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Users {
    async createUser(username, email, password, job_title_id, gender, admin) { // criar usuário 
        return await Prisma.users.create({
            data: {
                username,
                email,
                password,
                job_title_id,
                gender,
                admin,
            },
        }).catch(error => {
            if (error.code === 'P2002')
                throw new Error('Email já cadastrado')
            else
                throw error
        })
    }

    async listUsers() { // listar usuários
        const users = await Prisma.users.findMany()
        return users
    }

    async listUserById(id) { // listar usuário por id
        return await Prisma.users.findUnique({ where: { id } 
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async listUserByEmail(email) { // listar usuário por email
        return await Prisma.users.findUnique({ where: { email } 
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async editUser(id, username, email, password, job_title_id, gender, admin) { // editar usuário
        return await Prisma.users.update({
            where: { id },
            username,
            email,
            password,
            job_title_id,
            gender,
            admin,
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async deleteUser(id) { // deletar usuário
        return await Prisma.users.delete({ where: { id } 
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async listPostsByUserId(id) { // listar posts por id do usuário
        return await Prisma.posts.findMany({ where: { authorId: id } 
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }
}

export default Users
