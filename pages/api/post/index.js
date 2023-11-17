// import { getSession } from "next-auth/react"
import prisma from '../../../lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'


// POST ROUTE: api/post
export default async function handle(req, res) {
    const { title, content } = req.body
    const session = await getServerSession(req, res, authOptions)

    // console.log('Session:', session);

    // Ensure a session exists (i.e., user is logged in)
    if (!session) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const result = await prisma.review.create({
            data: {
                title: title,
                content: content,
                author: { connect: { email: session?.user?.email } },
                published: true
            },
        })
        res.json(result)
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating review" });
    }
}
