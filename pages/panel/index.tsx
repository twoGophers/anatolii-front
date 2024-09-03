import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginAdmin, verifyAdmin } from '@/store/slices/admin';
import { catalogMain, getCatalogItems, sendSubCategory, getSubItems, sendCardData, deleteItem, updateCatalog, getCardAll, deleteCard, putUpdateCard } from '@/store/slices/catalog';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Panel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | undefined>();
  const { loading, error, isAuthenticated, verify } = useAppSelector((state: any) => state.admin);
  const { catalogAll, subCatalogAll, cardArr } = useAppSelector((state: any) => state.catalog);

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

  url: '',
  image: [],          // Initialize as an array, not null
  subCatalog: '',
  subCatalogMD: '',
  urlSubCatalog: '',

  name: '',
  nameMD: '',
  
  description: '',
  descriptionRO: '',
  price: '',

  _id: '',
  imageUpdate: []
  });

  const [selectedImages, setSelectedImages] = useState<(string | ArrayBuffer)[]>([]);
  const [ subCatalogArr, setSubCatalogArr] = useState([]);

  // редактирование
  const [ redactCatalog , setRedactCatalog ] = useState<any>([]);
  const [ redactSubCatalog , setRedactSubCatalog ] = useState<any>([]);
  const [ redactCard , setRedactCard ] = useState<any>([]);
  const [openBlock, setOpenBlock] = useState<string | null>(null);

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
  
  
  const sendCatalog = async (e: React.MouseEvent<HTMLButtonElement>, isUpdate = false, id?: string) => {
    e.preventDefault();
  
    // Prepare form data
    const formData = new FormData();
    formData.append('catalog', catalogData.catalog);
    formData.append('catalogMD', catalogData.catalogMD);
    formData.append('title', catalogData.title);
    formData.append('titleMD', catalogData.titleMD);
    formData.append('url', catalogData.url);
    if (catalogData.image) {
      formData.append('image', catalogData.image);
    }
  
    console.log(catalogData);
    let valid = null;
    if(catalogData.title.length > 0 && catalogData.titleMD.length > 0 && catalogData.catalog.length > 0 && catalogData.catalogMD.length > 0 && catalogData.url.length > 0) {
      valid = true;
    } else {
      valid = false;
    }

    try {
      let data;
      if (isUpdate) {
        if (!id) {
          throw new Error('ID is required for updating catalog');
        }
        data = await dispatch(updateCatalog({ id, formData })).unwrap();
      } else if ( valid ) {
        data = await dispatch(catalogMain(formData)).unwrap();
      }
  
      console.log('Catalog data:', data);
    } catch (error) {
      console.error(`Failed to ${isUpdate ? 'update' : 'create'} catalog:`, error);
    }
  };

  const uploadData = async (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    if( item === 'catalog') {
      await dispatch(getCatalogItems());
    } else if (item === 'sub-catalog') {
      await dispatch(getSubItems());
    } else if ( item === 'cards') {
      await dispatch(getCardAll())
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
    const data = await dispatch(sendSubCategory(formData)).unwrap();
    if(data) {
      resetData('subCatalog')
    }
  } catch (error) {
    console.error('Error saving subcategory:', error);
  }
};

const resetData = (type: 'catalog' | 'subCatalog' | 'card-item') => {
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
    })
  } else if( type === 'card-item') {
      setCard({
        catalog: '',
        catalogMD: '',
        urlCatalog: '',
      
        url: '',
        image: [],          // Initialize as an array, not null
        subCatalog: '',
        subCatalogMD: '',
        urlSubCatalog: '',
      
        name: '',
        nameMD: '',
        
        
        description: '',
        descriptionRO: '',
        price: ''
      })
    }

  // Reset the file input
  const fileInput = document.querySelector(`.${type}`) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};

const handleDeleteImage = (index: number) => {
  setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
};

const sendCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  const formData = new FormData();
  
  formData.append('catalog', card.catalog);
  formData.append('catalogMD', card.catalogMD);
  formData.append('urlCatalog', card.urlCatalog);
  formData.append('url', card.url);
  formData.append('subCatalog', card.subCatalog);
  formData.append('subCatalogMD', card.subCatalogMD);
  formData.append('urlSubCatalog', card.urlSubCatalog);
  formData.append('name', card.name);
  formData.append('nameMD', card.nameMD);
  formData.append('description', card.description);
  formData.append('descriptionRO', card.descriptionRO);
  formData.append('price', card.price);
  
  card.image.forEach((file, index) => {
    formData.append(`images`, file); // Append each file
  });
  try {
    const data = dispatch(sendCardData(formData));
    resetData('card-item');
  } catch (error) {
    console.log(error);
  }
};

const handleFileChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    const fileArray = Array.from(files);
    setCard((prevCard: any )=> ({
      ...prevCard,
      image: [...prevCard.image, ...fileArray]
    }));
  }
};


const getCatalog = (e: any, item: any, catalog: any) => {
  e.preventDefault();

  if (catalog === 'subCatalog') {
    setSubCatalogData({ ...subCatalogData, catalog: item.url });
  } else if (catalog === 'catalogCard') {
    setSubCatalogArr(item.items);
    console.log(item);
    
    setCard(prevCard => ({
      ...prevCard,
      urlCatalog: item.url,
      catalog: item.catalog,
      catalogMD: item.catalogMD,
    }));
  } else if (catalog === 'subCatalogCard') {
    setCard(prevCard => ({
      ...prevCard,
      urlSubCatalog: item.url,
      subCatalog: item.name,
      subCatalogMD: item.nameMD,
    }));
  }
};

const deleteCatalog = (item: any, name: string) => {
  let id = null;

  if(name === 'catalog') {
    id = item._id;
  } else if( name === 'sub') {
    id = name === 'sub' ? item.url : item._id;
  } 

  if (id) {
    console.log(id);
    dispatch(deleteItem({ id, name }));
  } else {
    console.error('Invalid item or name parameter');
  }
};

const toggleBlock = (block: string) => {
  setOpenBlock((prev) => (prev === block ? null : block));
};

const handleDeleteCard = (item: any) => {
  dispatch(deleteCard({ id: item._id }));
};

const updateCard = () => {
  const formData = new FormData();
  Object.keys(card).forEach((key) => {
    if (key === 'imageUpdate') {
      card.imageUpdate.forEach((file) => {
        formData.append('images', file, file.name);
      });
    } else if (key === 'image') {
      card.image.forEach((file) => {
        // Optionally, include existing images' URLs if needed
      });
    } else {
      formData.append(key, card[key]);
    }
  });

  dispatch(putUpdateCard({ id: card._id, formData })).then((response) => {
    if (response.meta.requestStatus === 'fulfilled') {
      setRedactCard(null);
      setCard(prevCard => ({ ...prevCard, imageUpdate: [] })); // Clear new images
      resetCard();
    }
  });
};

const handleFileUpdateCard = (e) => {
  const files = Array.from(e.target.files);
  setCard(prevCard => ({
    ...prevCard,
    imageUpdate: [...files]
  }));
};

const resetCard = () => {
  setCard(prevCard => ({
    ...prevCard,
    imageUpdate: []
  }));
};

const handleDeleteImageCard = (index) => {
  const updatedImages = card.image.filter((_, i) => i !== index);
  setCard(prevCard => ({
    ...prevCard,
    image: updatedImages
  }));
};

useEffect(() => {
  if (redactCard) {
    setCard(prevCard => ({
      ...prevCard,                    // Preserve the existing properties
      catalog: redactCard.catalog || '',
      catalogMD: redactCard.catalogMD || '',
      urlCatalog: redactCard.urlCatalog || '',
      url: redactCard.url || '',
      image: redactCard.images || [], // Ensure this matches the state
      subCatalog: redactCard.subCatalog || '',
      subCatalogMD: redactCard.subCatalogMD || '',
      urlSubCatalog: redactCard.urlSubCatalog || '',
      name: redactCard.name || '',
      nameMD: redactCard.nameMD || '',
      description: redactCard.description || '',
      descriptionRO: redactCard.descriptionRO || '',
      price: redactCard.price || '',
      _id: redactCard._id || ''
    }));
  }
}, [redactCard]);

