import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useLang } from '@/hooks/useLang ';
import Navigation from '../Catalog/Navigation';


export default function CategoriaNav() {
  const { isLangLoaded } = useLang();
  const lang = useAppSelector((state) => state.ui.ui);
  const { modalFull, modalFullImage, bgColor } = useAppSelector((state) => state.ui);

  if (!isLangLoaded) {
    return null;
  };

  return (
    <div>
      <h5 className={`${bgColor ? 'text-[#333]' : 'text-[#D1D1D1]'} font-semibold text-lg uppercase `}>
        {lang === "RU" ? 'Категории товаров' : 'Categorii de produse'}
      </h5>
      <Navigation />
    </div>
  );
}
