import CategoriaList from '@/components/Categoria/CategoriaList';
import CategoriaNav from '@/components/Categoria/CategoriaNav';
import React from 'react';
import MarginTop from '@/components/Untils/Margin';

export default function Catalog() {

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
