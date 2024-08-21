import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Icon from "@/components/Icons/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function CategoryaList() {
  const router = useRouter();
  
  const lang: 'RU' | 'RO' = 'RU';

  const breadcrumbLabels = {
    RU: {
      home: 'Главная',
      catalog: 'Каталог',
    },
    RO: {
      home: 'Acasă',
      catalog: 'Catalog',
    },
  };

  const pathnames = router.asPath.split('/').filter(x => x);

  const getBreadcrumbs = () => {
    let breadcrumbs = [
      { label: breadcrumbLabels[lang].home, href: '/' },
    ];

    if (pathnames.length > 0) {
      breadcrumbs.push({
        label: breadcrumbLabels[lang].catalog,
        href: '/catalog',
      });

      pathnames.forEach((pathname, index) => {
        if (index > 0) {
          const href = `/${pathnames.slice(0, index + 1).join('/')}`;
          breadcrumbs.push({
            label: pathname.charAt(0).toUpperCase() + pathname.slice(1),
            href,
          });
        }
      });
    }

    return breadcrumbs;
  };

  return (
    <section>
      <div className='flex w-full justify-between'>
        <div className="crumbs">
          <nav>
            <ol className="breadcrumb">
              {getBreadcrumbs().map((crumb, index) => (
                <li key={index} className="breadcrumb-item">
                  {index === getBreadcrumbs().length - 1 ? (
                    <span>{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="filter flex flex-row gap-x-10">
          <div>
            Показать : 
            <span> 20 </span> /
            <span> 40 </span> /
            <span> 60 </span>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='cursor-pointer'>
              <Icon icon={'nine'} /> 
            </span>
            <span className='cursor-pointer'>
              <Icon icon={'fourteen'} /> 
            </span>
            <span className='cursor-pointer'>
              <Icon icon={'tventyfive'} /> 
            </span>
          </div>
          <div>
            <div>
              <select
                name="orderby"
                className="orderby border-b-2 border-solid border-[#a6c4b1] cursor-pointer"
                aria-label="Заказ в магазине"
                defaultValue="menu_order"
              >
                <option value="menu_order">Исходная сортировка</option>
                <option value="popularity">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="date">Сортировка по более позднему</option>
                <option value="price">Цены: по возрастанию</option>
                <option value="price-desc">Цены: по убыванию</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        Catalog
      </div>
    </section>
  );
}
