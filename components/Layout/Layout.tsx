import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FullscreenSlider from '@/components/Slider/FullscreenSlider';
import { getCardAll, getCatalogItems } from '@/store/slices/catalog';
import FullImage from "../Modal/FullImage";
import MenuMobile from "../Modal/MenuMobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const [animationClass, setAnimationClass] = useState<string>('');
  
  const modalFull = useAppSelector((state) => state.ui.modalFull);
  const modalFullImage = useAppSelector((state) => state.ui.modalFullImage);

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => {
      setAnimationClass('fade-in');
    }, 300);
    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    dispatch(getCatalogItems());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white ">
      <div className={`container-animation ${animationClass} flex-grow max-md:mt-4`}>
        <div className="container">
          <Header />
        </div>
        <div className="flex-grow mb-24 mt-4 md:mt-5">
          {children}
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>

      {/* Fullscreen slider modal */}
      <FullscreenSlider 
        images={modalFull.images} 
        isFullscreen={modalFull.show} 
        activeSlideIndex={modalFull.index} 
      />

      {/* Full image modal */}
      <FullImage 
        show={modalFullImage.show}
        image={modalFullImage.image}
      />

      <MenuMobile />
      
    </div>
  );
}
