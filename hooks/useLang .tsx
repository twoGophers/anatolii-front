// useLang.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateLang } from '@/store/slices/ui';

export const useLang = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.ui.ui);
  const [isLangLoaded, setIsLangLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang && storedLang !== lang) {
      dispatch(updateLang(storedLang));
    }
    setIsLangLoaded(true);
  }, [lang, dispatch]);

  return { isLangLoaded };
};
