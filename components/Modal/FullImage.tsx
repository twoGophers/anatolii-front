import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { fullImageshow } from '@/store/slices/ui';
import { baseUrl } from '@/hooks/base_url';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function FullImage({ show, image } : any) {
    const dispatch = useAppDispatch();

    const closeFullscreen = () => {
        dispatch(fullImageshow({ show: false, image: null }));
    };

    return (
        <>
            {show && image && (
                <div className="fixed inset-0 z-50 bg-slate-400 bg-opacity-80 flex justify-center items-center transition-opacity duration-300 ease-out opacity-100">
                    <button
                        className="absolute border rounded-full w-10 h-10 top-4 right-4 text-white text-3xl z-50 transition-transform duration-300 ease-in-out transform hover:scale-110"
                        onClick={closeFullscreen}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <div className="relative w-3/4 h-3/4 slider-show-img-smoth">
                        {image && (
                            <Image
                                src={`${baseUrl}/${image}`}
                                fill
                                alt="Fullscreen Image"
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
