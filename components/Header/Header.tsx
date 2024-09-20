import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/assets/logo.png";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateLang, showMobileMenu } from '@/store/slices/ui';
import { useLang } from '@/hooks/useLang ';
import { Catalog } from "@/typescript";
import Lang from "../Lang/Lang";

export default function Header() {
  const { isLangLoaded } = useLang();
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const lang = useAppSelector((state) => state.ui.ui);
  const catalogAll = useAppSelector((state) => state.catalog.catalogAll as Catalog[]);
  const dispatch = useAppDispatch();


  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
    const time = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 300); 
  };

  const isActive = (path: string) => router.pathname === path ? 'active-link' : '';

  const handleShowMobileMenu = () => {
    dispatch(showMobileMenu(true));
  }

  if (!isLangLoaded) {
    return null;
  }

  return (
    <header className="flex flex-row justify-between items-center">
      <div onClick={handleShowMobileMenu} className="md:hidden burger-container group w-6 h-4 flex flex-col justify-between items-start cursor-pointer">
        <span className="block w-full h-0.5 bg-black origin-left transition-all duration-300 group-hover:w-1/2 group-hover:bg-gray-400"></span>
        <span className="block w-full h-0.5 bg-black transition-all duration-300 group-hover:bg-gray-400"></span>
        <span className="block w-full h-0.5 bg-black origin-left transition-all duration-300 group-hover:w-1/2 group-hover:bg-gray-400"></span>
      </div>

      <div className="flex flex-row items-center gap-9 columns-3">
        <Link href="/">
          <Image
            src={Logo}
            className="pt-1 pb-1 max-w-48 max-md:max-w-32"
            alt="Picture of the author"
            priority
          />
        </Link>
        <Link
          href="tel:+37367346700"
          className="hidden lg:flex flex-row text-[#a6c4b1] text-base items-center"
        >
          <FontAwesomeIcon icon={faPhone} className="w-4" />
          +37367346700
        </Link>
      </div>
      <div className="flex items-end justify-around flex-col flex-wrap ml-4">
        <Link
            href="tel:+37367346700"
            className="flex lg:hidden flex-row text-[#a6c4b1] text-base items-center"
          >
            <FontAwesomeIcon icon={faPhone} className="w-4" />
            <span className="max-md:hidden">+37367346700</span>
        </Link>
        <div className="lg:items-end max-md:hidden max-lg:gap-2 max-lg:mt-3 max-md:mt-0 max-md:gap-0 max-md:hidden justify-end nav flex items-center text-sm font-semibold gap-10">
          <ul className="text-[#333] flex gap-x-5 flex-wrap list-none">
            <li className={`${isActive('/')} max-md:my-2`}>
              <Link href={"/"}>
                <span className="after-line uppercase">
                  {lang === "RU" ? "Главная" : "Principală"}
                </span>
              </Link>
            </li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`relative  max-md:my-2 ${isActive('/catalog')}`}
            >
              <Link href={`/catalog/catalog`} className="flex flex-row items-center relative">
                <span className="after-line after-line__arrow uppercase">
                  {lang === "RU" ? "Каталог" : "Catalog"}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 ml-1" />
              </Link>
              {isDropdownVisible && (
                <div
                  className={`${
                    isAnimating ? "nav-show-block" : "nav-hide-block"
                  } absolute z-10 w-48 top-4 -left-28 flex flex-col text-[#777] text-sm`}
                >
                  <div className="bg-white p-3 mt-3 shadow-lg">
                    { 
                      catalogAll.map((item, index) => (
                      <Link
                        key={index}
                        href={`/catalog/${item.url}`}
                        className={`my-2 after-line ${router.asPath === `/catalog/${item.url}` ? 'active' : ''}`}
                      >
                        <span>{ lang === "RU" ? item.catalog : item.catalogMD }</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li className={` max-md:my-2 ${isActive('/galereiia')}`}>
              <Link href={" /galereiia"}>
                <span className="after-line uppercase">
                  {lang === "RU" ? "Галерея" : "Galerie"}
                </span>
              </Link>
            </li>
            <li className={` max-md:my-2 ${isActive('/compania')}`}>
              <Link href={"/compania"}>
                <span className="after-line uppercase">
                  {lang === "RU" ? "О компании" : "Despre noi"}
                </span>
              </Link>
            </li>
            <li className={` max-md:my-2 ${isActive('/contacti')}`}>
              <Link href={"/contacti"}>
                <span className="after-line uppercase">
                  {lang === "RU" ? "Контакты" : "Contacte"}
                </span>
              </Link>
            </li>
          </ul>
          <Lang />
        </div>  
      </div>
    </header>
  );
}
