import Markdown from "react-markdown";
import PageLayout from '../components/PageLayout'

export const getServerSideProps = async function ({ params }) {
    const review = await prisma.post.findUnique({
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
    let title = props.title
    if (!props.published) {
        title = `${title} ~Draft~`
    }

    return (
        <PageLayout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || "Anonymous"}</p>
                <Markdown>
                    {props.content}
                </Markdown>
                <style jsx>{`
                    .page {
                    background: white;
                    padding: 2rem;
                    }

                    .actions {
                    margin-top: 2rem;
                    }

                    button {
                    background: #ececec;
                    border: 0;
                    border-radius: 0.125rem;
                    padding: 1rem 2rem;
                    }

                    button + button {
                    margin-left: 1rem;
                    }
                `}</style>
            </div>
        </PageLayout>
    )
}

export default Review;