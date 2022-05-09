import express from "express";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbackRepositories } from "./repositories/prisma/prisma-feedback-repositories";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
export const routes = express.Router()


routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepositories()
    const nodemailerMailAdapter = new NodemailerAdapter()


    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
    return res.status(201).send()
})