import { useEffect, useState } from "react";
import Image from "next/image";
import Error from "@/public/error.png";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from "next/link";

export default function Custom404() {
  const lang = useAppSelector((state) => state.ui.ui);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-screen flex justify-center">
      <div className="w-1/2 flex justify-center flex-col items-center">
        <Image 
          src={Error}
          alt="error"
          width={1000}
          height={1000}
        />
        <h4 className="text-center leading-relaxed">
          {isClient ? (
            lang === "RU" 
              ? 'Страница не найдена. Вернуться на главную страницу: ' 
              : 'Pagina nu a fost găsită. Reveniți la pagina principală: '
          ) : (
            '...'
          )}
        </h4>
        <Link href={'/'} className="rounded border w-fit p-2 mt-2 border-sky-200 text-sky-500 hover:bg-gray-200 transition-all duration-300 ease-in-out"> 
          Home 
        </Link>
      </div>
    </div>
  );
}
