import CategoriaList from '@/components/Categoria/CategoriaList';
import CategoriaNav from '@/components/Categoria/CategoriaNav';
import React from 'react';

export default function Catalog() {
  return (
    <div className="flex flex-row gap-8 mt-5">
      <div className="w-1/4">
        <CategoriaNav />
      </div>
      <div className="w-3/4">
        <CategoriaList />
      </div>
    </div>
  )
}
