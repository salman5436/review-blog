import PageLayout from "../components/PageLayout"
import Review from "../components/Review"
import prisma from "../lib/prisma";

export const getStaticProps = async () => {
  const feed = await prisma.review.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 10,
  }
}



const Blog = (props) => {
  return (
    <PageLayout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props?.feed?.map((review) => (
            <div key={review.id} className="post">
              <Review review={review} />
            </div>
          ))}
        </main>
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

export default Blog