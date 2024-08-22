
import React, { useState, useEffect } from 'react';
import Icon from "@/components/Icons/Icon";
import Catalog from '../Catalog/Catalog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLang } from '@/hooks/useLang ';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useRouter } from 'next/router';

interface URL {
  main: string;
  mainUrl: string;
  catalogMain: string;
  catalogMainUrl: string;
  catalog: any;
  catalogUrl: string | undefined;
}

export default function CategoryaList() {
  const router = useRouter()
  const { isLangLoaded } = useLang();
  const lang = useAppSelector((state) => state.ui.ui);
  const [urlBread, setUrlBread] = useState<URL | undefined>(undefined);
  const [activeIcon, setActiveIcon] = useState('nine');

  const handleIconClick = (iconName: any) => {
    setActiveIcon(iconName);
    localStorage.setItem('icon', iconName);
  };

  useEffect(() => {
    let url: URL = {
      main: lang === "RU" ? 'Главная' : 'Principal',
      mainUrl: '/',
  
      catalogMain: lang === "RU" ? 'Каталог' : 'Catalog',
      catalogMainUrl: '/catalog/catalog',
  
      catalog: localStorage.getItem('catalogName'),
      catalogUrl: `/catalog/${router.query.url}`,
  
    }

    console.log(router);
    
  
    setUrlBread(url);
  }, [router]);
  

  if (!isLangLoaded) {
    return null;
  }

  return (
    <section>
      <div className='flex w-full justify-between text-sm'>
        <Breadcrumbs bread={urlBread} />
        <div className="filter flex flex-row gap-x-10">
          <div>
            Показать : 
            <span className={`${activeIcon === 'nine' && 'font-bold'}`}> 20 </span> /
            <span className={`${activeIcon === 'fourteen' && 'font-bold'}`}> 40 </span> /
            <span className={`${activeIcon === 'tventyfive' && 'font-bold'}`}> 60 </span>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick('nine')}
            >
              <Icon icon='nine' fill={activeIcon === 'nine'} />
            </span>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick('fourteen')}
            >
              <Icon icon='fourteen' fill={activeIcon === 'fourteen'} />
            </span>
            <span
              className='cursor-pointer'
              onClick={() => handleIconClick('tventyfive')}
            >
              <Icon icon='tventyfive' fill={activeIcon === 'tventyfive'} />
            </span>
          </div>
          <div>
            <div>
            <select
                name="orderby"
                className="orderby border-b-2 border-solid border-[#a6c4b1] cursor-pointer"
                defaultValue="menu_order"
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
        </div>
      </div>
      <div>
        <Catalog lang={lang} />
      </div>
    </section>
  );
}
