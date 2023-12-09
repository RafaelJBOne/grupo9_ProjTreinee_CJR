import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

class Posts {
    async createPost(user_id, content) { //criar posts
        return await Prisma.posts.create({
            data: {
                user_id,
                content,
            }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async listPosts() { //listar posts
        const posts = await Prisma.posts.findMany()
        return posts
    }

    async listPostsByUserId(user_id) { //listar posts por id do usuário
        return await Prisma.posts.findMany({
            where: { user_id: user_id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Usuário não encontrado')
            else
                throw error
        })
    }

    async editPost(post_id, content) { //editar posts
        return await Prisma.posts.update({
            where: { id: post_id },
            content
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw error
        })
    }

    async deletePost(post_id) { //deletar posts
        return await Prisma.posts.delete({
            where: { id: post_id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw error
        })
    }

    async listCommentsByPostId(post_id) { //listar comentarios por id do post
        return await Prisma.comments.findMany({
            where: { id: post_id } 
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw error
        })
    }

    async UserByPostId(post_id) { //listar usuario por id do post
        return await Prisma.users.findUnique({
            where: { id: post_id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Post não encontrado')
            else
                throw error
        })
    }
}

export default Posts