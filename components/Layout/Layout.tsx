import React, { useActionState, useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const lang = useAppSelector((state) => state.ui.ui);
  const [animationClass, setAnimationClass] = useState<string>('');
  const modal = useAppSelector((state) => state.ui.modal);

  useEffect(() => {
    setAnimationClass('fade-out');
    const timer = setTimeout(() => {
      setAnimationClass('fade-in');
    }, 300);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div>
      <div className={`container-animation ${animationClass}`}>
        <div className="container">
          <Header />
        </div>
        <div className="main">
          {children}
        </div>
        <div className="container">
          <Footer />
        </div>
      </div>
    </div>
  );
}
