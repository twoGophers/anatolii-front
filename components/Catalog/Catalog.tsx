import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang ';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCardQueryUrl } from '@/store/slices/catalog';
import { baseUrl } from '@/hooks/base_url';
import { Card } from '@/typescript';

export default function Catalog({ lang, cardUrl }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLangLoaded } = useLang();
  const { icon } = useAppSelector((state) => state.ui);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {
    const url = Array.isArray(router.query.url) ? router.query.url[0] : router.query.url;

    if (typeof url === 'string') {
      const response = dispatch(getCardQueryUrl({ url }));
      
    }
  }, [router.query.url]);

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => {
      setAnimationClass('fade-in');
    }, 300);
    return () => clearTimeout(timer);
  }, [icon]);

  if (!isLangLoaded) {
    return null;
  }

  const getGridColumnsClass = () => {
    switch (icon) {
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      default:
        return 'grid-cols-3';
    }
  };

  if (!cardUrl) {
    return (
      <div className='text-xl font-semibold text-center mt-24'>
        Нет карточек
      </div>
    );
  }

  return (
    <div className={`catalog mt-2 grid ${getGridColumnsClass()} gap-7 container-animation ${animationClass}`}>
      {cardUrl &&
        baseUrl && cardUrl.map((item: Card) => (
          <Link href={`card/${item.url}`} key={item._id} className='catalog__card'>
            <div className="w-full pt-[100%] relative overflow-hidden">
              <Image
                src={item.images[0] ? `${baseUrl}/${item.images[0]}` : '/defaultimage.jpg'}
                alt={item.images[0]}
                fill
                quality={100}
                priority
                className="object-cover center transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h5 className="mt-2 text-center">
              {lang === 'RU' ? item.name : item.nameMD}
            </h5>
            <div className="w-full flex justify-center mt-1 ">
              <p className="text-[#a6c4b1] text-base font-medium">
                {new Intl.NumberFormat('ro-RO', {
                  style: 'currency',
                  currency: 'MDL',
                }).format(item.price)}
              </p>
            </div>
          </Link>
        ))}
        {/* <div className='h-screen'></div> */}
    </div>
  );
}
