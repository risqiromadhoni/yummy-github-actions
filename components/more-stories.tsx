import PostPreview from './post-preview'
import Post from '../types/post'
import { FC } from 'react'

type Props = {
  posts: Post[]
  title?: string;
}

const MoreStories: FC<Props> = (props) => {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {props.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {props.posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

MoreStories.defaultProps = {
  title: 'More Stories'
}

export default MoreStories
