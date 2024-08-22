import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import data from "@/db/catalog.json";
import Logo from "@/assets/logo.png";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateLang } from '@/store/slices/ui';
import { useLang } from '@/hooks/useLang ';

export default function Header() {
  const { isLangLoaded } = useLang();
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const lang = useAppSelector((state) => state.ui.ui);
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

  const handleLang = ( lang: string ) => {
    localStorage.setItem('lang', lang);
    dispatch(updateLang(lang));
  }

  const isActive = (path: string) => router.pathname === path ? 'active-link' : '';

  if (!isLangLoaded) {
    return null;
  }

  return (
    <header className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-9 columns-3">
        <Link href="/">
          <Image
            src={Logo}
            className="pt-1 pb-1 h-20 max-w-48"
            alt="Picture of the author"
            priority
          />
        </Link>
        <Link
          href="tel:+37367346700"
          className="flex flex-row text-[#a6c4b1] text-base"
        >
          <FontAwesomeIcon icon={faPhone} className="w-4" />
          +37367346700
        </Link>
      </div>
      <div className="nav flex items-center text-sm font-semibold gap-10">
        <ul className="text-[#333] flex gap-x-5 list-none">
          <li className={isActive('/')}>
            <Link href={"/"}>
              <span className="after-line uppercase">
                {lang === "RU" ? "ГЛАВНАЯ" : "Principală"}
              </span>
            </Link>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative ${isActive('/catalog')}`}
          >
            <Link href={`/catalog/catalog`} className="flex flex-row items-center relative">
              <span className="after-line after-line__arrow uppercase">
                {lang === "RU" ? "КАТАЛОГ" : "Catalog"}
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
                  {data.map((item, index) => (
                    <Link
                      key={index}
                      href={`/catalog/${item.url}`}
                      className={`my-2 after-line ${router.asPath === `/catalog/${item.url}` ? 'active' : ''}`}
                    >
                      <span key={item.id}>{ lang === "RU" ? item.catalog : item.catalogMD }</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li className={isActive('/galereiia')}>
            <Link href={"/galereiia"}>
              <span className="after-line uppercase">
                {lang === "RU" ? "ГАЛЕРЕЯ" : "Galerie"}
              </span>
            </Link>
          </li>
          <li className={isActive('/compania')}>
            <Link href={"/compania"}>
              <span className="after-line uppercase">
                {lang === "RU" ? "О КОМПАНИИ" : "Despre noi"}
              </span>
            </Link>
          </li>
          <li className={isActive('/contacti')}>
            <Link href={"/contacti"}>
              <span className="after-line uppercase">
                {lang === "RU" ? "КОНТАКТЫ" : "Contacte"}
              </span>
            </Link>
          </li>
        </ul>
        <ul className="flex gap-x-2.5">
          <li className={`cursor-pointer ${lang === "RU" && 'active-link'}`} onClick={() => handleLang("RU")}>
              <span>RU</span>
          </li>
          <li className={`cursor-pointer ${lang === "RO" && 'active-link'}`} onClick={() => handleLang("RO")}>
              <span>RO</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
