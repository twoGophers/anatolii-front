export interface Card {
    catalog: string;
    catalogMD: string;
    url: string;
    image: string[];       // Ensure image is an array
    items: CatalogItem[];  // Ensure items is an array
    subCatalog: string;
    subCatalogMD: string;
    name: string;
    nameMD: string;
    urlCatalog: string;
    urlSubCatalog: string;
    imageName: string[];   // Ensure imageName is an array
    description: string;
    descriptionRO: string;
    price: string;
  }
  
  export interface CatalogItem {
    url: string;
    name: string;
  }