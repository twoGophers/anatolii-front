import React, { useState, useEffect } from 'react';
import Icon from "@/components/Icons/Icon";
import Catalog from '../Catalog/Catalog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLang } from '@/hooks/useLang ';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useRouter } from 'next/router';
import HeadComponent from '../Head/Head';
import { changeIcon } from '@/store/slices/ui';


interface URL {
  main: string;
  mainUrl: string;
  catalogMain: string;
  catalogMainUrl: string;
  catalog: any;
  catalogUrl: string | undefined;
}

export default function CategoryList() {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLangLoaded } = useLang();
  const lang = useAppSelector((state) => state.ui.ui);
  const { icon } = useAppSelector((state) => state.ui);
  const [urlBread, setUrlBread] = useState<URL | undefined>(undefined);
  const [catalogArr, setCatalogArr] = useState<any[]>([]);

  const { cardUrl } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    // Initialize catalogArr with cardUrl
    setCatalogArr(cardUrl);
  }, [cardUrl]);

  useEffect(() => {
    let url: URL = {
      main: lang === "RU" ? 'Главная' : 'Principal',
      mainUrl: '/',
      catalogMain: lang === "RU" ? 'Каталог' : 'Catalog',
      catalogMainUrl: '/catalog/catalog',
      catalog: lang === "RU" ? localStorage.getItem('catalogNameRU') : localStorage.getItem('catalogNameMD'),
      catalogUrl: `/catalog/${router.query.url}`,
    };

    if (router.asPath === '/catalog/catalog') {
      url.catalog = url.catalogMain;
      url.catalogUrl = '';
    };

    setUrlBread(url);
  }, [router, lang]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  
    let arr: any[] = [...cardUrl];
  
    if (value === 'menu_order') {
      arr = [...cardUrl];
    } else if (value === 'popularity') {
      arr = [...cardUrl].sort((a, b) => b.views - a.views);
    } else if (value === 'date') {
      arr = [...cardUrl].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (value === 'price') {
      arr = [...cardUrl].sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      arr = [...cardUrl].sort((a, b) => b.price - a.price);
    }
  
    setCatalogArr(arr);
  };

  const handleIconClick = (icon: number) => {
    dispatch(changeIcon(icon));
  };

  if (!isLangLoaded) {
    return null;
  }

  return (
    <section>
      {/* CEO */}
      <HeadComponent
        title={`${urlBread?.catalog}`}
        description={`${urlBread?.catalogUrl}`}
        url={`http://localhost:3000/catalog/${router.query.url}`}
      />
      {/* CEO */}
      <div className='flex w-full justify-between text-sm'>
        <Breadcrumbs bread={urlBread} />
        <div className="filter flex flex-row gap-x-10">
          <div className='flex flex-row gap-x-4'>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick(3)}
            >
              <Icon icon={3} fill={icon === 3} />
            </span>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick(4)}
            >
              <Icon icon={4} fill={icon === 4} />
            </span>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick(5)}
            >
              <Icon icon={5} fill={icon === 5} />
            </span>
          </div>
          {/* <div>
            { lang === "RU" ? 'Показать :' : 'Arată :' }
            <span className={`${activeIcon === 3 && 'font-bold'}`}> 20 </span> /
            <span className={`${activeIcon === 4 && 'font-bold'}`}> 40 </span> /
            <span className={`${activeIcon === 5 && 'font-bold'}`}> 60 </span>
          </div> */}
          <select
            name="orderby"
            className="orderby border-b-2 border-solid border-[#a6c4b1] cursor-pointer -mt-1"
            defaultValue="menu_order"
            onChange={handleChange}
          >
            <option value="menu_order">
              {lang === "RU" ? "Исходная сортировка" : "Sortare inițială"}
            </option>
            <option value="popularity">
              {lang === "RU" ? "По популярности" : "După popularitate"}
            </option>
            <option value="date">
              {lang === "RU" ? "Сортировка по более позднему" : "Sortare după cele mai recente"}
            </option>
            <option value="price">
              {lang === "RU" ? "Цены: по возрастанию" : "Prețuri: în ordine crescătoare"}
            </option>
            <option value="price-desc">
              {lang === "RU" ? "Цены: по убыванию" : "Prețuri: în ordine descrescătoare"}
            </option>
          </select>
        </div>
      </div>
      <div>
        <Catalog lang={lang} cardUrl={catalogArr} />
      </div>
    </section>
  );
}
