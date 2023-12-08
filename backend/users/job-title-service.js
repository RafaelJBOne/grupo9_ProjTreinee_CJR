
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Job_title {

    async createJob_title(job_title_name) { //criar cargo
        return await prisma.job_title.create({
            data: {
                name: job_title_name,
            }
        }).catch(error => {
            if (error.code === 'P2002')
                throw new Error('Cargo já cadastrado')
            else
                throw error
        })
    }

    async listJob_title() { //listar cargo
        const job_title = await prisma.job_title.findMany()
        return job_title
    }

    async listJobByName(job_title_name) { //listar cargo por nome
        return await prisma.job_title.findUnique({
            where: { name: job_title_name }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Cargo não encontrado')
            else
                throw error
        })
    }
    
    async listJob_titleById(id) { //listar cargo por id
        return await prisma.job_title.findUnique({
            where: { id: id }
        }).catch(error => {
            if (error.code === 'P2025')
                throw new Error('Cargo não encontrado')
            else
                throw error
        })
    }
}

export default Job_title;