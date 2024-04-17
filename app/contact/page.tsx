import Calendar from '../components/Calendar'

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
        pagina(filter: {slug: {eq: "contact"}}) {
          id
          seoGegevens {
            description
            title
          }
        }
      }
  `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export async function generateMetadata() {
  const metaData = await getSeoData()
  return {
    title: metaData.pagina.seoGegevens.title,
    description: metaData.pagina.seoGegevens.description,
  }
}

export default function Contact() {
  return (
    <main className="text-center w-4/5  2xl:w-6/12 text-stone-800 dark:text-stone-100">
      <h1 className="text-5xl font-bold mb-5">Contact</h1>
      <Calendar />
    </main>
  )
}
