import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLayout from '../../components/PageLayout'
import prisma from '../../lib/prisma'

//User Edit Page:
//Grab data for review that user will edit;
export const getServerSideProps = async function ({ params }) {
    const review = await prisma.review.findUnique({
        where: { id: params.id },
    });
    // console.log(review)
    return {
        props: { review: JSON.parse(JSON.stringify(review)) }, // Serialize the review data
    };
};

const EditReview = ({ review }) => {
    const [title, setTitle] = useState(review.title)
    const [content, setContent] = useState(review.content)
    const [published, setPublished] = useState(review.published)

    const router = useRouter()

    useEffect(() => {
        // Redirect to sign-in page if not authenticated
        // Implement authentication check here
    }, []);

    const updateReview = async function (e) {
        e.preventDefault();
        try {
            const body = { title, content, published }
            await fetch(`/api/post/${review.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            console.log(`Redirecting to /reviews/${review.id}`);
            router.push(`/reviews/${review.id}`);
        } catch (error) {
            console.error('An error occurred while updating the review:', error);
        }
    }

    return (
        <PageLayout>
            <form className="max-w-xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md" onSubmit={updateReview}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Review</h2>
                <div className="mb-4">
                    <label htmlFor='title' className='block text-gray-700 font-semibold mb-2'> Title </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='content' className='block text-gray-700 font-semibold mb-2'> Content </label>

                    <textarea
                        id="content"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor='published' className='block text-gray-700 font-semibold mb-2'> Published Review?</label>

                    <input
                        id="published"
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.published)}
                        className="mr-2"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"> Update Review</button>
            </form>

        </PageLayout>
    )
}

export default EditReview;