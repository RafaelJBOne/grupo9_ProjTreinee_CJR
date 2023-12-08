
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Posts {
    async createPost(req, res) {
        const newPost = req.body
        const post = await Prisma.posts.create({ data: newPost })
        res.json(post)
    }

    async listPosts(req, res) {
        const posts = await Prisma.posts.findMany()
        res.json(posts)
    }

    async listPostById(req, res) {
        const id = req.params.id.int()
        const post = await Prisma.posts.findUnique({ where: { id } })
        res.json(post)
    }

    async editPost(req, res) {
        const id = req.params.id.int()
        const data = req.body
        const post = await Prisma.posts.update({ where: { id }, data })
        res.json(post)
    }

    async deletePost(req, res) {
        const id = req.params.id.int()
        const post = await Prisma.posts.delete({ where: { id } })
        res.json(post)
    }

    async listCommentsByPostId(req, res) {
        const id = req.params.id.int()
        const comments = await Prisma.comments.findMany({ where: { postId: id } })
        res.json(comments)
    }

    async UserByPostId(req, res) {
        const id = req.params.id.int()
        const user = await Prisma.users.findUnique({ where: { id } })
        res.json(user)
    }
}

export default Posts