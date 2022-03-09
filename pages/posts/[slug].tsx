import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PostPlaceholder {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  slug: string
}

export const getStaticProps: GetStaticProps<any, Params> = async ({ params }) => {
  if (!params?.slug) return { props: {} };

  const postPlaceholder = await fetch('https://jsonplaceholder.typicode.com/posts/' + params.slug)
    .then((res) => res.json())
    .then<PostPlaceholder>((data) => {
      const resPosts = data as unknown as PostPlaceholder;
      return Promise.resolve(resPosts)
    })
    .catch<null>(() => Promise.resolve(null))

  const slug = Array.from(new Array(100).keys()).map((key) => key.toString()).includes(params.slug) || !postPlaceholder ? 'hello-world' : params.slug

  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  if (!postPlaceholder || !post) return { props: {} };

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        ...postPlaceholder,
        content,
      },
    },
    revalidate: 30
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']).map((post) => post.slug);
  const postIds = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=50')
    .then((res) => res.json())
    .then<Array<string>>((data) => {
      const resPosts = data as unknown as Array<PostPlaceholder>;
      return Promise.resolve(resPosts.map<string>((post) => post.id.toString()))
    })
    .catch<Array<string>>((err) => {
      return Promise.resolve([]);
    })

  return {
    paths: [...posts, ...postIds].map((post) => {
      return {
        params: {
          slug: post,
        },
      }
    }),
    fallback: false,
  }
}


export default Post