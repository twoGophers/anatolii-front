import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import HeadComponent from '@/components/Head/Head';


export default function compania() {

  const center = [47.024512, 28.832159];
  const zoom = 9;

  return (
    <div className='container'>
      {/* CEO */}
        <HeadComponent
          title={'Контакты'}
          description={'Мебель на заказ'}
          url={'http://localhost:3000/contacti'}
        />
        {/* CEO */}

      <h4 className='h4-size text-center'>Контакты</h4>
      <div className='flex flex-row w-full justify-content-between gap-10 mt-4'>
        <div className='w-2/5 flex flex-col'>
          <div className='flex-grow'>
            <h5 className='font-semibold text-lg active-link'>Адресс</h5>
            <p className='mt-2'>г.Кишинев ул.Надежда Руссо, нр.17</p>
          </div>
          <div className='flex-grow'>
            <h5 className='font-semibold text-lg active-link'>Телефон</h5>
            <p className='mt-2'>+7 (912) 345-67-89</p>
          </div>
          <div className='flex-grow'>
            <h5 className='font-semibold text-lg active-link'>Электронная почта</h5>
            <p className='mt-2'>info@example.com</p>
          </div>
        </div>
        <div className='w-3/5'>
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
