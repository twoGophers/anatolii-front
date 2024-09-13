export interface Card {
    _id: string;
    catalog: string;
    catalogMD: string;
    url: string;
    images: string[];       // Ensure image is an array
    subCatalog: string;
    subCatalogMD: string;
    name: string;
    nameMD: string;
    urlCatalog: string;
    urlSubCatalog: string;
    description: string;
    descriptionRO: string;
    price: number ;
    imageUpdate: File[];
    views: number,
    createdAt: any
  }

  export interface SubCatalog {
    name: string;       
    nameMD: string;     
    url: string;        
    image: string[];    
    catalogUrl: string; 
  }
  
  export interface Catalog {
    _id: {
      $oid: string; 
    };
    catalog: string;     
    catalogMD: string;   
    title: string;       
    titleMD: string;     
    url: string;         
    image: string[];     
    items: SubCatalog[]; 
    __v: number;         
  }

  export interface CatalogState {
    catalog: Catalog[];
    catalogAll: any[];
    subloading: boolean;
    suberror: string;
    subCatalogAll: SubCatalog[];
    cardArr: any;
    cardUrl: Card[]; 
    cardOne: Card | null; 
  }