import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalFull } from '@/store/slices/ui';
import HeadComponent from '@/components/Head/Head';
import { useLang } from '@/hooks/useLang ';
import { getCardAll } from '@/store/slices/catalog';
import { baseUrl } from '@/hooks/base_url';

export default function Galerieiia() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const { cardArr } = useAppSelector((state) => state.catalog);
  const { isLangLoaded } = useLang();

  const altText = lang === "RU" ? 'Фото работы' : 'Fotografii lucrărilor';

  useEffect(() => {
    dispatch( getCardAll());
  }, []);

  const images = cardArr?.map( (item: any) => item.images[0]);

  const openFullscreen = (index: any) => {
    dispatch(setModalFull({ show: true, index: index, images: images }));
  };


if (!isLangLoaded) {
  return null;
}


return (
  <div className='gallery container'>
    {/* SEO */}
    <HeadComponent
      title={'НАШИ РАБОТЫ'}
      description={'Мебель на заказ'}
      url={'http://localhost:3000/galereiia'}
    />
    {/* SEO */}

    <h4 className='gallery__title text-lg md:text-xl font-bold text-center text-uppercase '>
      {lang === "RU" ? 'наши работы' : 'lucrările noastre'}
    </h4>

    <div className='gallery__list mt-4 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2  w-full gap-10 md:gap-5 sm:gap-5'>
      { images && images?.map((image: any, index: any) => (
        <div 
          key={index} 
          className="gallery__item relative cursor-pointer " 
          onClick={() => openFullscreen(index)}
        >
          <Image
            src={`${baseUrl}/${image}`}
            alt={altText}
            priority
            fill
            className='gallery__image rounded-md object-cover center transition-transform duration-300 hover:scale-105'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  </div>
);
}
