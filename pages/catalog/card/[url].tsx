// pages/catalog/card/[id].tsx
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const items = [
    {
        id: 1,
        title: 'Набор для террасы «Kumsal»',
        price: 42300,
        description: 'Набор для террасы «Kumsal» — идеальное решение для создания уютной и стильной обстановки на вашей террасе. Он включает в себя диван, кресла и стол, а также удобные подушки из влагоотталкивающей ткани на фермуаре в бежевом и белом цвете, обеспечивая  комфорт и удобство.',
        descriptionMD: 'Setul de terase Kumsal este soluția perfectă pentru a crea un mediu confortabil și elegant pe terasa dvs. Include o canapea, fotolii și o masă, precum și perne confortabile din țesătură hidrofugă pe o clemă în bej și alb, oferind confort și comoditate.',
        image: ['item1.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        name: "Мебель для террасы",
        nameMD: "Mobilier de terasă",
        url: "stole-pierre-1"
    }, {
        id: 2,
        title: 'Ящик ротанговый',
        price: 5000,
        description: 'Ящик изготовлен из металлического каркаса, покрыт порошковой краской, сплетен вручную из искусственного ротанга.',
        descriptionMD: 'Cutia este realizată dintr-un cadru metalic, acoperit cu vopsea pudră, țesut manual din ratan artificial.',
        image: ['item21.jpg', 'item22.jpg', 'item23.jpg', 'item23.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        name: "Мебель для террасы",
        nameMD: "Stole de la pierre",
        url: "stole-pierre-2"
    }, {
        id: 3,
        title: 'Кушетка из ротанга',
        price: 3000,
        description: 'Кушетка изготовлена из искусственного ротанга, которая обладает высоким качеством и легкостью использования.',
        descriptionMD: 'Băuturile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
        image: ['item21.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        name: "Мебель для террасы",
        nameMD: "Băuturi de la pierre",
        url: "stole-pierre-3"
    }, {
        id: 4,
        title: 'Стол из ротанга',
        price: 10000,
        description: 'Стол изготовлен из искусственного ротанга, который обладает высоким качеством и легкостью использования.',
        descriptionMD: 'Stolele din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
        image: ['item31.jpg', 'item32.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        name: "Мебель для террасы",
        nameMD: "Stole de la pierre",
        url: "stole-pierre-4"
    }, {
        id: 5,
        title: 'Комод из ротанга',
        titleMD: 'Comodă din ratan',
        price: 7000,
        description: 'Комод изготовлен из искусственного ротанга, который обладает высоким качеством и легкостью использования.',
        descriptionMD: 'Comodurile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
        image: ['item41.jpg'],

        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        catalogUrl: "ratan",

        category: "Мебель для террасы",
        categoryMD: "Comoduri de la pierre",
        categoryUrl: "ratan-terasa",

        url: "stole-pierre-5",
        
    }
];

import Margin from '@/components/Untils/Margin';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { modalStyle } from '@/store/slices/ui';
import Link from 'next/link';


interface URL {
  main: string;
  mainUrl: string;
  catalogMain: string;
  catalogMainUrl: string;
  catalog: string | undefined;
  catalogUrl: string | undefined;
  category: string | undefined;
  categoryUrl: string| undefined;
  itemName: string | undefined;
}

export default function ProductCard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { url } = router.query;
  const lang = useAppSelector((state) => state.ui.ui);
  const [urlBread, setUrlBread] = useState<URL | undefined>(undefined);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const item = items.find((item) => item.url === url);


  useEffect(() => {
    let url: URL = {
      main: lang === "RU" ? 'Главная' : 'Principal',
      mainUrl: '/',
  
      catalogMain: lang === "RU" ? 'Каталог' : 'Catalog',
      catalogMainUrl: '/catalog',
  
      catalog: lang === "RU" ? item?.catalog : item?.catalogMD,
      catalogUrl: `/catalog/${item?.catalogUrl}`,
  
      category: lang === "RU" ? item?.category : item?.categoryMD,
      categoryUrl: `/catalog/${item?.categoryUrl}`,
  
      itemName: lang === "RU" ? item?.title : item?.titleMD,
    }
  
    setUrlBread(url);
  }, [router, lang]);

  const openFullscreen = (index: any) => {
    setActiveSlideIndex(index);
    setIsFullscreen(true);
    dispatch(modalStyle(true));
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    dispatch(modalStyle(false));
  };
  

  if (!item) return <div>Product not found</div>;

  return (
    <>
      <div className='card container'>
        {/* <Margin /> */}
        <Breadcrumbs bread={urlBread} />

        {/*      <h1>{item.title}</h1>
        <div className="w-full pt-[100%] relative overflow-hidden">
          <Image
            src={`/items/${item.image[0]}`}
            alt={item.title}
            fill
            quality={100}
            priority
            className='object-cover center'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className='text-[#a6c4b1] text-base font-medium'>
          {new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(item.price)}
        </p> */}
      <div className='w-full flex flex-row gap-x-7 justify-between mt-2'>
        <div className='w-1/2 border flex flex-row gap-x-6'>
          {/* Thumbs Swiper */}
          <div className='w-1/4'>
            <Swiper
              onSwiper={setThumbsSwiper} // Set the thumbsSwiper instance
              modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={3}
              direction='vertical'
              navigation={{ 
                nextEl: '.swiper-thumb-next', 
                prevEl: '.swiper-thumb-prev' 
              }}
              className="thumbs-slider"
            >
              {
                items[1].image.map((item, index) => (
                  <SwiperSlide className='relative cursor-pointer' key={index}>
                      <div
                        className='w-full h-full block bg-cover bg-center'
                        style={{ backgroundImage: `url('/items/${item}')` }}
                      ></div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            {/* <div className=' flex flex-row w-full justify-around mt-2 transm'>
              <div className="swiper-thumb-next-me swiper-thumb-next bg-gray-400 hover:bg-gray-500 transition duration-150 ease-out w-8 h-8 rounded-full flex justify-center items-center">↑</div>
              <div className="swiper-thumb-prev-me swiper-thumb-prev bg-slate-400 hover:bg-gray-500 transition duration-150 ease-out w-8 h-8 rounded-full flex justify-center items-center">↓</div>
            </div> */}
          </div>
          <div className='w-3/4'>
            {/* Main Swiper */}
            <Swiper
              modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="main-slider swiper-card flex"
            >
              {
                items[1].image.map((item, index) => (
                  <SwiperSlide key={index} className='relative w-full'>
                    <Image 
                      src={`/items/${item}`} 
                      alt={item} 
                      width={1000} 
                      height={1000}
                      priority
                      className='responsive object-contain'
                      onClick={() => openFullscreen(index)}
                    />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
        <div className='w-1/2 border flex flex-col content-between'>
              <h1 className='text-3xl font-bold '>{ lang === "RU" ? item.title : item.titleMD }</h1>
              <p className='text-[#a6c4b1] text-2xl font-medium mt-2'>
                {new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(item.price)}
              </p>
              <p className='mt-2 text-base text-gray-500'>{ lang === "RU" ? item.description : item.descriptionMD }</p>
              <hr />
              <p>
                <span className='font-semibold'>{lang === "RU" ? 'Категории: ' : 'Categorii: '}</span>
                <Link className='text-gray-500' href={`/catalog/${item?.catalogUrl}`}>{lang === "RU" ? item?.catalog : item?.catalogMD}</Link>, 
                <Link className='ml-2 text-gray-500' href={`/catalog/${item?.categoryUrl}`}>{lang === "RU" ? item?.category : item?.categoryMD}</Link>
              </p>
              <Link className='text-gray-500' href={'google.com'}>Наш шоурум - Г. Кишинёв, Ул. Надежда Руссо 17, Торговый центр "Decor Park" 2 этаж</Link>
        </div>
      </div>

      </div>
      {isFullscreen && (
          <div className="fixed top-0 w-full z-50 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative w-full h-full">
              <button
                className="absolute top-4 right-4 text-white text-3xl z-50"
                onClick={closeFullscreen}
              >
                &times;
              </button>
              <Swiper
                modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
                navigation
                initialSlide={activeSlideIndex}
                className="swiper-fullscreen"
              >
                {items[1].image.map((item, index) => (
                  <SwiperSlide key={index} className='relative w-full h-full'>
                    <Image 
                      src={`/items/${item}`} 
                      alt={item} 
                      fill
                      className='object-contain '
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
      )}
    </>
  );
}