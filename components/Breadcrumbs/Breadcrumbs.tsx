import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
const items = [
  {
      id: 1,
      title: 'Набор для террасы «Kumsal»',
      price: 42300,
      description: 'Набор для террасы «Kumsal» — идеальное решение для создания уютной и стильной обстановки на вашей террасе. Он включает в себя диван, кресла и стол, а также удобные подушки из влагоотталкивающей ткани на фермуаре в бежевом и белом цвете, обеспечивая  комфорт и удобство.',
      descriptionRO: 'Setul de terase Kumsal este soluția perfectă pentru a crea un mediu confortabil și elegant pe terasa dvs. Include o canapea, fotolii și o masă, precum și perne confortabile din țesătură hidrofugă pe o clemă în bej și alb, oferind confort și comoditate.',
      image: ['item1.jpg'],
      catalog: "Мебель из ротанга",
      catalogMD: "Mobilier din ratan",
      name: "Мебель для террасы",
      nameMD: "Mobilier de terasă",
      url: "stole-pierre-1"
  }, {
      id: 2,
      title: 'Ящик ротанговый',
      price: 5000,
      description: 'Ящик изготовлен из металлического каркаса, покрыт порошковой краской, сплетен вручную из искусственного ротанга.',
      descriptionRO: 'Cutia este realizată dintr-un cadru metalic, acoperit cu vopsea pudră, țesut manual din ratan artificial.',
      image: ['item21.jpg', 'item22.jpg', 'item23.jpg'],
      catalog: "Мебель из ротанга",
      catalogMD: "Mobilier din ratan",
      name: "Мебель для террасы",
      nameMD: "Stole de la pierre",
      url: "stole-pierre-2"
  }, {
      id: 3,
      title: 'Кушетка из ротанга',
      price: 3000,
      description: 'Кушетка изготовлена из искусственного ротанга, которая обладает высоким качеством и легкостью использования.',
      descriptionRO: 'Băuturile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
      image: ['item21.jpg'],
      catalog: "Мебель из ротанга",
      catalogMD: "Mobilier din ratan",
      name: "Мебель для террасы",
      nameMD: "Băuturi de la pierre",
      url: "stole-pierre-3"
  }, {
      id: 4,
      title: 'Стол из ротанга',
      price: 10000,
      description: 'Стол изготовлен из искусственного ротанга, который обладает высоким качеством и легкостью использования.',
      descriptionRO: 'Stolele din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
      image: ['item31.jpg', 'item32.jpg'],
      catalog: "Мебель из ротанга",
      catalogMD: "Mobilier din ratan",
      name: "Мебель для террасы",
      nameMD: "Stole de la pierre",
      url: "stole-pierre-4"
  }, {
      id: 5,
      title: 'Комод из ротанга',
      price: 7000,
      description: 'Комод изготовлен из искусственного ротанга, который обладает высоким качеством и легкостью использования.',
      descriptionRO: 'Comodurile din ratan sunt realizate manual, oferind o calitate ��i usabilitate impresionante.',
      image: ['item41.jpg'],
      catalog: "Мебель из ротанга",
      catalogMD: "Mobilier din ratan",
      name: "Мебель для террасы",
      nameMD: "Comoduri de la pierre",
      url: "stole-pierre-5"
  }
]

const Breadcrumbs = () => {
  const router = useRouter();
  const lang: any = useAppSelector((state) => state.ui.ui);

  const breadcrumbLabels: any = {
    RU: {
      home: 'Главная',
      catalog: 'Каталог',
    },
    RO: {
      home: 'Acasă',
      catalog: 'Catalog',
    },
  };

  const pathnames = router.asPath.split('/').filter((x) => x);

  const getBreadcrumbs = () => {
    let breadcrumbs = [
      { label: breadcrumbLabels[lang].home, href: '/' },
      { label: breadcrumbLabels[lang].catalog, href: '/catalog' },
    ];

    if (pathnames.includes('card')) {
      const url = router.query.url as string;
      const item = items.find((item) => item.url === url);

      if (item) {
        breadcrumbs.push({
          label: lang === 'RU' ? item.catalog  : item.catalogMD,
          href: `/catalog/${item.catalog}`,
        });
        breadcrumbs.push({
          label: item.title,
          href: router.asPath,
        });
      }
    } else if (pathnames.length > 1) {
      const category = pathnames[1];
      breadcrumbs.push({
        label:  category.charAt(0).toUpperCase() + category.slice(1) ,
        href: `/catalog/${category}`,
      });
    }

    return breadcrumbs;
  };

  return (
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
  );
};

export default Breadcrumbs;
