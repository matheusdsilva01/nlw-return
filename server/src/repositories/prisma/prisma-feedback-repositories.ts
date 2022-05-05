import { prisma } from "../../prisma";
import { FeedbackCreateData, feedbacksRepositories } from "../feedbacks-repositories";

export class PrismaFeedbackRepositories implements feedbacksRepositories {
    async create({type, comment, screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                comment: type,
                type: comment,
                screenshot: screenshot
            }
        })
    }

}