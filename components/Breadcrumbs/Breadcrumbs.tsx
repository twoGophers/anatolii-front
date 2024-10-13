import Link from 'next/link';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';


export default function Breadcrumbs({ bread }: any) {
  const { bgColor } = useAppSelector((state) => state.ui);

  if (!bread) return null;  

  return (
    <nav aria-label="breadcrumb" className={`${ bgColor ? 'text-gray-500 hover:text-gray-900' : 'text-[#D1D1D1]' }`}>
      <ol className="flex flex-wrap text-sm">
        <li className="mr-2 max-md:mr-1 scroll-snap-start">
          <Link href={bread.mainUrl} >
            {bread.main}
          </Link>
        </li>
        <li className="mr-2 max-md:mr-1">/</li>
        <li className="mr-2 max-md:mr-1 scroll-snap-start">
          <Link href={`${bread.catalogMainUrl}`} >
            {bread.catalogMain}
          </Link>
        </li>
        {bread.catalog && bread.catalogUrl && (
          <>
            <li className="mr-2 max-md:mr-1">/</li>
            <li className="mr-2 max-md:mr-1 scroll-snap-start">
              <Link href={bread.catalogUrl} >
                {bread.catalog}
              </Link>
            </li>
          </>
        )}
        {bread.category && bread.categoryUrl && (
          <>
            <li className="mr-2 max-md:mr-1">/</li>
            <li className="mr-2 max-md:mr-1 scroll-snap-start">
              <Link href={bread.categoryUrl} >
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
