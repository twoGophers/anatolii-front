export interface Card {
    catalog: string;
    catalogMD: string;
    url: string;
    image: string[];       // Ensure image is an array
    subCatalog: string;
    subCatalogMD: string;
    name: string;
    nameMD: string;
    urlCatalog: string;
    urlSubCatalog: string;
    description: string;
    descriptionRO: string;
    price: string;
    imageUpdate: any
  }
