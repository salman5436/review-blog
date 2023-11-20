import Markdown from "react-markdown";
import PageLayout from '../../components/PageLayout'
import prisma from "../../lib/prisma";

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
    console.log(review)
    return {
        props: review
    };
};


const Review = (props) => {
    let title = props.title
    if (!props.published) {
        title = `${title} ~Draft~`
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
                {/* Add any actions like edit or delete here */}
            </div>
        </PageLayout>
    )
}

export default Review;