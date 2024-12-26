import Gallery from '../components/Gallery';

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
        pagina(filter: {slug: {eq: "about-me"}}) {
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

const aboutMe = () => {
  return (
    <div className="flex w-full flex-col gap-3 text-stone-800 dark:text-stone-100">
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div
          className="flex h-fit w-full flex-col rounded-lg border border-black/10 bg-neutral-100 p-4
            dark:border-white/10 dark:bg-neutral-800 dark:text-stone-100"
        >
          <span className="font-semibold">what i love to do:</span>
          <ul className="list-decimal pl-6">
            <li>bouldering and lead climbing 🧗‍♂️</li>
            <li>go to concerts 🎸</li>
            <li>traveling 🌍</li>
            <li>coding 💻</li>
            <li>anything tech related 🤖</li>
          </ul>
        </div>

        <div
          className="flex w-full flex-col rounded-lg border border-black/10 bg-neutral-100 p-4 dark:border-white/10
            dark:bg-neutral-800 dark:text-stone-100"
        >
          <span className="font-semibold">what i really want to do in 2025:</span>
          <ul className="text list-decimal pl-6">
            <li>go snowboarding for the first time 🏂</li>
            <li>go on a vacation! 🌍</li>
            <li>finding a great internship! 💼</li>
            <li>meeting alot of new people! 🤝</li>
            <li>learn a lot more about development, and performance optimization 💻</li>
          </ul>
        </div>
      </div>

      <Gallery />
    </div>
  );
};

export default aboutMe;
