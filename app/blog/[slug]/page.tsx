import StyledMarkdown from '@/app/components/StyledMarkdown';
import { GET_POST_BY_SLUG } from '@/app/queries/GetPostBySlug';
import { executeQuery } from '@datocms/cda-client';
import Link from 'next/link';

export async function generateStaticParams() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
      allBlogs {
        id
        slug
      }
    }
  `,
    }),
  }).then((res) => res.json());

  return data.allBlogs.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

async function getSeoData(slug: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        blog(filter: {slug: {eq: "${slug}"}}) {
          id
          slug
          title
          seo {
            description
            title
          }
        }
      }
  `,
    }),
  }).then((res) => res.json());

  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const seoData = await getSeoData(slug);

  return {
    title: seoData.blog.seo.title,
    description: seoData.blog.seo.description,
  };
}

const SinglePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const result = await executeQuery(GET_POST_BY_SLUG, {
    variables: {
      slug,
    },
    token: process.env.DATO_CMS_API_KEY_READ_ONLY ?? '',
    environment: 'main',
  });

  const post = result?.blog;

  return (
    <div className="grid h-full w-full auto-rows-min grid-cols-3 justify-start space-y-2 pb-10 text-left dark:text-white">
      <div className="col-span-full row-start-1 text-sm">
        <Link href="/blog" prefetch>
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span>{post?.title}</span>
      </div>

      <h1 className="col-span-full row-start-2 text-2xl font-semibold sm:text-3xl">{post?.title}</h1>

      <div
        className="col-span-full !-mt-1 flex flex-col text-balance text-base text-stone-800 lg:w-4/5 dark:text-stone-100"
      >
        <StyledMarkdown content={post?.content} />
      </div>
    </div>
  );
};

export default SinglePost;
