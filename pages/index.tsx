import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { baseUrl } from '@/hooks/base_url';
import { fullImageshow } from '@/store/slices/ui';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import HeadComponent from '@/components/Head/Head';

export default function Home() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const { catalogAll, subCatalogAll, cardArr } = useAppSelector((state: any) => state.catalog);

  const openFullscreen = (image: any) => {
    dispatch(fullImageshow({ show: true, image: image }));
  };

  return (
    <section className='home container'>

        <HeadComponent
          title={'SUNYARD'}
          description={'Мебель на заказ'}
          url={'http://localhost:3000/'}
        />
        {/* First block */}
        <div className="home-group-1 grid grid-cols-2 grid-rows-2 gap-5">
          {
            catalogAll && catalogAll?.map(( item: any ) => (
            <Link key={item.id || item._id} href={`catalog/${item.url}`} className='relative group'>
              <div className='overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[300px] w-full'>
                {
                  item.image &&       
                  <Image
                    src={`${baseUrl}/${item.image}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Home"
                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                  />
                }
                <div className='group__box-shadow'></div>
                <div className='absolute bottom-8 flex justify-center w-full text-white h4-size z-2'>
                  <h4 className='max-w-96 text-center'>{ lang === "RU" ? item?.catalog : item?.catalogMD }</h4>
                </div>
              </div>
            </Link>
            ))
          }
        </div>

          {
            catalogAll && catalogAll[0]?.items.length > 0 &&
            <>
            <Title 
              lang={lang}
              textRU={"ПОРТФОЛИО (РОТАНГ)"}
              textRO={"PORTOFOLIU (ROTAN)"}
            />

            {/* rotang */}
              <div className='flex w-full gap-5'>
              {
              catalogAll && catalogAll[0]?.items?.slice(0, 4).map(( item: any ) => (
                <Link key={item.url || item.name} href={`catalog/${item.url}`} className='relative group w-full'>
                  <div className='overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[200px]'>
                    {
                      item?.image &&       
                      <Image
                        src={`${baseUrl}/${item.image}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Home"
                        className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                      />
                    }
                    <div className='group__box-shadow'></div>
                    <div className='absolute bottom-4 flex justify-center w-full text-base font-bold text-white z-2'>
                      <h4 className='text-lg'>{ lang === "RU" ? item?.name : item?.nameMD }</h4>
                    </div>
                  </div>
                </Link>
                ))
              }
              </div>
            </>
          }


        {/* Second block */}
        {
          catalogAll &&  catalogAll[1]?.items.length > 0 &&
          <>
            <Title 
              lang={lang}
              textRU={"ПОРТФОЛИО (ЛОФТ)"}
              textRO={"PORTOFOLIU (LOFT)"}
            />

              {/* rotang */}
              <div className='flex w-full gap-5'>
              {
                catalogAll && catalogAll[1]?.items?.slice(0, 3).map(( item: any ) => (
                <Link key={item.url || item.name} href={`catalog/${item.url}`} className='relative group w-full'>
                  <div className='overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[250px]'>
                    {
                      item?.image &&       
                      <Image
                        src={`${baseUrl}/${item.image}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Home"
                        className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                      />
                    }
                    <div className='group__box-shadow'></div>
                    <div className='absolute bottom-4 flex justify-center w-full text-base font-bold text-white z-2'>
                      <h4 className='text-lg'>{ lang === "RU" ? item?.name : item?.nameMD }</h4>
                    </div>
                  </div>
                </Link>
                ))
              }
              </div>
          </>
        }


        {/* Second block */}
        <Title 
          lang={lang}
          textRU={"КАТАЛОГ"}
          textRO={"CATALOG"}
        />

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='swiper-home'
      >
        {
          cardArr && cardArr.map((item: any) => (
            <SwiperSlide key={item.id || item._id} className='relative group w-full cursor-pointer'>
              <div 
                className='overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[400px]'
                onClick={() => openFullscreen(item.images[0])}
              >
                  <Image
                    src={`${baseUrl}/${item.images[0]}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Home"
                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                  />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

    </section>
  );
}

export const Title = ( { lang, textRU, textRO }: any ) => {
  return (
    <div className="relative my-5 flex items-center justify-center">
      <span className="absolute inset-x-0 bottom-1/2 h-[1px] bg-gray-300 "></span>
      <h4 className="text-center relative z-10 pb-2 h4-size bg-white px-4"> { lang === "RU" ? textRU : textRO } </h4>
    </div>
  )
}