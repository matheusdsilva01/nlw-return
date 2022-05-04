import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "50469c309b5c62",
        pass: "555a7c7270b58d"
    }
});

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            comment: type,
            type: comment,
            screenshot: screenshot
        }
    })
    await transport.sendMail({
        from: 'Equipe Feedget <team.feedget@feedget.com>',
        to: 'Matheus Silva <ms250222003@gmail.com>',
        subject: 'New feedback',
        html:[
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}`,
            `<p>Comentário: ${comment}`,
            `</div>`
        ].join('\n')
    });
    return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log("Roudooooooou!!")
})