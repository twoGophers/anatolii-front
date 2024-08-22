import React, { useState } from 'react';
import data from "@/db/catalog.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLang } from '@/hooks/useLang ';

export default function CategoriaNav() {
  const { isLangLoaded } = useLang();
  const router = useRouter()
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lang = useAppSelector((state) => state.ui.ui);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isLangLoaded) {
    return null;
  }

  return (
    <div>
      <h5 className="text-[#2d2a2a] font-semibold text-lg uppercase">{ lang === "RU" ? 'Категории товаров' : 'Categorii de produse' }</h5>
      <ul className='text-[#727272]'>
        {data?.map((item, index) => (
          <li key={index} className="border-gray-300">
            <div 
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <Link href={`${item.url}`}><span className={`text-base ${item.url === router.query.url && 'text-black font-semibold'}`}>{ lang === "RU" ? item.catalog : item.catalogMD }</span></Link>
              <span>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`w-3 rotate-icon ${(openIndex === index || item.url === router.query.url) ? 'open' : ''}`}  
                />
              </span> 
            </div>
            <div className={`accordion-content ${(openIndex === index || item.url === router.query.url) ? 'open animation-nav' : ''}`}>
              {item.items && (
                <ul className="pl-4">
                  {item?.items.map((subItem) => (
                    <li key={subItem.id} className={`text-base py-1 text-base ${subItem.url === router.query.url && 'text-black font-semibold'}`}><Link href={`${subItem.url}`}>{ lang === "RU" ? subItem.name : subItem.nameMD }</Link></li>
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
