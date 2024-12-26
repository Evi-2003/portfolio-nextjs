import { ALL_POSTS_QUERY } from '@/app/queries/AllPostsQuery';
import { markdownToText } from '@/app/utils/markdownToText';
import { executeQuery } from '@datocms/cda-client';
import { format } from 'date-fns';
import Link from 'next/link';

async function getSeoData() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "blog"}}) {
          id
          label
          seoGegevens {
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

export async function generateMetadata() {
  const seoData = await getSeoData();

  return {
    title: seoData.pagina.seoGegevens.title,
    description: seoData.pagina.seoGegevens.description,
  };
}

const blog = async () => {
  const result = await executeQuery(ALL_POSTS_QUERY, {
    token: process.env.DATO_CMS_API_KEY_READ_ONLY ?? '',
    environment: 'main',
  });

  return (
    <div className="flex w-full flex-col gap-2 text-stone-800 dark:text-stone-100">
      <h1 className="text-balance text-3xl font-bold">Blog</h1>
      <ul className="flex w-fit min-w-96 max-w-96 flex-col gap-4">
        {result?.allBlogs.map((post) => (
          <Link
            prefetch
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-medium">{post.title}</h2>
              <p className="text-sm opacity-50">{format(new Date(post._publishedAt as string), 'dd-MM-yyyy')}</p>
            </div>

            <p className="line-clamp-2 text-sm opacity-70">{markdownToText(post.content as string)}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default blog;
