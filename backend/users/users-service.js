import { PrismaClient } from '@prisma/client'
import Job_title from './job-title-service.js'

const Prisma = new PrismaClient()
const job_titles = new Job_title()

class Users {
    async createUser(username, email, password, job_title, gender, admin) { // criar usuário 

        const job = await job_titles.listJobByName(job_title) ?? await job_titles.createJob_title(job_title) // verifica se o cargo já existe, se não existir cria um novo cargo

        return await Prisma.users.create({
            data: {
                username,
                email,
                password,
                job_title_id: job.id_JOB,
                gender,
                admin: false
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
        return await Prisma.users.findUnique({
            where: { id_USER: id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async listUserByEmail(email) { // listar usuário por email
        return await Prisma.users.findUnique({
            where: { email: email }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async editUser(id, username, email, password, job_title_id, gender, admin) { // editar usuário
        return await Prisma.users.update({
            where: { id_USER: id },
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
        return await Prisma.users.delete({
            where: { id_USER: id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async listPostsByUserId(id) { // listar posts por id do usuário
        return await Prisma.posts.findMany({
            where: { user_id: id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }
}

export default Users
