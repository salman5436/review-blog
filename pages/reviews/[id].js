import Markdown from "react-markdown";
import PageLayout from '../../components/PageLayout'
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';



export const getServerSideProps = async function ({ params }) {
    const review = await prisma.review.findUnique({
        where: {
            id: String(params?.id)
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: review
    };
};

const Review = (props) => {
    const router = useRouter();

    //authenticating user for review actions:
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <div>Authenticating ...</div>
    }
    //!!!! TO DO: HAVE TO CONFIGURE ANOTHER PRISMA MIGRATION TO CHANGE THIS TO AN EMAIL CHECK!!!:
    const authorCheck = session?.user?.name === props.author?.name
    // console.log(`The user is: ${session?.user?.name}`)
    // console.log(`The author is: ${props.author?.name}`)
    // console.log(`The authorCheck shows: ${authorCheck}`)


    let title = props.title
    if (!props.published) {
        title = `${title} ~Draft~`
    }

    const editReview = () => {
        router.push(`/edit/${props.id}`);
    };

    async function deleteReview(id) {
        await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        })
        router.push('/')
    }

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
                <div className="text-gray-600 mb-4">
                    <i>By {props?.author?.name || "Anonymous"}</i>
                </div>
                <div className="prose">
                    <Markdown>
                        {props.content}
                    </Markdown>
                </div>
            </div>
            {/* if you're logged and the review belongs to you, spawn an edit button: */}
            {authorCheck && (
                <button
                    className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md overflow-hidden"
                    onClick={editReview}
                >
                    Edit Review
                </button>
            )}
            {authorCheck && props.published && (
                <button
                    onClick={() => deleteReview(props.id)}
                    className="max-w-2xl mx-auto my-8 p-6 rounded-lg shadow-md overflow-hidden bg-red-800"
                >
                    Delete Review
                </button>
            )}


        </PageLayout>
    )
}

export default Review;