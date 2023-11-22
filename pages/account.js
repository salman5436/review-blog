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
                <h1>Welcome to your account</h1>
                <div className="tabs">
                    <button onClick={() => setActiveTab('drafts')}>Drafts</button>
                    <button onClick={() => setActiveTab('published')}>Published</button>
                </div>
                <div>
                    {activeTab === 'drafts' && (
                        <div>
                            {reviews.drafts.map(review => (
                                <div key={review.id} className="post">
                                    <Review review={review} />
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'published' && (
                        <div>
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