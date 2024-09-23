import Link from 'next/link';
import React from 'react';


export default function Breadcrumbs({ bread }: any) {

  if (!bread) return null;  

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap text-sm">
        <li className="mr-2 max-md:mr-1 scroll-snap-start">
          <Link href={bread.mainUrl} className="text-gray-500 hover:text-gray-900">
            {bread.main}
          </Link>
        </li>
        <li className="mr-2 max-md:mr-1">/</li>
        <li className="mr-2 max-md:mr-1 scroll-snap-start">
          <Link href={`${bread.catalogMainUrl}`} className="text-gray-500 hover:text-gray-900">
            {bread.catalogMain}
          </Link>
        </li>
        {bread.catalog && bread.catalogUrl && (
          <>
            <li className="mr-2 max-md:mr-1">/</li>
            <li className="mr-2 max-md:mr-1 scroll-snap-start">
              <Link href={bread.catalogUrl} className="text-gray-500 hover:text-gray-900">
                {bread.catalog}
              </Link>
            </li>
          </>
        )}
        {bread.category && bread.categoryUrl && (
          <>
            <li className="mr-2 max-md:mr-1">/</li>
            <li className="mr-2 max-md:mr-1 scroll-snap-start">
              <Link href={bread.categoryUrl} className="text-gray-500 hover:text-gray-900">
                {bread.category}
              </Link>
            </li>
          </>
        )}
        {bread.itemName && (
          <>
            <li className="mr-2 max-md:mr-1">/</li>
            <li className="text-gray-700 scroll-snap-start">{bread.itemName}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
