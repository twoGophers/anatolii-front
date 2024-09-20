import React from 'react';
import Head from 'next/head';

export default function HeadComponent({ title, description, url, type }: any) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="og:url" content={`${url}`} />
        <meta property="og:type" content={`${type}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/icon.ico" />
    </Head>
  )
}
