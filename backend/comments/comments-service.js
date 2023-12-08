
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Comments {
    async createComment(req, res) {
        const newComment = req.body
        const comment = await Prisma.comments.create({ data: newComment })
        res.json(comment)
    }

    async listComments(req, res) {
        const comments = await Prisma.comments.findMany()
        res.json(comments)
    }

    async listCommentById(req, res) {
        const id = req.params.id.int()
        const comment = await Prisma.comments.findUnique({ where: { id } })
        res.json(comment)
    }

    async editComment(req, res) {
        const id = req.params.id.int()
        const data = req.body
        const comment = await Prisma.comments.update({ where: { id }, data })
        res.json(comment)
    }

    async deleteComment(req, res) {
        const id = req.params.id.int()
        const comment = await Prisma.comments.delete({ where: { id } })
        res.json(comment)
    }

    async UserByCommentId(req, res) {
        const id = req.params.id.int()
        const user = await Prisma.users.findUnique({ where: { id } })
        res.json(user)
    }
}

export default Comments