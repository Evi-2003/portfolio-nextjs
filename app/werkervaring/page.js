import Image from 'next/image'
import s10 from '../src/s10.jpeg'
import froukje from '../src/froukje-cover.png'
import twofeet from '../src/twofeet.jpeg'
import glassanimals from '../src/glassanimals.jpeg'

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
        pagina(filter: {slug: {eq: "werkervaring"}}) {
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

async function getWerkErvaring() {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getWerkErvaring {
          allWerkervarings {
            bedrijf
            bedrijfsWebsite
            startdatum
            einddatum
            functie
            id
          }
        }
    `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  return data
}

export default async function Werkervaring() {
  const getData = await getWerkErvaring()
  const data = getData.allWerkervarings
  // data.sort((a, b) => {
  //   return new Date(b.startdatum) - new Date(a.startdatum);
  // });
  return (
    <main className="text-center text-stone-800 dark:text-stone-100">
      <h1 className="text-5xl font-bold mb-5">Werkervaring</h1>
      <ul className="werkvaring-list space-y-5 space-x-5 border-l-[3px] dark:border-white border-solid border-black text-left mx-10" id="werkervaring-list">
        {data.map((element) => (
          <li key={element.id}>
            <figure className=" w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
            <h3 className="text-xl">{element.functie}</h3>
            <h4 className="text-lg">
              <a
                className="text-lg hover:underline"
                href={element.bedrijfsWebsite}
                aria-label={'Evi Wammes werkt bij ' + element.bedrijf + ' vanaf ' + element.startdatum + ' tot ' + element.einddatum}
                target="_blank"
              >
                {element.bedrijf}
              </a>
            </h4>
            <span className="text-base opacity-60 font-bold">
              {new Date(element.startdatum).toLocaleDateString('en-US', {
                month: '2-digit',
                year: 'numeric',
              })}{' '}
              -{' '}
              {element.einddatum
                ? new Date(element.einddatum).toLocaleDateString('en-US', {
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'heden'}
            </span>
          </li>
        ))}

        {/* <li className="list-item ml-5 ">
				<figure className=" w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
				<h3 className="text-xl">Webdesign & Webdevelopment (als ZZP'er)</h3>
				<h4 className="text-lg">Eigenaar - <a className="text-lg hover:underline" href="https://webchange.nl" aria-label="Evi Wammes doet Webdesign & Webdevelopment bij WebChange, haar bedrjf." target="_blank">WebChange</a></h4>
				<span className="text-base opacity-60 font-bold">jan. 2023 - heden</span>
			</li>
			<li>
				<figure className="w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
				<h3 className="text-xl">Vrijwilligerswerk: Genderpraatjes</h3>
				<h4 className="text-lg hover:underline underline-offset-4"><a href="https://genderpraatjes.nl/" target="_blank">Genderpraatjes / COC</a></h4>
				<span className="text-base opacity-60 font-bold">mrt. 2022 - heden</span>
			</li>
			<li >
				<figure className=" w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
				<h3 className="text-xl">ICT Servicedesk Medewerker, en Wordpress developer</h3>
				<h4 className="text-lg hover:underline underline-offset-4"><a href="https://compushare.nl/" target="_blank">CompuShare Automatiseringsoplossingen</a></h4>
				<span className="text-base opacity-60 font-bold">feb. 2021 - heden</span>
			</li>
			<li >
				<figure className=" w-4 h-4 bg-black rounded-full absolute -ml-[1.85rem] dark:bg-white"></figure>
				<h3 className="text-xl">Vulploegmedewerker</h3>
				<h4 className="text-lg hover:underline underline-offset-4"><a href="https://www.jumbo.com/winkel/veenendaal/jumbo-veenendaal-huibers-petenbos" target="_blank">Jumbo Huibers Veenendaal</a></h4>
				<span className="text-base opacity-60 font-bold">jun. 2018 - jan. 2022</span>
			</li> */}
      </ul>
    </main>
  )
}
