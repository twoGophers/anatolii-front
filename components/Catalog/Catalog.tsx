import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang ';

const items = [
    {
        id: 1,
        title: 'Набор для террасы «Kumsal»',
        price: 42300,
        description: 'Набор для террасы «Kumsal» — идеальное решение для создания уютной и стильной обстановки на вашей террасе. Он включает в себя диван, кресла и стол, а также удобные подушки из влагоотталкивающей ткани на фермуаре в бежевом и белом цвете, обеспечивая  комфорт и удобство.',
        descriptionRO: 'Setul de terase Kumsal este soluția perfectă pentru a crea un mediu confortabil și elegant pe terasa dvs. Include o canapea, fotolii și o masă, precum și perne confortabile din țesătură hidrofugă pe o clemă în bej și alb, oferind confort și comoditate.',
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
        descriptionRO: 'Cutia este realizată dintr-un cadru metalic, acoperit cu vopsea pudră, țesut manual din ratan artificial.',
        image: ['item21.jpg', 'item22.jpg', 'item23.jpg'],
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
        descriptionRO: 'Băuturile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
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
        descriptionRO: 'Stolele din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
        image: ['item31.jpg', 'item32.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        name: "Мебель для террасы",
        nameMD: "Stole de la pierre",
        url: "stole-pierre-4"
    }, {
        id: 5,
        title: 'Комод из ротанга',
        price: 7000,
        description: 'Комод изготовлен из искусственного ротанга, который обладает высоким качеством и легкостью использования.',
        descriptionRO: 'Comodurile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
        image: ['item41.jpg'],
        catalog: "Мебель из ротанга",
        catalogMD: "Mobilier din ratan",
        urlCatalog: "",
        name: "Мебель для террасы",
        nameMD: "Comoduri de la pierre",
        url: "stole-pierre-5"
    }
]

export default function Catalog( {lang}: any ) {
    const { isLangLoaded } = useLang();
    const [ countItems, setCountItems ] = useState(3);

    useEffect(() => {
        let icon = localStorage.getItem('icon');

        if(icon === 'nine') {
            setCountItems(3);
        } else if(icon === 'fourteen') {
            setCountItems(4);
        } else if(icon === 'tventyfive') {
            setCountItems(5);
        }

    }, [localStorage.getItem('icon')]);


    if (!isLangLoaded) {
        return null;
      }
    

    return (
      <div className={`mt-2 grid grid-cols-${countItems} gap-7`}>
        {items.map((item) => (
          <Link
            href={`card/${item.url}`}
            key={item.id}
          >
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
            <h5 className="mt-2 text-center">{item.title}</h5>
            <div className='w-full flex justify-center mt-1 '>
                <p className='text-[#a6c4b1] text-base font-medium'>{new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(item.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  
