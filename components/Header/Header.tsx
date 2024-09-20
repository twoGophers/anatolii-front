import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/assets/logo.svg";
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
          {/* <Image
            src={Logo}
            className="pt-1 pb-1 max-w-48 max-md:max-w-32"
            alt="Picture of the author"
            priority
          /> */}
          <div className="pt-1 pb-1 w-56 max-w-48 max-md:max-w-32 flex">
            <svg 
              width="258.6" 
              height="91.4014070371128" 
              viewBox="0 0 370 130.77540836709875" 
              className="looka-1j8o68f">
                <defs id="SvgjsDefs4665">
                  <linearGradient id="SvgjsLinearGradient4672">
                    <stop id="SvgjsStop4673" stopColor="#b98947" offset="0"></stop>
                    <stop id="SvgjsStop4674" stopColor="#faf0a1" offset="1"></stop>
                    </linearGradient>
                </defs>
                <g id="SvgjsG4666"  transform="matrix(0.573498181390502,0,0,0.573498181390502,-7.379203620207269,9.924768530267396)" fill="url(#SvgjsLinearGradient4672)">
                  <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M186.4,145L186.4,145c-12.1-10.6-24.3-21-36.6-31.3c-6.2-5.1-12.4-10.3-18.6-15.3c-6.2-4.9-11.9-10.5-18.4-15.6   c-2-1.6-4-3.1-6.2-4.5c-1.1-0.7-2.2-1.4-3.3-2c-1-0.6-2.2-1.1-3.4-1c-0.6,0-1.2,0.2-1.8,0.4c-0.6,0.3-1,0.5-1.3,0.6   c-4.9,2.7-8.6,6.3-12.2,9.3c-0.9,0.8-1.8,1.5-2.8,2.2l-2.9,2.3L73,94.7L70,96.9c0-0.7,0-1.4,0-2.1c0-0.8-0.1-1.6-0.3-2.5   c-0.2-0.9-0.5-1.9-1.2-3c-0.8-1-1.8-1.8-2.7-2.2c-0.5-0.2-0.9-0.4-1.3-0.5c-0.4-0.1-0.8-0.2-1.2-0.3c-1.6-0.3-3-0.3-4.4-0.3   c-1.4,0-2.7,0.1-4,0.2c-1.3,0.1-2.5,0.2-3.5,0.2c-1.1,0-2.4-0.1-3.8-0.2c-1.4,0-3,0-4.8,0.5c-0.9,0.3-1.9,0.7-2.8,1.5   c-0.5,0.4-0.8,0.8-1.2,1.3c-0.3,0.5-0.6,1-0.8,1.5c-0.2,0.5-0.4,1-0.4,1.4c-0.1,0.4-0.2,0.8-0.2,1.2c-0.1,0.8-0.2,1.5-0.2,2.2   c-0.2,3,0.1,5.7,0.3,8.2l0.1,1.9l0.1,1.9c0,1.4,0.1,2.7,0.2,4c0.2,2.6,0.4,5.1,0.3,7.5c0,0.6-0.1,1.2-0.1,1.7   c-0.1,0.6-0.1,1.1-0.2,1.5c-0.2,0.8-0.5,1.3-1.3,2l-5.8,5l-5.9,5.2c-3.9,3.5-7.7,7-11.6,10.5v0c-1,0.9-0.1,2.1,1,1.3h0   c4.3-2.9,8.6-5.9,12.9-8.9l6.4-4.5l3.2-2.3c1-0.8,2-1.4,3.3-2.4c1.2-0.9,2.5-2.6,3.1-4.3c0.3-0.9,0.4-1.7,0.6-2.4   c0.1-0.7,0.2-1.4,0.3-2.2c0.2-2.8,0.1-5.6,0-8.1c0-1.3-0.1-2.6-0.1-3.8c0-0.6,0-1.4,0-2.1l-0.1-2c-0.2-2.6-0.4-5.2-0.2-7.4   c0-0.6,0.1-1.1,0.2-1.6c0-0.3,0.1-0.5,0.1-0.7c0-0.2,0.1-0.3,0.1-0.4c0.1-0.2,0.1-0.3,0.2-0.3c0-0.1,0.2-0.1,0.5-0.3   c0.6-0.2,1.6-0.3,2.7-0.2c1.1,0,2.4,0.2,3.8,0.2c1.6,0,2.9-0.1,4.1-0.2c1.2-0.1,2.4-0.2,3.6-0.2c1.1,0,2.3,0,3.1,0.2   c0.2,0,0.4,0.1,0.6,0.1c0.2,0,0.3,0.1,0.4,0.2c0.3,0.1,0.2,0.1,0.2,0.1c0,0,0.1,0.2,0.2,0.6c0.1,0.4,0.1,0.9,0.2,1.4   c0,1.1,0,2.2-0.1,3.5c-0.1,1.1,0,2.2,0.3,3.2l-2.4,1.9c-3.7,2.9-5.8,6.3-4.7,7.7c1.1,1.4,5,0.2,8.6-2.7l11.6-9.1l5.8-4.5l2.9-2.3   c0.9-0.7,2-1.6,3-2.4c3.8-3.2,7.3-6.6,11.1-8.6l0.3-0.2l0,0c0.9,0.6,2,1.2,2.9,1.8c2,1.3,3.9,2.7,5.7,4.1   c6.2,4.8,12.1,10.4,18.6,15.4c6.4,4.9,12.8,9.8,19.2,14.6c12.8,9.7,25.8,19.2,38.9,28.5h0C187.1,147.5,188,146.4,186.4,145z"></path><path d="M42.5,64.1l1.7,3.2c0.5,1,0.9,1.9,1.1,2.6c0.2,0.8,0.1,1.1,0,1.3c-0.2,0.2-0.6,0.7-1.3,1.1c-0.7,0.4-0.8,2-0.2,3.7   c0.7,1.6,2.2,2.6,3.5,1.8C48.6,77,50,75.9,51,74c0.2-0.5,0.4-1,0.6-1.5c0.1-0.5,0.2-1,0.2-1.5c0-1-0.1-1.9-0.3-2.7   c-0.4-1.6-1-2.9-1.6-4l-1.7-3.2c-0.4-0.8-0.8-1.6-1.1-2.3c-0.2-0.7-0.4-1.3-0.5-1.9c-0.2-1.2,0.1-2,0.9-3.1c0.9-1.1,2.3-2,4-2.8   c1.6-0.8,3.4-1.4,5.3-2c0.5-0.1,0.4-1.6-0.1-1.6c-2-0.2-4.1-0.3-6.2,0c-2.1,0.3-4.3,0.9-6.4,2.4c-0.5,0.4-1,0.8-1.5,1.4   c-0.5,0.5-0.8,1.1-1.2,1.8c-0.3,0.6-0.5,1.3-0.7,2c-0.1,0.7-0.2,1.4-0.2,2.1c0,1.4,0.3,2.6,0.6,3.8C41.6,62.1,42,63.2,42.5,64.1z"></path><path d="M56.2,57.7c-0.4,0.1-0.9,0.2-1.4,0.7c-0.5,0.5-0.7,1.4-0.6,2c0,0.6,0.2,1.1,0.4,1.5c0.7,1.6,1.5,2.6,2.4,3.5   c0.4,0.5,0.9,0.9,1.4,1.4l1.3,1.2c0,0,0,0,0.1,0.2c0.1,0.1,0.2,0.3,0.2,0.4c0,0.1,0.1,0.2,0.1,0.2c0,0.1,0,0.1,0,0.1   c0.1,0-0.1,0.7-0.9,1.7c-0.7,1-1.7,2.2-2.6,4c-0.2,0.4-0.1,1,0.4,1.5c0.4,0.5,1.2,0.9,2,1.1c0.8,0.3,1.7,0.4,2.3,0.4   c0.6,0.1,1,0.1,1.1-0.1c0.4-0.8,1.2-1.9,2.2-3.2c0.5-0.7,1-1.4,1.4-2.5c0.4-1,0.8-2.4,0.6-3.8c-0.1-0.6-0.2-1.1-0.4-1.6   c-0.2-0.5-0.4-0.9-0.7-1.3c-0.3-0.4-0.5-0.7-0.8-1c-0.3-0.3-0.7-0.8-1.2-1.1c-0.6-0.4-1.1-0.6-1.6-0.9l-1.5-0.8   c-0.9-0.5-1.9-1-2.5-1.4l-0.2-0.1c0,0,0,0-0.1,0c0,0,0,0-0.2,0c-0.1,0-0.2,0-0.2,0c0,0,0,0,0-0.1c0.1-0.2,0.3-0.3,0.6-0.5   c0.2-0.2,0-1.6-0.3-1.6C57,57.7,56.7,57.7,56.2,57.7z"></path><path d="M168.1,145L168.1,145c-12.8-10.7-25.8-21.3-38.9-31.7l-9.9-7.8l-4.9-3.9l-2.5-1.9l-1.2-0.9c-0.3-0.3-0.7-0.6-1-0.9   c-1.5-1.4-3-2.9-5.1-4.4c-0.5-0.4-1.1-0.7-1.8-1c-0.4-0.2-0.7-0.3-1.2-0.4c-0.5-0.1-1-0.2-1.5-0.2c-2.1,0-3.5,0.8-4.7,1.5   c-2.2,1.5-3.7,3.1-5.1,4.2l-4.9,3.9l-24,19l-6,4.8c-2.1,1.6-4,3.3-6,4.9c-4,3.2-7.9,6.4-12,9.4c-1.9,1.4-3.4,3-4.4,4.2   c-0.5,0.6-0.8,1.2-0.9,1.7c0,0.1-0.1,0.2,0,0.3c0,0.1,0,0.1,0,0.2c0,0,0,0.2,0,0.3c0,0.1-0.1,0.3,0,0.3c0,0,0,0,0,0l-0.1,0.1h0   c-0.2,0.1-0.2,0.5,0.2,0.7c0.3,0.2,0.6,0.3,1,0.4c0.7,0.1,1.5,0.1,2.4-0.1c1.8-0.4,3.8-1.5,5.8-2.9c4.2-3.1,8.2-6.3,12.2-9.6   c2-1.6,4-3.3,5.9-4.8l6-4.8l24.1-19.1l4.9-3.9c1-0.8,1.8-1.5,2.5-2.2c0.7-0.7,1.4-1.3,2.1-1.7c0.6-0.4,1.1-0.6,1.2-0.5   c-0.2-0.1,0.5,0.1,1.2,0.6c1.4,0.9,2.9,2.3,4.5,3.7c0.4,0.4,0.8,0.7,1.4,1.1l1.3,1l2.5,1.9l5.1,3.7l10.2,7.4   c13.6,9.8,27.3,19.4,41.1,28.9v0C168.9,147.5,169.8,146.4,168.1,145z"></path></g></g><g id="SvgjsG4667" transform="matrix(1.888738282709906,0,0,1.888738282709906,113.10119310325787,-21.506360499662577)" fill="#000"><path d="M20.293 16.934 l-10.742 0 l0 6.4063 l9.2773 0 l0 5.0977 l-9.2773 0 l0 11.563 l-5.8984 0 l0 -28.223 l16.641 0 l0 5.1563 z M38.7545390625 40.39063 c-8.3008 0 -14.434 -5.6641 -14.434 -14.512 c0 -8.8672 6.1328 -14.492 14.434 -14.492 c8.2813 0 14.414 5.625 14.414 14.492 c0 8.8477 -6.1328 14.512 -14.414 14.512 z M38.7545390625 35.0195 c4.8633 0 8.5938 -3.418 8.5938 -9.1406 c0 -5.7031 -3.7305 -9.1016 -8.5938 -9.1016 s-8.5938 3.3984 -8.5938 9.1016 c0 5.7227 3.7305 9.1406 8.5938 9.1406 z M74.424140625 40 l-7.3438 -12.422 l-1.6992 0 l0 12.422 l-5.8594 0 l0 -28.223 l10.234 0 c6.3867 0 9.082 3.7695 9.082 8.4375 c0 3.7891 -2.1484 6.25 -5.9766 7.0703 l8.4961 12.715 l-6.9336 0 z M65.380840625 16.641 l0 6.7383 l3.457 0 c3.125 0 4.3945 -1.3281 4.3945 -3.3594 c0 -2.0117 -1.2695 -3.3789 -4.3945 -3.3789 l-3.457 0 z M98.8228671875 40.39063 c-8.1445 0 -14.141 -5.625 -14.141 -14.434 c0 -8.9258 6.1328 -14.57 14.434 -14.57 c5.4492 0 9.9609 2.4023 12.422 6.6406 l-5.1367 2.7344 c-1.4844 -2.8906 -4.1406 -4.2773 -7.2852 -4.2773 c-4.8828 0 -8.5547 3.3594 -8.5547 9.3359 c0 5.7617 3.4375 9.4727 8.7695 9.4727 c3.6133 0 6.9336 -1.7969 7.7344 -5.918 l-7.7148 0 l0 -4.707 l13.262 0 l0 15.332 l-4.6094 0 l0 -3.9063 c-1.8164 2.6758 -4.8633 4.2969 -9.1797 4.2969 z M136.01609375 16.934 l-10.469 0 l0 6.4063 l9.2773 0 l0 5.0977 l-9.2773 0 l0 6.3867 l10.469 0 l0 5.1758 l-16.367 0 l0 -28.223 l16.367 0 l0 5.1563 z"></path></g><g id="SvgjsG4668"  transform="matrix(4.293423094107493,0,0,4.293423094107493,157.82835120837748,44.1341290177608)" fill="#000"><path d="M4.1 20.18 c-0.65334 0 -1.2335 -0.086738 -1.7401 -0.26008 s-0.93332 -0.45 -1.28 -0.83 s-0.60332 -0.87666 -0.76998 -1.49 s-0.23666 -1.3533 -0.21 -2.22 l1.2 0 c0 0.42666 0.02 0.87 0.06 1.33 s0.14666 0.88 0.32 1.26 s0.43668 0.69 0.79002 0.93 s0.84334 0.36 1.47 0.36 c0.53334 0 0.98668 -0.08 1.36 -0.24 s0.67668 -0.37334 0.91002 -0.64 s0.39668 -0.58 0.49002 -0.94 s0.14 -0.73334 0.14 -1.12 c0 -0.45334 -0.08334 -0.85 -0.25 -1.19 s-0.38666 -0.64334 -0.66 -0.91 s-0.59334 -0.50332 -0.96 -0.70998 s-0.75 -0.39 -1.15 -0.55 c-0.64 -0.25334 -1.2 -0.50334 -1.68 -0.75 s-0.87334 -0.52332 -1.18 -0.82998 s-0.53666 -0.66332 -0.69 -1.07 s-0.23 -0.90332 -0.23 -1.49 c0 -1.3333 0.35 -2.3266 1.05 -2.98 s1.7033 -0.98 3.01 -0.98 c1.1333 0 2.03 0.33 2.69 0.99 s0.99 1.65 0.99 2.97 l0 1.1 l-1.12 0 l0 -1.2 c0 -0.41334 -0.05 -0.79668 -0.15 -1.15 s-0.25666 -0.66334 -0.47 -0.93 s-0.48334 -0.47666 -0.81 -0.63 s-0.71666 -0.23 -1.17 -0.23 c-1.0667 0 -1.83 0.28 -2.29 0.84 s-0.67 1.3133 -0.63 2.26 c0.01334 0.41334 0.09 0.76668 0.23 1.06 s0.32666 0.55 0.56 0.77 s0.51334 0.41666 0.84 0.59 s0.69 0.34668 1.09 0.52002 c0.46666 0.2 0.93 0.41334 1.39 0.64 s0.89 0.50666 1.29 0.84 c0.4 0.34666 0.73 0.75 0.99 1.21 s0.39 1.03 0.39 1.71 c0 1.32 -0.33666 2.31 -1.01 2.97 s-1.61 0.99 -2.81 0.99 z M12.620000000000001 6.1 l0 13.9 l-1.16 0 l0 -13.9 l-3.26 0 l0 -1.1 l7.68 0 l0 1.1 l-3.26 0 z M21.38 13.14 l0 6.86 l-1.08 0 l0 -6.86 l-3.62 -8.14 l1.24 0 l2.9 6.94 l2.94 -6.94 l1.24 0 z M25.999999999999996 20 l0 -15 l1.08 0 l0 13.92 l5.1 0 l0 1.08 l-6.18 0 z M33.3 20 l0 -15 l7.36 0 l0 1.16 l-6.32 0 l0 5.7 l6.26 0 l0 0.92 l-6.26 0 l0 6.06 l6.46 0 l0 1.16 l-7.5 0 z"></path></g></svg>          
          </div>
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
