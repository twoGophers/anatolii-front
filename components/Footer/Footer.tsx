import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from "@/store/hooks";


export default function Footer() {
  const lang = useAppSelector((state) => state.ui.ui);

  return (
    <div className='w-full mb-8'>
        <p className='flex flex-row items-center justify-center text-xs mb-1'> <Link href={'/panel'}>{ lang === "RU" ? 'Все права' : 'Toate drepturile' }</Link><FontAwesomeIcon icon={faCopyright} className="w-3 mx-1" /> { lang === 'RU' ? 'защищены' : 'protejat' } 2024.</p>
        <p className='flex flex-row items-center justify-center text-xs'>{ lang === "RU" ? 'Сайт создал' : 'Site-ul a fost înființat' } Falin Vladimir</p>
    </div>
  )
}
