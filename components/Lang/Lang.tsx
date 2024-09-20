import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateLang, showMobileMenu } from '@/store/slices/ui';


export default function Lang() {
    const dispatch = useAppDispatch();
    const lang = useAppSelector((state) => state.ui.ui);

    const handleLang = ( lang: string ) => {
        localStorage.setItem('lang', lang);
        dispatch(updateLang(lang));
      };

  return (
    <ul className="flex gap-x-2.5">
        <li className={`cursor-pointer ${lang === "RU" && 'active-link'}`} onClick={() => handleLang("RU")}>
            <span>RU</span>
        </li>
        <li className={`cursor-pointer ${lang === "RO" && 'active-link'}`} onClick={() => handleLang("RO")}>
            <span>RO</span>
        </li>
    </ul>
  )
}
