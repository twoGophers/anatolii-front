import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginAdmin, verifyAdmin } from '@/store/slices/admin';
import { catalogMain } from '@/store/slices/catalog';

export default function Panel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | undefined>();
  const { loading, error, isAuthenticated, verify } = useAppSelector((state: any) => state.admin);

  // catalog send
  const [catalogData, setCatalogData] = useState({
    catalog: '',
    catalogMD: '',
    title: '',
    titleMD: '',
    image: '',
    url: '',
  });

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef2.current) {
      const email = inputRef.current.value;
      const password = inputRef2.current.value;

      try {
        const result = await dispatch(loginAdmin({ email, password })).unwrap();
        setToken(result);
      } catch (err) {
        console.error('Failed to login:', error);
      }
    }
  };

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          await dispatch(verifyAdmin(token)).unwrap();
        } catch (error) {
          console.error('Failed to verify admin:', error);
        }
      }
    };

    verify();
  }, [token, dispatch]);

  const sendCatalog = async  (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!catalogData.catalog || !catalogData.catalogMD || !catalogData.title || !catalogData.titleMD || !catalogData.url || !catalogData.image) {
      alert('Please fill all fields and select an image');
      return;
    }
    const formData = new FormData();
    formData.append('catalog', catalogData.catalog);
    formData.append('catalogMD', catalogData.catalogMD);
    formData.append('title', catalogData.title);
    formData.append('titleMD', catalogData.titleMD);
    formData.append('url', catalogData.url);
  
    // Convert the image data URL to a Blob
    const response = await fetch(catalogData.image);
    const imageBlob = await response.blob();
    formData.append('image', imageBlob, 'image.jpg');

    try {
      await dispatch(catalogMain(formData)).unwrap();
    } catch (error) {
      console.error('Failed to save catalog:', error);
    }
  };

  return (
    <div className='container'>
      <div className='flex justify-center'>
        <form onSubmit={signIn} className='flex flex-col w-96 gap-2'>
          <input type="text" ref={inputRef} className='border p-2' placeholder="Email" />
          <input type="password" ref={inputRef2} className='border p-2' placeholder="Password" />
          <button type="submit" className='bg-red-500 p-2'>
            {loading ? 'Loading...' : 'Войти'}
          </button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
      </div>
      {
        isAuthenticated && verify && (
          <div className=' mt-3 flex flex-row '>
            <div>
              <h2 className='font-semibold text-xl'>Новая категория</h2>
              <form className='border p-2 mt-2 flex flex-col flex-wrap justify-around items-start'>
                <div>
                  <div className='m-3'>
                    <p>Название каталога - русс</p>
                    <input
                      placeholder='Мебель из ротанга'
                      type="text"
                      className='border p-1'
                      value={catalogData.catalog}
                      onChange={(e) => setCatalogData({ ...catalogData, catalog: e.target.value })}
                    />
                  </div>
                  <div className='m-3'>
                    <p>Название каталога - молд</p>
                    <input
                      placeholder='Mobilier din ratan'
                      type="text"
                      className='border p-1'
                      value={catalogData.catalogMD}
                      onChange={(e) => setCatalogData({ ...catalogData, catalogMD: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <div className='m-3'>
                    <p>Заголовок каталога - русс</p>
                    <input
                      placeholder='МЕБЕЛЬ ИЗ РОТАНГА ДЛЯ ТЕРРАСЫ'
                      type="text"
                      className='border p-1'
                      value={catalogData.title}
                      onChange={(e) => setCatalogData({ ...catalogData, title: e.target.value })}
                    />
                  </div>
                  <div className='m-3'>
                    <p>Заголовок каталога - молд</p>
                    <input
                      placeholder='MOBILA DIN ROTANG PENTRU TERASĂ'
                      type="text"
                      className='border p-1'
                      value={catalogData.titleMD}
                      onChange={(e) => setCatalogData({ ...catalogData, titleMD: e.target.value })}
                    />
                  </div>
                </div>
                <div className="m-3">
                  <p>Выбери только одну картинку</p>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCatalogData({ ...catalogData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div>
                  <div className='m-3'>
                    <input
                      placeholder='Пример: ratan'
                      type="text"
                      className='border p-1'
                      value={catalogData.url}
                      onChange={(e) => setCatalogData({ ...catalogData, url: e.target.value })}
                    />
                  </div>
                </div>
                <div className='m-3'>
                  <button
                    type="button"
                    onClick={sendCatalog}
                    className='border p-2 bg-gray-200 hover:bg-green-500'
                  >
                    Сохранить категорию
                  </button>
                  <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                </div>
            </form>
              </div>
              <div>
                <h2 className='font-semibold text-xl'>Под категория</h2>
                <div className='border p-2 mt-2 flex flex-col flex-wrap justify-around items-start'>
                  <div className='m-3 border'>
                    <select className='w-full'>
                      <option value="">1</option>
                      <option value="">1</option>
                      <option value="">1</option>
                      <option value="">1</option>
                    </select>
                  </div>
                  <div>
                    <div className='m-3'>
                      <p>Подкатегория каталога - русс</p>
                      <input
                        placeholder='Мебель для террасы'
                        type="text"
                        className='border p-1'
                      />
                    </div>
                    <div className='m-3'>
                      <p>Подкатегория каталога - молд</p>
                      <input
                        placeholder='Mobilier pentru terasă'
                        type="text"
                        className='border p-1'
                      />
                    </div>
                  </div>
                  <div className="m-3">
                    <p>Выбери только одну картинку</p>
                    <input type="file" />
                  </div>
                  <div>
                    <div className='m-3'>
                      <input
                        placeholder='Пример: ratan-terasa'
                        type="text"
                        className='border p-1'
                      />
                    </div>
                  </div>
                  <div className='m-3'>
                    <button
                      type="button"
                      className='border p-2 bg-gray-200 hover:bg-green-500'
                    >
                      Сохранить подкатегорию
                    </button>
                    <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                  </div>
                </div>
              </div>
            </div>
        )
      }
    </div>
  );
}
