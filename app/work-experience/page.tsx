import { executeQuery } from '@datocms/cda-client';
import React from 'react';
import Experience from '../components/Experience';
import { EDUCATION_QUERY } from '../queries/Education';

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
        pagina(filter: {slug: {eq: "work-experience"}}, locale: ${lng}) {
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
  const seoData = await getSeoData('en');

  return {
    title: seoData.pagina.seoGegevens.title,
    description: seoData.pagina.seoGegevens.description,
  };
}

async function getWerkErvaring(lng: string) {
  const { data } = await fetch(`${process.env.DATO_CMS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATO_CMS_API_KEY_READ_ONLY}`,
    },
    body: JSON.stringify({
      query: `
        query getWerkErvaring {
          allWerkervarings(locale: ${lng}) {
            bedrijf 
            bedrijfsWebsite
            startdatum
            einddatum
            functie
            id
            shortText
            icon {
             alt
             url
            }
          }
        }
    `,
    }),
  }).then((res) => res.json());

  return data;
}

export default async function Werkervaring() {
  const { allWerkervarings: data } = await getWerkErvaring('en');
  const { allEducations } = await executeQuery(EDUCATION_QUERY, {
    token: process.env.DATO_CMS_API_KEY_READ_ONLY ?? '',
    environment: 'main',
  });

  return (
    <div className="mx-auto flex flex-col gap-3 text-center text-stone-800 dark:text-stone-100">
      <Experience data={data} education={allEducations} />
    </div>
  );
}
