import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import Margin from '@/components/Untils/Margin';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { setModalFull } from '@/store/slices/ui';
import Link from 'next/link';
import HeadComponent from '@/components/Head/Head';
import { getOneCard, getCardQueryUrl } from '@/store/slices/catalog';
import { baseUrl } from '@/hooks/base_url';


interface URL {
  main: string;
  mainUrl: string;
  catalogMain: string;
  catalogMainUrl: string;
  catalog: string | undefined;
  catalogUrl: string | undefined;
  category: string | undefined;
  categoryUrl: string | undefined;
  itemName: string | undefined;
}

export default function ProductCard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const [urlBread, setUrlBread] = useState<URL | undefined>(undefined);
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  const { cardOne, cardUrl } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    const url = Array.isArray(router.query.url) ? router.query.url[0] : router.query.url;

    if (typeof url === 'string') {
      dispatch(getOneCard({ url }));
    }
  }, [router.query.url]);

  useEffect(() => {
    if (cardOne) {
      dispatch(getCardQueryUrl({ url: cardOne.urlCatalog }));
    }
  }, [cardOne]);

  useEffect(() => {
    let url: URL = {
      main: lang === 'RU' ? 'Главная' : 'Principal',
      mainUrl: '/',
      catalogMain: lang === 'RU' ? 'Каталог' : 'Catalog',
      catalogMainUrl: '/catalog/catalog',
      catalog: lang === 'RU' ? cardOne?.catalog : cardOne?.catalogMD,
      catalogUrl: `/catalog/${cardOne?.urlCatalog}`,
      category: lang === 'RU' ? cardOne?.subCatalog : cardOne?.subCatalogMD,
      categoryUrl: `/catalog/${cardOne?.urlSubCatalog}`,
      itemName: lang === 'RU' ? cardOne?.name : cardOne?.nameMD,
    };

    setUrlBread(url);
  }, [lang, cardOne]);

  if (!cardOne) return <div>Product not found</div>;

  const openFullscreen = (index: any) => {
    dispatch(setModalFull({ show: true, index, images: cardOne?.images }));
  };

  return (
    <>
      <div className="card-item container">
        {/* SEO */}
        <HeadComponent
          title={urlBread?.itemName}
          description={lang === 'RU' ? cardOne.description : cardOne.descriptionRO}
          url={`http://localhost:3000/catalog/card/${router.query.url}`}
        />
        {/* SEO */}
        <Margin />
        <Breadcrumbs bread={urlBread} />
        <div className=" w-full flex flex-col gap-x-7 justify-between mt-2 md:flex-row">
          <div className="card-slider w-full md:w-1/2 flex flex-row items-start gap-x-6">
            {/* Thumbs Swiper */}
            <div className="w-1/4 max-lg:hidden">
              <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)} // Set the thumbsSwiper instance
                modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={3}
                direction="vertical"
                navigation={{
                  nextEl: '.swiper-thumb-next',
                  prevEl: '.swiper-thumb-prev',
                }}
                className="thumbs-slider"
                breakpoints={{
                  1024: {
                    direction: 'vertical',
                    slidesPerView: 3,
                  },
                  0: {
                    direction: 'horizontal',
                    slidesPerView: 2,
                  },
                }}
              >
                {cardOne.images.map((item, index) => (
                  <SwiperSlide className="relative cursor-pointer" key={index}>
                    <Image
                      src={`${baseUrl}/${item}`}
                      alt={item}
                      width={100}
                      height={100}
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-3/4 max-lg:w-full">
              {/* Main Swiper */}
              <Swiper
                modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="main-slider swiper-card flex"
              >
                {cardOne.images.map((item, index) => (
                  <SwiperSlide key={index} className="relative w-full">
                    <Image
                      src={`${baseUrl}/${item}`}
                      alt={item}
                      width={1000}
                      height={100}
                      priority
                      className="responsive object-contain"
                      onClick={() => openFullscreen(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col content-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{lang === 'RU' ? cardOne.name : cardOne.nameMD}</h1>
            <p className="text-[#a6c4b1] text-2xl max-lg:text-xl font-medium mt-2">
              {new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(cardOne.price)}
            </p>
            <div className="description-card my-2">
              <div dangerouslySetInnerHTML={{ __html: lang === 'RU' ? cardOne.description : cardOne.descriptionRO }} />
            </div>
            <hr />
            <p>
              <span className="font-semibold">{lang === 'RU' ? 'Категории: ' : 'Categorii: '}</span>
              <Link className="text-gray-500" href={`/catalog/${cardOne.urlCatalog}`}>
                {lang === 'RU' ? cardOne.catalog : cardOne.catalogMD}
              </Link>
              , <Link className="ml-2 text-gray-500" href={`/catalog/${cardOne.urlSubCatalog}`}>
                {lang === 'RU' ? cardOne.subCatalog : cardOne.subCatalogMD}
              </Link>
            </p>
            <Link className="text-gray-500" href="https://google.com">
              Наш шоурум - Г. Кишинёв, Ул. Надежда Руссо 17, Торговый центр 2 этаж
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      {
        cardUrl.length > 1 &&
        <div className="container similar-products">
          <h2 className="h4-size my-5">{lang === 'RU' ? 'Похожие товары' : 'Produse similare'}</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            className="similar-products"
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              420: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
            }}
          >
            {cardUrl?.filter((item: any) => item._id !== cardOne._id).map((item: any) => (
              <SwiperSlide key={item._id} className="relative group w-full cursor-pointer">
                <div className="overflow-hidden shadow-lg relative transform transition-all duration-500 ease-in-out group-hover:shadow-2xl h-[250px]">
                  <Link href={`/catalog/card/${item.url}`}>
                    <div className="relative w-full h-full">
                      {item?.images && (
                        <Image
                          src={`${baseUrl}/${item?.images[0]}`}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="Home"
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                      )}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        }
      
    </>
  );
}
