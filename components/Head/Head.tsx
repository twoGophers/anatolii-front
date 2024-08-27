import React from 'react';
import Head from 'next/head';

export default function HeadComponent({ title, description, url }) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="og:url" content={`${url}`} />
    </Head>
  )
}
