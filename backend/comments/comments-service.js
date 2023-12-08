import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Comments {
    async createComment(post_id, user_id, content) { //criar comentario
        return await Prisma.comments.create({
            data: {
                post_id,
                user_id,
                content,
            }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw Error('erro 1')
        })
    }

    async listComments() { //listar comentarios
        const comments = await Prisma.comments.findMany()
        return comments
    }

    async listCommentsByPostId(post_id) { //listar comentarios por id do post
        return await Prisma.comments.findUnique({
            where: { id: post_id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw error
        })
    }

    async editComment(comment_id, content) { //editar comentario
        return await Prisma.comments.update({
            where: { id: comment_id }, content
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Comentário não encontrado')
            else
                throw error
        })
    }

    async deleteComment(comment_id) { //deletar comentario
        return await Prisma.comments.delete({
            where: { id: comment_id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Comentário não encontrado')
            else
                throw error
        })
    }

    async listUserByCommentId(comment_id) { //listar usuário por id do comentario
        return await Prisma.comment.findUnique({
            where: { id: comment_id },
            select: { user_id: true }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Comentário não encontrado')
            else
                throw error
        })
    }
}

export default Comments