console.log(redactCard);
console.log(card);


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
          <div className=' mt-6 flex flex-col flex-wrap'>
            <div className='border mt-2'>
              <h2 className='font-semibold text-xl p-3 cursor-pointer' onClick={() => toggleBlock('catalog')}>Новая категория</h2>
              {
                openBlock === 'catalog' &&
                <form className='border p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                  <InputOne 
                    title='Название каталога - русс'
                    name={null}
                    value={catalogData.catalog}
                    placeholder='Мебель из ротанга'
                    onChange={(e: any) => setCatalogData({ ...catalogData, catalog: e.target.value })}
                  />
                  <InputOne 
                    title='Название каталога - молд'
                    name={null}
                    value={catalogData.catalogMD}
                    placeholder='Mobilier din ratan'
                    onChange={(e: any) => setCatalogData({ ...catalogData, catalogMD: e.target.value })}
                  />
                  <InputOne 
                    title='Заголовок каталога - русс'
                    name={null}
                    value={catalogData.title}
                    placeholder='МЕБЕЛЬ ИЗ РОТАНГА ДЛЯ ТЕРРАСЫ'
                    onChange={(e: any) => setCatalogData({ ...catalogData, title: e.target.value })}
                  />
                  <InputOne 
                    title='Заголовок каталога - молд'
                    name={null}
                    value={catalogData.titleMD}
                    placeholder='MOBILA DIN ROTANG PENTRU TERASĂ'
                    onChange={(e: any) => setCatalogData({ ...catalogData, titleMD: e.target.value })}
                  />
                <div className="w-full mb-4">
                  <p>Выбери только одну картинку</p>
                  <input
                    type="file"
                    className='catalog'
                    onChange={(e) => handleFileChange(e, setCatalogData)}
                  />
                </div>
                  <InputOne 
                    title=''
                    name={null}
                    value={catalogData.url}
                    placeholder='Пример: ratan'
                    onChange={(e: any) => setCatalogData({ ...catalogData, url: e.target.value })}
                  />
                <div className=''>
                  <button
                    type="button"
                    onClick={(e) => sendCatalog(e, false)}
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
              }
              
            </div>
            <div className='border mt-2'>
              <h2 className='font-semibold text-xl p-3 cursor-pointer' onClick={() => toggleBlock('sub')}>Под категория</h2>
              {
                openBlock === 'sub' &&
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
                  <InputOne 
                    title='Подкатегория каталога - русс'
                    name={null}
                    value={subCatalogData.subCatalog}
                    placeholder='Мебель для террасы'
                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, subCatalog: e.target.value })}
                  />
                  <InputOne 
                    title='Подкатегория каталога - молд'
                    name={null}
                    value={subCatalogData.subCatalogMD}
                    placeholder='Mobilier pentru terasă'
                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, subCatalogMD: e.target.value })}
                  />
                <div className="w-full mb-4">
                  <p>Выбери только одну картинку</p>
                  <input type="file"
                    className='subCatalog'
                    onChange={(e) => handleFileChange(e, setSubCatalogData)}
                  />
                </div>
                <InputOne 
                    title=''
                    name={null}
                    value={subCatalogData.url}
                    placeholder='Пример: ratan-terasa'
                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, url: e.target.value })}
                  />
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
              }
              
            </div>
            <div className='border mt-2'>
              <h2 className='font-semibold text-xl p-3  cursor-pointer' onClick={() => toggleBlock('card')}>Карточка товара</h2>
              <p className='pl-3'>Все поля обязательны</p>
              {
                openBlock === 'card' &&
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
                                  {item?.name}
                                </button>
                              ))
                            }
                            </div>
                          </>
                        )
                        
                      }
                    <InputOne 
                      title='Название товара - русс'
                      name={null}
                      value={card.name}
                      placeholder='Стол Барбара'
                      onChange={(e: any) => setCard({ ...card, name: e.target.value })}
                    />
                    <InputOne 
                      title='Название товара - молд'
                      name={null}
                      value={card.nameMD}
                      placeholder='Biroul Barbarei'
                      onChange={(e: any) => setCard({ ...card, nameMD: e.target.value })}
                    />
                  <div className='w-full'>
                    <p>Описание карточки товара - русс</p>
                    <textarea 
                      value={card.description} 
                      onChange={(e) => setCard({ ...card, description: e.target.value })}
                      className='w-full border mb-3 p-1'
                      ></textarea>
                  </div>
                  <div className='w-full'>
                    <p>Описание карточки товара - молд</p>
                    <textarea 
                      value={card.descriptionRO} 
                      onChange={(e) => setCard({ ...card, descriptionRO: e.target.value })}
                      className='w-full border mb-3 p-1'
                      ></textarea>
                  </div>
                  <InputOne 
                    title='Уникальное имя'
                    name={null}
                    value={card.url}
                    placeholder='Пример: ratan-terasa'
                    onChange={(e: any) => setCard({ ...card, url: e.target.value })}
                  />
                  
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
                      className='card-item'
                      type="file"
                      accept="image/*"
                      onChange={handleFileChangeCard}
                      multiple
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
                      Сохранить карточку
                    </button>
                    <button
                      type="button"
                      onClick={() => resetData('card-item')}
                      className='border p-2 ml-5 bg-red-200 hover:bg-green-500'
                    >
                      Сбросить
                    </button>
                    <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                  </div>
                </form>
              }
            </div>
            <div className='border mt-2'>
              <h2 className='font-semibold text-xl p-3  cursor-pointer' onClick={() => toggleBlock('change')}>Изменение данных</h2>
              {
                openBlock === 'change' &&
                <>
                  <div className='p-6'>
                    <button onClick={(e) => { 
                      uploadData(e, 'catalog'); 
                      uploadData(e, 'cards'); 
                      uploadData(e, 'sub-catalog'); 
                      }} className='bg-gray-300 text-base p-2'>Обновить</button>
                    <h2 className='font-semibold text-xl mb-2'>Каталог</h2>
                    {
                      catalogAll && catalogAll.map((item: any, index: number) => (
                        <div key={index} >
                          <div className='flex flex-row justify-between items-center mb-3 border pl-2'>
                            <div>{item?.title}</div>
                              <div>
                                <button
                                  onClick={() => deleteCatalog(item, 'catalog')}
                                  className='border p-2 bg-red-200 hover:bg-green-500'
                                >
                                  Удалить
                                </button>
                                <button
                                  onClick={() => setRedactCatalog(item )}
                                  className='border p-2 ml-2 bg-gray-200 hover:bg-green-500'
                                >
                                  Редактировать
                                </button>
                              </div>
                          </div>
                          {
                            ( redactCatalog?.url === item.url) &&
                            (
                              <div className='relative'>
                                  <span className='absolute right-0 top-0 p-1 bg-red-400 w-8 h-8 cursor-pointer flex justify-center items-center rounded-md' onClick={() => setRedactCatalog(null)}>X</span>
                                <form className='mb-4 border border-red-500 p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                                  <InputOne 
                                    title='Название каталога - русс'
                                    name={item.catalog}
                                    value={catalogData.catalog}
                                    placeholder='Мебель из ротанга'
                                    onChange={(e: any) => setCatalogData({ ...catalogData, catalog: e.target.value })}
                                  />
                                  <InputOne 
                                    title='Название каталога - молд'
                                    name={item.catalogMD}
                                    value={catalogData.catalogMD}
                                    placeholder='Mobilier din ratan'
                                    onChange={(e: any) => setCatalogData({ ...catalogData, catalogMD: e.target.value })}
                                  />
                                  <InputOne 
                                    title='Заголовок каталога - русс'
                                    name={item.title}
                                    value={catalogData.title}
                                    placeholder='МЕБЕЛЬ ИЗ РОТАНГА ДЛЯ ТЕРРАСЫ'
                                    onChange={(e: any) => setCatalogData({ ...catalogData, title: e.target.value })}
                                  />
                                  <InputOne 
                                    title='Заголовок каталога - молд'
                                    name={item.titleMD}
                                    value={catalogData.titleMD}
                                    placeholder='MOBILA DIN ROTANG PENTRU TERASĂ'
                                    onChange={(e: any) => setCatalogData({ ...catalogData, titleMD: e.target.value })}
                                  />
                                <div className="w-full mb-4">
                                  <p>Выбери только одну картинку</p>
                                  <input
                                    type="file"
                                    className='catalog'
                                    onChange={(e) => handleFileChange(e, setCatalogData)}
                                  />
                                </div>
                                  <InputOne 
                                    title='Уникальное имя '
                                    name={item.url}
                                    value={catalogData.url}
                                    placeholder='Пример: ratan'
                                    onChange={(e: any) => setCatalogData({ ...catalogData, url: e.target.value })}
                                  />
                                <div className=''>
                                  <button
                                    type="button"
                                    onClick={(e) => sendCatalog(e, true, item._id)}
                                    className='border p-2 bg-gray-200 hover:bg-green-500'
                                  >
                                    Обновить категорию
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
                            )
                          }
                        </div>
                      ))
                    }
                    
                  </div>
                  <div className='p-6'>
                    <h2 className='font-semibold text-xl mb-2'>Под каталог</h2>
                    {
                      subCatalogAll && subCatalogAll.map((item: any, index: number) => (
                        <div key={index}>
                          <div  className='flex flex-row justify-between items-center mb-3 border pl-2'>
                            <div>{item?.name}</div>
                            <div>
                              <button
                                onClick={() => deleteCatalog(item, 'sub')}
                                className='border p-2 bg-red-200 hover:bg-green-500'
                              >
                                Удалить
                              </button>
                              <button
                                onClick={() => setRedactSubCatalog(item)}
                                className='border p-2 ml-2 bg-gray-200 hover:bg-green-500'
                              >
                                Редактировать
                              </button>
                            </div>
                          </div>
                          {
                              (redactSubCatalog && redactSubCatalog.url === item?.url) &&
                              <div className='relative'>
                                <span className='absolute right-0 top-0 p-1 bg-red-400 w-8 h-8 cursor-pointer flex justify-center items-center rounded-md' onClick={() => setRedactSubCatalog(null)}>X</span>
                                <form className='border p-4 flex flex-col flex-wrap justify-around items-start'>
                                  <InputOne 
                                    title='Подкатегория каталога - русс'
                                    name={item.name}
                                    value={subCatalogData.subCatalog}
                                    placeholder='Мебель для террасы'
                                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, subCatalog: e.target.value })}
                                  />
                                  <InputOne 
                                    title='Подкатегория каталога - молд'
                                    name={item.nameMD}
                                    value={subCatalogData.subCatalogMD}
                                    placeholder='Mobilier pentru terasă'
                                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, subCatalogMD: e.target.value })}
                                  />
                                  <div className="w-full mb-4">
                                  <p>Выбери только одну картинку</p>
                                  <p className='mb-2'>{item.image}</p>
                                  <input type="file"
                                    className='subCatalog'
                                    onChange={(e) => handleFileChange(e, setSubCatalogData)}
                                  />
                                  </div>
                                  <InputOne 
                                    title='Подкатегория каталога - молд'
                                    name={item.url}
                                    value={subCatalogData.url}
                                    placeholder='Пример: ratan-terasa'
                                    onChange={(e: any) => setSubCatalogData({ ...subCatalogData, url: e.target.value })}
                                  />
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
                          }
                        </div>
                      ))
                    }
                  </div>
                  <div className='p-6'>
                    <h2 className='font-semibold text-xl mb-2'>Карточки товара</h2>
                    {
                      cardArr && cardArr.map((item: any, index: number) => (
                        <div key={index}>
                          <div  className='flex flex-row justify-between items-center mb-3 border pl-2'>
                            <div>{item?.name}</div>
                            <div>
                              <button
                                onClick={() => handleDeleteCard(item)}
                                className='border p-2 bg-red-200 hover:bg-green-500'
                              >
                                Удалить
                              </button>
                              <button
                                onClick={() => setRedactCard(item)}
                                className='border p-2 ml-2 bg-gray-200 hover:bg-green-500'
                              >
                                Редактировать
                              </button>
                            </div>
                          </div>
                          {
                              (redactCard && redactCard.url === item?.url) &&
                              <div className='relative'>
                                <span className='absolute right-0 top-0 p-1 bg-red-400 w-8 h-8 cursor-pointer flex justify-center items-center rounded-md' onClick={() => setRedactCard(null)}>X</span>
                                <form className='border p-4 mt-2 flex flex-col flex-wrap justify-around items-start'>
                                  <div className='flex flex-row gap-2 mb-2'>
                                    {
                                      card?.image?.map((item: any, index: any) => (
                                        <div key={item} className='relative'>
                                          <p>{item.image}</p>
                                          <img
                                            src={`http://localhost:3001/${item}`}
                                            alt={`Selected ${index}`}
                                            className="w-full h-20 object-cover"
                                          />
                                          <span className='absolute top-0 right-0 bg-white w-5 h-5 flex justify-center items-center cursor-pointer rounded-md'>
                                            <FontAwesomeIcon
                                              icon={faClose}
                                              className={`w-3 rotate-icon`}
                                              onClick={() => handleDeleteImageCard(index)}
                                            />
                                          </span>
                                        </div>
                                      ))
                                    }
                                  </div>
                                    
                                    <InputOne 
                                      title='Название товара - русс'
                                      name={redactCard.name}
                                      value={card.name}
                                      placeholder='Стол Барбара'
                                      onChange={(e: any) => setCard({ ...card, name: e.target.value })}
                                    />
                                    <InputOne 
                                      title='Название товара - молд'
                                      name={redactCard.nameMD}
                                      value={card.nameMD}
                                      placeholder='Biroul Barbarei'
                                      onChange={(e: any) => setCard({ ...card, nameMD: e.target.value })}
                                    />
                                  <div className='w-full'>
                                    <p>Описание карточки товара - русс</p>
                                    <p className='text-lime-500'>{redactCard.description}</p>
                                    <textarea 
                                      value={card.description} 
                                      onChange={(e) => setCard({ ...card, description: e.target.value })}
                                      className='w-full border mb-3 p-1'
                                      ></textarea>
                                  </div>
                                  <div className='w-full'>
                                    <p>Описание карточки товара - молд</p>
                                    <p className='text-lime-500'>{redactCard.descriptionRO}</p>
                                    <textarea 
                                      value={card.descriptionRO} 
                                      onChange={(e) => setCard({ ...card, descriptionRO: e.target.value })}
                                      className='w-full border mb-3 p-1'
                                      ></textarea>
                                  </div>
                                  <InputOne 
                                    title='Уникальное имя'
                                    name={redactCard.url}
                                    value={card.url}
                                    placeholder='Пример: ratan-terasa'
                                    onChange={(e: any) => setCard({ ...card, url: e.target.value })}
                                  />
                                  
                                  <div>
                                    <div className='w-full mb-4'>
                                    <p className='text-lime-500'>{redactCard.price}</p>
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
                                    {
                                      card.image.map((item: string) => (
                                        <p key={item}>{item}</p>
                                      ))
                                    }
                                    <input
                                      className='card-item'
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleFileUpdateCard(e)}
                                      multiple
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
                                      onClick={updateCard}
                                    >
                                      Сохранить карточку
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => resetData('card-item')}
                                      className='border p-2 ml-5 bg-red-200 hover:bg-green-500'
                                    >
                                      Сбросить
                                    </button>
                                    <p className='text-sm text-gray-400'>Все поля должны быть заполнены</p>
                                  </div>
                                </form>
                              </div>
                          }
                        </div>
                      ))
                    }
                  </div>
                </>
              }

              
            </div>
          </div>
        )
      }
    </div>
  );
}


const InputOne = ({ title, name, value, placeholder, onChange }: any) => {
  return (
    <div className='w-full mb-4'>
      <p>{title}</p>
      {
        name && <p className='mb-2 text-lime-500'>{name}</p>
      }
      
      <input
        placeholder={placeholder}
        type="text"
        className='border p-1 w-full'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};