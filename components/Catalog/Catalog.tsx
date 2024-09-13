import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang ';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCardQueryUrl } from '@/store/slices/catalog';
import { baseUrl } from '@/hooks/base_url';
import { Card } from '@/typescript';


export default function Catalog( {lang, cardUrl}: any ) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLangLoaded } = useLang();
    const [ countItems, setCountItems ] = useState<any>(localStorage.getItem("icon"));

    useEffect(() => {
        let icon = localStorage.getItem('icon');
        setCountItems(icon);

    }, [localStorage.getItem('icon')]);

    useEffect(() => {
      const url = Array.isArray(router.query.url) ? router.query.url[0] : router.query.url;
    
      if (typeof url === 'string') {
        console.log(url);
        
        dispatch(getCardQueryUrl({ url }));
      }
    }, [router.query.url]);

    if (!isLangLoaded) {
        return null;
    }

    return (
      <div className={`mt-2 grid grid-cols-${parseInt(countItems)} gap-7`}>
        { cardUrl && cardUrl.map((item: Card) => (
          <Link
            href={`card/${item.url}`}
            key={item._id}
          >
            <div className="w-full pt-[100%] relative overflow-hidden">
              <Image
                src={`${baseUrl}/${item.images[0]}`}
                alt={item.images[0]}
                fill
                quality={100}
                priority
                className='object-cover center transition-transform duration-300 hover:scale-105'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h5 className="mt-2 text-center">{ lang === "RU" ? item.name: item.nameMD }</h5>
            <div className='w-full flex justify-center mt-1 '>
                <p className='text-[#a6c4b1] text-base font-medium'>{new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(item.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  
