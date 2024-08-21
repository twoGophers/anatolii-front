import React, { useState } from 'react';
import data from "@/db/catalog.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CategoriaNav() {
  const router = useRouter()
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h5 className="text-[#2d2a2a] font-semibold text-lg uppercase">Категории товаров</h5>
      <ul className='text-[#727272]'>
        {data?.map((item, index) => (
          <li key={index} className="border-gray-300">
            <div 
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <Link href={`${item.url}`}><span className='text-base'>{item.catalog}</span></Link>
              <p>{item.url}</p>
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
                    <li key={subItem.id} className="py-1 text-base"><Link href={`${subItem.url}`}>{subItem.name}</Link></li>
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
