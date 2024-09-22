import CategoriaList from '@/components/Categoria/CategoriaList';
import CategoriaNav from '@/components/Categoria/CategoriaNav';
import React, { useEffect } from 'react';
import MarginTop from '@/components/Untils/Margin';
import { useAppDispatch } from '@/store/hooks';
import { getCardAll } from '@/store/slices/catalog';

export default function Catalog() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCardAll());
  }, []);

  return (
    <div className='container'>
      <div className='max-md:hidden'>
        <MarginTop />
      </div>
      <div className="flex flex-row gap-8">
        <div className="w-1/4 max-lg:hidden">
          <CategoriaNav />
        </div>
        <div className="w-3/4 max-lg:w-full">
          <CategoriaList />
        </div>
      </div>
    </div>
  )
}
