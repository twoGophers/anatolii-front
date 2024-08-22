import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const lang = useAppSelector((state) => state.ui.ui);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => {
      setAnimationClass('fade-in');
    }, 300);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div className={`container container-animation ${animationClass}`}>
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  );
}
