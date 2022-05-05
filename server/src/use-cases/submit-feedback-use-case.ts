import { mailAdapter } from "../adapters/mail-adapter";
import { feedbacksRepositories } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepositories: feedbacksRepositories,
        private mailAdapter: mailAdapter
    ) { }


    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error("Type is required.")
        }
        
        if(!comment) {
            throw new Error("Comment is required.")
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format")
        }
        await this.feedbacksRepositories.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'New feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}`,
                `<p>Comentário: ${comment}`,
                `</div>`
            ].join('\n')
        })
    }
}