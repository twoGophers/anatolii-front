import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginAdmin, verifyAdmin } from '@/store/slices/admin';
import { catalogMain, catalogItems, catalogSubCategory, catalogSubItems, sendCardData } from '@/store/slices/catalog';

import { Card } from '../../typescript';

export default function Panel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | undefined>();
  const { loading, error, isAuthenticated, verify } = useAppSelector((state: any) => state.admin);
  const { catalogAll, subCatalogAll } = useAppSelector((state: any) => state.catalog);

  // catalog send
  const [catalogData, setCatalogData] = useState({
    catalog: '',
    catalogMD: '',
    title: '',
    titleMD: '',
    image: null,
    url: '',
    imageName: ''
  });

  // catalog send
  const [subCatalogData, setSubCatalogData] = useState({
    catalog: '',
    subCatalog: '',
    subCatalogMD: '',
    url: '',
    image: null,
    imageName: ''
  });

  // catalog send
  const [card, setCard] = useState({
  catalog: '',
  catalogMD: '',
  urlCatalog: '',

  title: '',           // Ensure title is present
  titleMD: '',         // Ensure titleMD is present
  url: '',
  image: [],          // Initialize as an array, not null
  items: [],          // Initialize as an array
  subCatalog: '',
  subCatalogMD: '',
  urlSubCatalog: '',

  name: '',
  nameMD: '',
  
  
  imageName: [],      // Initialize as an array, not null
  description: '',
  descriptionRO: '',
  price: ''
  });

  const [ catalogActive, setCatalogActive ] = useState<Card | null>(null);
  const [selectedImages, setSelectedImages] = useState<(string | ArrayBuffer)[]>([]);
  const [ subCatalogArr, setSubCatalogArr] = useState([]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setData: Function) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      setData((prevData: any) => ({
        ...prevData,
        image: file,  // Store the File object directly
        imageName: file.name,
      }));
    }
  };

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          await dispatch(verifyAdmin(token)).unwrap(); // Use token directly
        } catch (error) {
          console.error('Failed to verify admin:', error);
        }
      }
    };
  
    verify();
  }, [token, dispatch]);
  
  

  const sendCatalog = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
    formData.append('image', catalogData.image); // No need to convert to blob
  
    try {
      const data = await dispatch(catalogMain(formData)).unwrap();

      if(data) {
        resetData('catalog')
      }

    } catch (error) {
      console.error('Failed to save catalog:', error);
    }
  };

  const uploadData = async (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    if( item === 'catalog') {
      const data = await dispatch(catalogItems());
    } else if (item === 'sub-catalog') {
      await dispatch(catalogSubItems());
    }
    
  };

// отправка суб категории
const sendSubCatalog = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if(subCatalogData.catalog === '' && subCatalogData.subCatalog === '' && subCatalogData.subCatalogMD === '' && subCatalogData.url === '' ) {
    return null
  }

  const formData = new FormData();
  formData.append('catalog', subCatalogData.catalog);
  formData.append('name', subCatalogData.subCatalog);
  formData.append('nameMD', subCatalogData.subCatalogMD);
  formData.append('url', subCatalogData.url);

  if (subCatalogData.image) {
    formData.append('image', subCatalogData.image, subCatalogData.imageName);
  }

  try {
    const data = await dispatch(catalogSubCategory(formData)).unwrap();
    if(data) {
      resetData('subCatalog')
    }
  } catch (error) {
    console.error('Error saving subcategory:', error);
  }
};

const resetData = (type: 'catalog' | 'subCatalog') => {
  if (type === 'catalog') {
    setCatalogData({
      catalog: '',
      catalogMD: '',
      title: '',
      titleMD: '',
      image: null,
      url: '',
      imageName: ''
    });
  } else if (type === 'subCatalog') {
    setSubCatalogData({
      catalog: '',
      subCatalog: '',
      subCatalogMD: '',
      url: '',
      image: null,
      imageName: ''
    });
  }

  // Reset the file input
  const fileInput = document.querySelector(`.${type}`) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};


const handleSelectChange = (e: any) => {
  const selectedValue = e.target.value;
  const selectedObject = catalogAll.find((item: any) => JSON.stringify(item.items) === selectedValue);
  setCatalogActive(selectedObject);

  if (selectedObject) {
    setCard({
      ...card,
      catalog: selectedObject.catalog,
      catalogMD: selectedObject.catalogMD,
      urlCatalog: selectedObject.url,
    });
  }
};

const handleSubCatalogChange = (e: any) => {
  const selectedSubCatalog = e.target.value;
  if (catalogActive) {
    const sub = catalogActive.items.find((item: any) => item.name === 'name');
    console.log(selectedSubCatalog);
    
    console.log("Found SubCatalog:", sub);
  }
  

  setCard({
    ...card,
    subCatalog: selectedSubCatalog,
    urlSubCatalog: selectedSubCatalog, // assuming URL of the subcatalog is the same as the value
  });
};

const handleFileChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    const newImages: (string | ArrayBuffer)[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result);
          if (newImages.length === files.length) {
            setSelectedImages(prevImages => [...prevImages, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

const handleDeleteImage = (index: number) => {
  setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
};

const sendCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  dispatch(sendCardData(card));
  
}

const getCatalog = (e: any, item: any, catalog: any) => {
  e.preventDefault();
  if( catalog === 'subCatalog') {
    setSubCatalogData({ ...subCatalogData, catalog: item.url });
  } else if( catalog === 'catalogCard' ) {
    setSubCatalogArr(item.items)
    setCard({ ...card, urlCatalog: item.url });
  } else if( catalog === 'subCatalogCard') {
    setCard({ ...card, urlSubCatalog: item.url });
  }
  
  console.log();
  
}


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
          <div className=' mt-6 flex flex-row flex-wrap'>
            <div className=' w-1/2 mt-2'>
              <h2 className='font-semibold text-xl'>Новая категория</h2>
              <form className='border p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                  <div className='w-full mb-4'>
                    <p>Название каталога - русс</p>
                    <input
                      placeholder='Мебель из ротанга'
                      type="text"
                      className='border p-1 w-full'
                      value={catalogData.catalog}
                      onChange={(e) => setCatalogData({ ...catalogData, catalog: e.target.value })}
                    />
                  </div>
                  <div className='w-full mb-4'>
                    <p>Название каталога - молд</p>
                    <input
                      placeholder='Mobilier din ratan'
                      type="text"
                      className='border p-1 w-full'
                      value={catalogData.catalogMD}
                      onChange={(e) => setCatalogData({ ...catalogData, catalogMD: e.target.value })}
                    />
                  </div>
                  <div className='w-full mb-4'>
                    <p>Заголовок каталога - русс</p>
                    <input
                      placeholder='МЕБЕЛЬ ИЗ РОТАНГА ДЛЯ ТЕРРАСЫ'
                      type="text"
                      className='border p-1 w-full'
                      value={catalogData.title}
                      onChange={(e) => setCatalogData({ ...catalogData, title: e.target.value })}
                    />
                  </div>
                  <div className='w-full mb-4'>
                    <p>Заголовок каталога - молд</p>
                    <input
                      placeholder='MOBILA DIN ROTANG PENTRU TERASĂ'
                      type="text"
                      className='border p-1 w-full'
                      value={catalogData.titleMD}
                      onChange={(e) => setCatalogData({ ...catalogData, titleMD: e.target.value })}
                    />
                  </div>
                <div className="w-full mb-4">
                  <p>Выбери только одну картинку</p>
                  <input
                    type="file"
                    className='catalog'
                    onChange={(e) => handleFileChange(e, setCatalogData)}
                  />
                </div>
                  <div className='w-full mb-4'>
                    <input
                      placeholder='Пример: ratan'
                      type="text"
                      className='border p-1 w-full'
                      value={catalogData.url}
                      onChange={(e) => setCatalogData({ ...catalogData, url: e.target.value })}
                    />
                  </div>
                <div className=''>
                  <button
                    type="button"
                    onClick={sendCatalog}
                    className='border p-2 bg-gray-200 hover:bg-green-500'
                  >
                    Сохранить категорию
                  </button>
                  <button
                    type="button"
                    onClick={() => resetData('catalog')}
                    className='border p-2 ml-5 bg-red-200 hover:bg-green-500'
                  >
                    Сбросить
                  </button>
                  <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                </div>
              </form>
            </div>
            <div className=' w-1/2 mt-2'>
              <h2 className='font-semibold text-xl'>Под категория</h2>
              <form className='border p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                  <button className='mb-3 bg-gray-200 p-2 hover:bg-green-400' onClick={(e) => uploadData(e, 'catalog')}>Обновить категорию</button>
                  <div className='border  p-1 w-full flex flex-wrap'>
                  {
                  catalogAll && catalogAll.map((item: any, index: number) => (
                    <button 
                      key={index}
                      onClick={(e) => getCatalog(e, item, 'subCatalog')}
                      className={`p-2 border rounded-md m-1 ${item?.url === subCatalogData.catalog && 'bg-green-200'}`}
                      >
                      {item?.title}
                    </button>
                  ))
                  }
                  </div>
                  <div className='w-full mb-4 mt-4'>
                    <p>Подкатегория каталога - русс</p>
                    <input
                      placeholder='Мебель для террасы'
                      type="text"
                      className='border p-1 w-full '
                      value={subCatalogData.subCatalog}
                      onChange={(e) => setSubCatalogData({ ...subCatalogData, subCatalog: e.target.value })}
                    />
                  </div>
                  <div className='w-full mb-4'>
                    <p>Подкатегория каталога - молд</p>
                    <input
                      placeholder='Mobilier pentru terasă'
                      type="text"
                      className='border p-1 w-full'
                      value={subCatalogData.subCatalogMD}
                      onChange={(e) => setSubCatalogData({ ...subCatalogData, subCatalogMD: e.target.value })}
                    />
                  </div>
                <div className="w-full mb-4">
                  <p>Выбери только одну картинку</p>
                  <input type="file"
                    className='subCatalog'
                    onChange={(e) => handleFileChange(e, setSubCatalogData)}
                  />
                </div>
                <div>
                  <div className='w-full mb-4'>
                    <input
                      placeholder='Пример: ratan-terasa'
                      type="text"
                      className='border p-1 w-full'
                      value={subCatalogData.url}
                      onChange={(e) => setSubCatalogData({ ...subCatalogData, url: e.target.value })}
                    />
                  </div>
                </div>
                <div className='w-full mb-4'>
                  <button
                    type="button"
                    className='border p-2 bg-gray-200 hover:bg-green-500'
                    onClick={sendSubCatalog}
                  >
                    Сохранить подкатегорию
                  </button>
                  <button
                    type="button"
                    onClick={() => resetData('subCatalog')}
                    className='border p-2 ml-5 bg-red-200 hover:bg-green-500'
                  >
                    Сбросить
                  </button>
                  <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                </div>
              </form>
            </div>
            <div className=' w-1/2 mt-2'>
              <h2 className='font-semibold text-xl'>Карточка товара</h2>
              <p>Все поля обязательны</p>
              <form className='border p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                  <button className='mb-3 bg-gray-200 p-2 hover:bg-green-400' onClick={(e) => uploadData(e, 'catalog')}>Обновить категорию</button>
                  <p>Название каталога</p>
                  <div className='border  p-1 w-full flex flex-wrap'>
                    
                    {
                      catalogAll && catalogAll.map((item: any, index: number) => (
                        <button 
                          key={index}
                          onClick={(e) => getCatalog(e, item, 'catalogCard')}
                          className={`p-2 border rounded-md m-1 ${item?.url === card.urlCatalog && 'bg-green-200'}`}
                          >
                          {item?.title}
                        </button>
                      ))
                    }
                    </div>

                    {
                       subCatalogArr.length > 0 && (
                        <>
                        <p>Название подкатегории</p>
                        <div className='border  p-1 w-full flex flex-wrap'>
                          {
                            subCatalogArr && subCatalogArr?.map((item: any, index: number) => (
                              <button 
                                key={index}
                                onClick={(e) => getCatalog(e, item, 'subCatalogCard')}
                                className={`p-2 border rounded-md m-1 ${item?.url === card.urlSubCatalog && 'bg-green-200'}`}
                                >
                                {item?.title}dd
                              </button>
                            ))
                          }
                          </div>
                        </>
                       )
                      
                    }

                  {
                    // catalogItems.map((item) => (
                    //   <p>{item}</p>
                    // )) 
                  }

                  <div className='w-full mb-4 mt-4'>
                    <p>Название товара - русс</p>
                    <input
                      placeholder='Стол Барбара'
                      type="text"
                      className='border p-1 w-full '
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                    />
                  </div>
                  <div className='w-full mb-4'>
                    <p>Название товара - молд</p>
                    <input
                      placeholder='Стол Барбара'
                      type="text"
                      className='border p-1 w-full'
                      value={card.nameMD}
                      onChange={(e) => setCard({ ...card, nameMD: e.target.value })}
                    />
                  </div>
                <div className='w-full'>
                  <p>Описание картинки - русс</p>
                  <textarea 
                    value={card.description} 
                    onChange={(e) => setCard({ ...card, description: e.target.value })}
                    className='w-full border mb-3 p-1'
                    ></textarea>
                </div>
                <div className='w-full'>
                  <p>Описание картинки - молд</p>
                  <textarea 
                    value={card.descriptionRO} 
                    onChange={(e) => setCard({ ...card, descriptionRO: e.target.value })}
                    className='w-full border mb-3 p-1'
                    ></textarea>
                </div>
                
                <div>
                  <div className='w-full mb-4'>
                    <input
                      placeholder='Пример: ratan-terasa'
                      type="text"
                      className='border p-1 w-full'
                      value={card.url}
                      onChange={(e) => setCard({ ...card, url: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <div className='w-full mb-4'>
                    <input
                      placeholder='Цена'
                      type="number"
                      className='border p-1 w-full'
                      value={card.price}
                      onChange={(e) => setCard({ ...card, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="w-full mb-4">
                  <p>Выбери картинки</p>
                  <input
                    type="file"
                    accept="image/*" // Optional: restricts to image files
                    onChange={handleFileChangeCard}
                    multiple // Allow multiple files to be selected
                  />
                  <div className="mt-4 flex flex-row flex-wrap gap-1">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative  w-24 h-24">
                        <img
                          src={image as string}
                          alt={`Selected ${index}`}
                          className="w-full"
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center"
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='w-full mb-4'>
                  <button
                    type="button"
                    className='border p-2 bg-gray-200 hover:bg-green-500'
                    onClick={sendCard}
                  >
                    Сохранить подкатегорию
                  </button>
                  <button
                    type="button"
                    onClick={() => resetData('subCatalog')}
                    className='border p-2 ml-5 bg-red-200 hover:bg-green-500'
                  >
                    Сбросить
                  </button>
                  <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}
