import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FullscreenSlider from '@/components/Modal/FullscreenSlider';
import FullImage from "../Modal/FullImage";
import MenuMobile from "../Modal/MenuMobile";
import MobileCatalog from "../Modal/MobileCatalog";
import Image from 'next/image';
import Preloader from "@/public/5.gif";
import { getCatalogItems } from '@/store/slices/catalog';
import ThreeSphere from "../Untils/ThreeSphere";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  
  const lang = useAppSelector((state) => state.ui.ui);
  const modalFull = useAppSelector((state) => state.ui.modalFull);
  const modalFullImage = useAppSelector((state) => state.ui.modalFullImage);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => {
      setAnimationClass('fade-in');
    }, 300);

    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    dispatch(getCatalogItems()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Image src={Preloader} alt="Loading..." width={50} height={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className={`container-animation ${animationClass} flex-grow max-md:mt-4`}>
        <div className="container">
          <Header />
        </div>
        <div className="flex-grow mb-10 md:mb-24 mt-4 md:mt-5">
          {children}
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>

      {/* Conditional rendering for fullscreen slider modal */}
      {modalFull.show && (
        <FullscreenSlider 
          images={modalFull.images} 
          isFullscreen={modalFull.show} 
          activeSlideIndex={modalFull.index} 
        />
      )}

      {/* Conditional rendering for full image modal */}
      {modalFullImage.show && (
        <FullImage 
          show={modalFullImage.show} 
          image={modalFullImage.image} 
        />
      )}

      {/* <ThreeSphere /> */}

      {/* Additional mobile menus */}
      <MenuMobile />
      <MobileCatalog />
    </div>
  );
}
