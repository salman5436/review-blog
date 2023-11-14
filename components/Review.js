import Router from 'next/navigation'
import Markdown from 'react-markdown'

const Review = function ( {review} ) {
    const authorName = review.author ? review.author.name : "Anonymous"

    return (
        <div className='bg-inherit p-8' 
          onClick={() => Router.push("/reviews/[id]", `/p/${review.id}`)
        }
          >
            <h2>{review.title}</h2>
            <small>By {authorName}</small>
            <Markdown >
                {review.content}
            </Markdown>
        </div>
    )
}

export default Review;