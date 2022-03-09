import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Post from '../../types/post'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface PostPlaceholder {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type BlogProps = {
  allPosts: Post[]
}

const Blog: NextPage<BlogProps> = (props) => {
  const { allPosts } = props;
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container className="py-2">
          {morePosts.length > 0 && <MoreStories title="Posts" posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then((res) => res.json())
    .then<BlogProps['allPosts']>((data) => {
      const now = new Date();
      const resPosts = data as unknown as Array<PostPlaceholder>;
      
      return Promise.resolve(resPosts.map<Post>((post) => ({
        slug: post.id.toString(),
        title: post.title,
        date: now.toISOString(),
        coverImage: '/assets/blog/hello-world/cover.jpg',
        author: {
          name: 'Tim Neutkens',
          picture: '/assets/blog/authors/tim.jpeg'
        },
        excerpt: post.title.substring(0, 300),
        ogImage: {
          url: '/assets/blog/hello-world/cover.jpg'
        },
        content: post.body
      })))
    })
    .catch<BlogProps['allPosts']>((err) => {
      console.error('[ERROR getStaticProps] posts: ', err);
      return Promise.resolve([]);
    })

  return {
    props: { allPosts: posts },
    revalidate: 60
  }
}

export default Blog
