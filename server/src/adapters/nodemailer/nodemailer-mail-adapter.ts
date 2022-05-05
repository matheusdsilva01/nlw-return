import nodemailer from 'nodemailer';
import { mailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "50469c309b5c62",
        pass: "555a7c7270b58d"
    }
});

export class NodemailerAdapter implements mailAdapter {
    async sendMail({body, subject}: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <team.feedget@feedget.com>',
            to: 'Matheus Silva <ms250222003@gmail.com>',
            subject,
            html: body,
        });
    };


}