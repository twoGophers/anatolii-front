import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import HeadComponent from '@/components/Head/Head';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';

export default function compania() {

  const center = [47.024512, 28.832159];
  const zoom = 9;

  const lang = useAppSelector((state) => state.ui.ui);

  return (
    <div className='container'>
      {/* CEO */}
        <HeadComponent
          title={ lang === "RU" ? 'Контакты' : 'Contacte'}
          description={lang === "RU" ? 'Мебель на заказ' : 'Mobilier personalizat'}
          url={'http://localhost:3000/contacti'}
        />
        {/* CEO */}

      <h4 className=' text-lg md:text-xl font-bold text-center text-uppercase '>{ lang === "RU" ? 'Контакты' : 'Contacte'}</h4>
      <div className='flex flex-col-reverse lg:flex-row w-full justify-content-between gap-10 mt-4'>
        <div className='w-full lg:w-2/5 flex flex-col'>
          <div className='flex-grow flex justify-between sm:justify-start '>
            <h5 className='font-semibold text-lg active-link'>{ lang === "RU" ? 'Адресс' : 'Adresă'}: </h5>
            <p className='mt-1 ml-2'> { lang === "RU" ? ' г.Кишинев' : ' Chișinău'}</p>
          </div>
          <div className='flex-grow  flex justify-between sm:justify-start '>
            <h5 className='font-semibold text-lg active-link'>{ lang === "RU" ? 'Телефон' : 'Telefon'}: </h5>
            <Link href='tel:+79123456789' className='mt-1 ml-2'> +7 (912) 345-67-89</Link>
          </div>
          <div className='flex-grow  flex justify-between sm:justify-start '>
            <h5 className='font-semibold text-lg active-link'>{ lang === "RU" ? 'Электронная почта' : 'E-mail'}: </h5>
            <Link href='mailto:info@example.com' className='mt-1 ml-2'> info@example.com</Link>
          </div>
        </div>
        <div className='w-full hidden  lg:w-3/5'>
          <YMaps>
            <div className='w-full h-full'>
              <Map defaultState={{ center, zoom }} className='w-full h-full'>
                <Placemark defaultGeometry={center} />
              </Map>
            </div>
          </YMaps>
        </div>
      </div>
    </div>
  )
}
