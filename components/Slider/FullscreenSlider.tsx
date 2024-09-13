// components/FullscreenSlider/FullscreenSlider.tsx

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from 'next/image';
import { setModalFull } from '@/store/slices/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { baseUrl } from '@/hooks/base_url';


interface FullscreenSliderProps {
  images: string[];
  isFullscreen: boolean;
  activeSlideIndex: any;
}

const FullscreenSlider: React.FC<FullscreenSliderProps> = ({
  images,
  isFullscreen,
  activeSlideIndex
}) => {

const dispatch = useAppDispatch();

const closeFullscreen = () => {
    dispatch(setModalFull({ show: false, index: null, images: [] }))
}

  if (!isFullscreen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="relative w-full h-full">
        <button
          className="absolute top-4 right-10 text-white text-3xl z-50"
          onClick={closeFullscreen}
        >
          &times;
        </button>
        <Swiper
          modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
          navigation
          initialSlide={activeSlideIndex}
          className="swiper-fullscreen w-full h-full"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={`${baseUrl}/${item}`}
                  alt={item}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FullscreenSlider;
