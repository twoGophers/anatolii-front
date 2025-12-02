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
  const { icon, bgColor } = useAppSelector((state) => state.ui);
  const [animationClass, setAnimationClass] = useState<string>('');
  const [validImages, setValidImages] = useState<{ [key: string]: string }>({}); // key: item._id, value: src

  useEffect(() => {
    const url = Array.isArray(router.query.url) ? router.query.url[0] : router.query.url;
    if (typeof url === 'string') {
      dispatch(getCardQueryUrl({ url }));
    }
  }, [router.query.url]);

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => setAnimationClass('fade-in'), 300);
    return () => clearTimeout(timer);
  }, [icon]);

  // Проверяем картинки
  useEffect(() => {
    if (!cardUrl) return;

    async function checkImages() {
      const results: { [key: string]: string } = {};

      await Promise.all(
        cardUrl.map(async (item: Card) => {
          if (!item.images || !item.images[0]) {
            results[item._id] = '/defaultimage.jpg';
            return;
          }

          const url = `${baseUrl}/${item.images[0]}`;
          try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) {
              results[item._id] = url;
            } else {
              results[item._id] = '/defaultimage.jpg';
            }
          } catch (e) {
            results[item._id] = '/defaultimage.jpg';
          }
        })
      );

      setValidImages(results);
    }

    checkImages();
  }, [cardUrl]);

  if (!isLangLoaded) return null;

  const getGridColumnsClass = () => {
    switch (icon) {
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      case 5: return 'grid-cols-5';
      default: return 'grid-cols-3';
    }
  };

  if (!cardUrl || cardUrl.length === 0) {
    return (
      <div className='text-xl font-semibold text-center mt-24'>
        {lang === "RU" ? 'Нет карточек' : 'Fără carduri'}
      </div>
    );
  }

  return (
    <div className={`catalog mt-2 grid ${getGridColumnsClass()} gap-7 container-animation ${animationClass}`}>
      {cardUrl.map((item: Card) => {
        const imgSrc = validImages[item._id] || '/defaultimage.jpg'; // безопасный src
        return (
          <Link href={`card/${item.url}`} key={item._id} className='catalog__card'>
            <div className="w-full pt-[100%] relative overflow-hidden">
              <Image
                src={imgSrc}
                alt={item.images && item.images[0] ? item.images[0] : 'default'}
                fill
                quality={100}
                priority
                className="object-cover center transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h5 className={`${bgColor ? 'text-[#333]' : 'text-[#D1D1D1]'} mt-2 text-center`}>
              {lang === 'RU' ? item.name : item.nameMD}
            </h5>
            <div className="w-full flex justify-center mt-1">
              <p className="text-[#a6c4b1] text-base font-medium">
                {new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(item.price)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
