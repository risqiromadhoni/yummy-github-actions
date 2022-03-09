import Link from 'next/link'
import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <div>
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          A statically generated blog example using{' '}
          <a
            href="https://nextjs.org/"
            className="underline hover:text-blue-600 duration-200 transition-colors"
          >
            Next.js
          </a>{' '}
          and {CMS_NAME}.
        </h4>
        <div className='block text-right mt-4'>
          <Link href="/posts" passHref>
            <a className="underline hover:text-blue-600 duration-200 transition-colors font-bold">
              Post
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Intro
