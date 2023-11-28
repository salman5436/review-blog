import PageLayout from "../components/PageLayout";
import Review from "../components/Review"
import { useState, useEffect } from "react";



export default function Account() {
    const [activeTab, setActiveTab] = useState('drafts');
    const [reviews, setReviews] = useState({ drafts: [], published: [] });

    useEffect(() => {
        fetch(`/api/account`)
            .then(response => response.json())
            .then(data => {
                setReviews({
                    drafts: data.filter(review => !review.published),
                    published: data.filter(review => review.published)
                })
            })
    }, [])

    return (
        <PageLayout>
            <div>
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Your account:</h1>
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('drafts')}
                        className="flex-3 max-w-2xl mx-auto my-8 p-6 bg-white hover:bg-gray-400 text-gray-800 font-bold overflow-hidden rounded-l"
                    >
                        Drafts
                    </button>
                    <button
                        onClick={() => setActiveTab('published')}
                        className="flex-3 max-w-2xl mx-auto my-8 p-6 bg-white hover:bg-gray-400 text-gray-800 font-bold overflow-hidden rounded-l"
                    >
                        Published
                    </button>


                </div>
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

                <div>
                    {activeTab === 'drafts' && (
                        <div>
                            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">Drafts:</p>
                            {reviews.drafts.map(review => (
                                <div key={review.id} className="post">
                                    <Review review={review} />
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'published' && (
                        <div>
                            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">Published Reviews:</p>
                            {reviews.published.map(review => (
                                <div key={review.id} className="post">
                                    <Review review={review} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .post {
                  background: white;
                  transition: box-shadow 0.1s ease-in;
                }
            
                .post:hover {
                  box-shadow: 1px 1px 3px #aaa;
                }
            
                .post + .post {
                  margin-top: 2rem;
                }
            `}</style>
        </PageLayout>
    )
}