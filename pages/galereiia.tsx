import React from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalFull } from '@/store/slices/ui';
import HeadComponent from '@/components/Head/Head';

const images = [
  'item1.jpg',
  'item21.jpg',
  'item22.jpg',
  'item23.jpg',
  'item31.jpg',
  'item32.jpg',
  'item41.jpg',
];

export default function Galerieiia() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const altText = lang === "RU" ? 'Фото работы' : 'Fotografii lucrărilor';

  const openFullscreen = (index: any) => {
    dispatch(setModalFull({ show: true, index: index, images: images }));
  };

  return (
    <div className='container'>
      {/* CEO */}
        <HeadComponent
          title={'НАШИ РАБОТЫ'}
          description={'Мебель на заказ'}
          url={'http://localhost:3000/galereiia'}
        />
        {/* CEO */}

      <h4 className='h4-size text-center'>{lang === "RU" ? 'наши работы' : 'lucrările noastre'}</h4>
      <div className='mt-4 grid grid-cols-4 gap-10'>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-64 cursor-pointer" onClick={() => openFullscreen(index)}>
            <Image
              src={`/items/${image}`}
              alt={altText}
              layout="fill"
              objectFit="cover"
              className='rounded-md'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
