import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showMobileMenu } from '@/store/slices/ui';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import Lang from '../Lang/Lang';
import { Catalog } from "@/typescript";


export default function MenuMobile() {
  const show = useAppSelector((state) => state.ui.modalMobileMenu.show);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const catalogAll = useAppSelector((state) => state.catalog.catalogAll as Catalog[]);

  const router = useRouter();

  const [ isShowLink, setIsShowLink ] = useState(false);

  const isActive = (path: string) => router.pathname === path ? 'active-link-mobile' : '';

  const handleClose = () => {
    dispatch(showMobileMenu(false));
  };

  const handleShowLink = () => {
    setIsShowLink(prevState => !prevState);
  };

  useEffect(() => {
    if(router.pathname !== '/catalog/[url]') {
      setIsShowLink(false);
    } 
  }, [router])

  console.log(router.query.url);
  

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" className="menu-mobile-side-drawer">
      <Offcanvas.Header closeButton className='mx-3 p-0'>
        <Offcanvas.Title>Menu </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='p-0 overflow-x-hidden'>
        <div className="menu-mobile-content ">
          <div className='mx-3 my-2 font-semibold'>
            <Lang />
          </div>
          
          <ul className='mt-2'>
            <li className={`${isActive('/')} border flex `}>
              <Link className='w-full mx-3 my-2' href={"/"}>
                {lang === "RU" ? "Главная" : "Principală"}
              </Link>
            </li>
            <li className={`w-full relative  ${isActive('/catalog/[url]')} border`} onClick={handleShowLink}>
              <Link className='w-full mx-3 my-2  flex items-center justify-between' href={`/catalog/catalog`}>
                {lang === "RU" ? "Каталог" : "Catalog"}
                <span className='absolute top-0 right-0 w-10 h-full flex justify-center items-center'>
                  <FontAwesomeIcon icon={faChevronDown} className={`w-3 ml-1 ${isShowLink && '-rotate-90'}`} />
                </span>
              </Link>
            </li>
            <div className={`catalog-links ml-8 ${isShowLink ? 'open active-link-catalog' : 'active-link-catalog'}`}>
              <ul>
                {catalogAll.map((item) => (
                  <li key={item.url} className='w-full link-item'>
                    <Link className={`${router.query.url === item.url && 'font-medium'}`} href={`/catalog/${item.url}`}>
                      <p className='my-2' > {lang === "RU" ? item.catalog : item.catalogMD}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <li className={` ${isActive('/galereiia')} border flex`}>
              <Link className='w-full  mx-3 my-2 ' href={" /galereiia"}>
                {lang === "RU" ? "Галерея" : "Galerie"}
              </Link>
            </li>
            <li className={`${isActive('/compania')} border flex`}>
              <Link className='w-full mx-3 my-2 ' href={"/compania"}>
                {lang === "RU" ? "О компании" : "Despre noi"}
              </Link>
            </li>
            <li className={` ${isActive('/contacti')} border flex`}>
              <Link className='w-full mx-3 my-2' href={"/contacti"}>
                {lang === "RU" ? "Контакты" : "Contacte"}
              </Link>
            </li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
