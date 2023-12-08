import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Users {
    async createUser(req, res) {
        const newUser = req.body
        const user = await Prisma.users.create({ data: newUser })
        res.json(user)
    }

    async listUsers(req, res) {
        const users = await Prisma.users.findMany()
        res.json(users)
    }

    async listUserById(req, res) {
        const id = req.params.id.int()
        const user = await Prisma.users.findUnique({ where: { id } })
        res.json(user)
    }

    async listUserByEmail(req, res) {
        const email = req.params.email
        const user = await Prisma.users.findUnique({ where: { email } })
        res.json(user)
    }

    async editUser(req, res) {
        const id = req.params.id.int()
        const data = req.body
        const user = await Prisma.users.update({ where: { id }, data })
        res.json(user)
    }

    async deleteUser(req, res) {
        const id = req.params.id.int()
        const user = await Prisma.users.delete({ where: { id } })
        res.json(user)
    }

    async listPostsByUserId(req, res) {
        const id = req.params.id.int()
        const posts = await Prisma.posts.findMany({ where: { authorId: id } })
        res.json(posts)
    }

}

export default Users
