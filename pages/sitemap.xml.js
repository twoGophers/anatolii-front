import { baseUrl } from '@/hooks/base_url';
import { getCatalogAll, getCardAll } from '@/store/slices/catalog';

export async function getServerSideProps({ res }) {
  const catalogAll = await getCatalogAll(); // функция для получения всех каталогов
  const cardArr = await getCardAll(); // функция для получения всех товаров

  const date = new Date().toISOString();
  
  const staticPages = [
    `${baseUrl}/`,
    `${baseUrl}/catalog`, 
    `${baseUrl}/compania`,
    `${baseUrl}/contacti`,
    `${baseUrl}/galereiia`,
    ...catalogAll.map(catalog => `${baseUrl}/catalog/${catalog.url}`),
    ...cardArr.map(card => `${baseUrl}/catalog/${card.url}`),
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${date}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  // Устанавливаем заголовки ответа
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
