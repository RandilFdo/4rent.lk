"use client";

import Head from 'next/head';

interface DynamicOpenGraphProps {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  price?: number;
  category?: string;
  location?: string;
}

export default function DynamicOpenGraph({
  title,
  description,
  image,
  url,
  type = "website",
  price,
  category,
  location
}: DynamicOpenGraphProps) {
  const siteName = "4Rent Sri Lanka";
  const fullUrl = url.startsWith('http') ? url : `https://4rent-lk-66uy.vercel.app${url}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title} | {siteName}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional OpenGraph Properties */}
      {price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content="LKR" />
        </>
      )}
      {category && <meta property="article:section" content={category} />}
      {location && <meta property="place:location:latitude" content="" />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@4RentSriLanka" />
      <meta name="twitter:creator" content="@4RentSriLanka" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Head>
  );
}
