import { useEffect, useState } from 'react';
import catalog from '@/db/catalog.json';
import Image from "next/image";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { baseUrl } from '@/hooks/base_url';


// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import HeadComponent from '@/components/Head/Head';

export default function Home() {
  const lang = useAppSelector((state) => state.ui.ui);
  const { catalogAll, subCatalogAll, cardArr } = useAppSelector((state: any) => state.catalog);

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openFullscreen = (image: any) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  console.log(catalogAll);
  

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
                <Link key={item.url || item.name} href={item.url} className='relative group w-full'>
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
                <Link key={item.url || item.name} href={item.url} className='relative group w-full'>
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
          catalog[1]?.items?.map((item: any) => (
            <SwiperSlide key={item.id} className='relative group w-full cursor-pointer'>
              <div 
                className='overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[400px]'
                onClick={() => openFullscreen(item.image)}
              >
                {item?.image && (
                  <Image
                    src={`/${item.image}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Home"
                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                  />
                )}
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {fullscreenImage && (
        <div className="fixed inset-0 z-50 bg-slate-400 bg-opacity-80 flex justify-center items-center transition-opacity duration-300 ease-out opacity-100">
          <button
            className="absolute top-4 right-4 text-white text-3xl z-50 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={closeFullscreen}
          >
            &times;
          </button>
          <div className="relative w-3/4 h-3/4 slider-show-img-smoth">
            <Image
              src={`/${fullscreenImage}`}
              fill
              alt="Fullscreen Image"
              className="object-contain0"
            />
          </div>
        </div>
      )}

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