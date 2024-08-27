import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className='w-full mb-8'>
        <p className='flex flex-row items-center justify-center text-xs mb-1'> <Link href={'/panel'}>Все прав</Link> а<FontAwesomeIcon icon={faCopyright} className="w-3 mx-1" /> защищены 2024.</p>
        <p className='flex flex-row items-center justify-center text-xs'>Сайт создал Falin Vladimir</p>
    </div>
  )
}
