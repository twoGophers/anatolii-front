import React, { useEffect, useState } from 'react';
import data from "@/db/catalog.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { useLang } from '@/hooks/useLang ';
import { Catalog } from '@/typescript'; 

export default function CategoriaNav() {
  const { isLangLoaded } = useLang();
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lang = useAppSelector((state) => state.ui.ui);
  const catalogAll  = useAppSelector((state) => state.catalog.catalogAll as Catalog[]);

  const handleToggle = (index: number, item: any) => {
    setOpenIndex(openIndex === index ? null : index);
    if( item.title) {
      localStorage.setItem('catalogNameRU', item.title); 
      localStorage.setItem('catalogNameMD', item.titleMD); 
    }
  };

  const handleToggleSub = (item: any) => {
    if ( item.name) {
      localStorage.setItem('catalogNameRU', item.name); 
      localStorage.setItem('catalogNameMD', item.nameMD); 
    }
  };

  useEffect(() => {
    data.forEach((item, index) => {
      if (item.url === router.query.url) {
        setOpenIndex(index);
      }

      item.items?.forEach((subItem) => {
        if (subItem.url === router.query.url) {
          setOpenIndex(index);
        }
      });
    });
  }, [router.query.url]);

  if (!isLangLoaded) {
    return null;
  };

  return (
    <div>
      <h5 className="text-[#2d2a2a] font-semibold text-lg uppercase">
        {lang === "RU" ? 'Категории товаров' : 'Categorii de produse'}
      </h5>
      <ul className='text-[#727272]'>
        {
        catalogAll.map((item, index) => (
          <li key={index} className="border-gray-300">
            <div
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => handleToggle(index, item)}
            >
              <Link href={`${item.url}`}>
                <span className={`text-base ${item.url === router.query.url && 'text-black font-semibold'}`}>
                  {lang === "RU" ? item.catalog : item.catalogMD}
                </span>
              </Link>
              {
                item.items.length > 0 && 
                <span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 rotate-icon ${(openIndex === index) ? 'open' : ''}`}
                  />
                </span>
              }
              
            </div>
            <div className={`accordion-content ${(openIndex === index) ? 'open animation-nav' : ''}`}>
              {item.items && (
                <ul className="pl-4">
                  {item.items.map((subItem: any) => (
                    <li
                      key={subItem.url}
                      onClick={() => handleToggleSub(subItem)}
                      className={`text-base py-1 text-base ${subItem.url === router.query.url && 'text-black font-semibold'}`}
                    >
                      <Link href={`${subItem.url}`}>
                        {lang === "RU" ? subItem.name : subItem.nameMD}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
