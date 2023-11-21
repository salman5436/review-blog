import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

//REQUEST ON UPDATE: /api/post/:id
export default async function handle(req, res) {
    const reviewId = req.query.id

    //accessing session to check for user authentication
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({ message: "You must be signed in to edit this review!" })
    }

    if (req.method === "PUT") {
        const { title, content, published } = req.body
        try {
            // Only allow updates to title and content; ensure published status is a boolean
            const review = await prisma.review.update({
                where: {
                    id: reviewId 
                },
                data: {
                    title,
                    content,
                    published: !!published
                }
            })
            res.json(review)
        } catch (error) {
            console.error("Error during database operation:", error);
            res.status(500).json({ message: "Failed to update review", error: error.message });
        }
    }
}