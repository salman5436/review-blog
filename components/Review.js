import Markdown from 'react-markdown'
import { useRouter } from 'next/router';
import Link from 'next/link';


const Review = function ({ review }) {
  const router = useRouter();

  const authorName = review.author ? review.author.name : "Anonymous"

  const handleClick = () => {
    router.push("/reviews/[id]", `/reviews/${review.id}`)
  }

  return (
    <div className='bg-inherit p-8 mt-5'
      onClick={handleClick}
    >
      <h2 className='bold '>{review.title}</h2>
      <small>By {authorName}</small>
      <div className="prose prose-zinc mt-1">
        <Markdown >
          {review.content}
        </Markdown>
      </div>
    </div>
  )
}

export default Review;


