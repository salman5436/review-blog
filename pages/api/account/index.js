import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';


export default async function handle(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.query.userId;
    
    const reviews = await prisma.review.findMany({
        where: { userId: userId },
    });
    res.json(reviews);
}