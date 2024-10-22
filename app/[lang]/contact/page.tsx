import Calendar from '@/app/components/Calendar';
import checkLanguage from '@/app/utils/checkLanguage';

async function getSeoData(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
      query getSeoData {
        pagina(filter: {slug: {eq: "contact"}}, locale: ${lng}) {
          id
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

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { lang } = params;

  const lng = checkLanguage(lang);
  const metaData = await getSeoData(lng);

  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  };
}

export default function Contact() {
  return (
    <main className="w-4/5 text-center text-stone-800 2xl:w-6/12 dark:text-stone-100">
      <h1 className="mb-5 text-4xl font-bold">Contact</h1>
      <Calendar />
    </main>
  );
}
