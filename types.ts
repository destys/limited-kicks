"use strict";

export interface Banners {}

export interface Page {
  slug: string;
  content: {
    rendered: string;
  };
  yoast_head_json: any;
  id: string;
  title: {
    rendered: string;
  };
  template: string;
  acf: {
    korotkoe_opisanie: string;
    bannery: [];
    faq: IFaqItem[];
  };
}

export interface Banners {
  izobrazhenie: SingleImage;
  izobrazhenie_mobile: SingleImage;
  ssylka: string;
}

export interface SingleImage {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  src: string;
  name: string;
}

export interface AcfOptions {
  acf: {
    oblako_metok: Tag[];
    bannery: {
      banner_dlya_pk: CommonBanner;
      banner_dlya_telefonov: CommonBanner;
    };
    bannery_v_kataloge: { banner_1: SingleImage; banner_2: SingleImage };
    tovary_po_zaprosu: IProductsOnRequest;
    begushhaya_stroka: {
      ikonka: SingleImage;
      tekst: string;
    }[];
    chastye_zaprosy: {
      zagolovok: string;
      ssylka: string;
    }[];
    banner: SearchBanner;
    listing_4: IListing;
    listing_2: IListing;
    listing_3: IListing;
    listing_1: IListing;
  };
}

export interface SearchBanner {
  banner: {
    ID: number;
    url: string;
    sizes: {
      large: string;
      thumbnail: string;
      medium: string;
      [key: string]: string; // Для динамических ключей размеров
    };
  };
  ssylka: string;
}

export interface IListing {
  products?: Product[];
  title: string;
  titleTag: string;
  data: Product[];
  ssylka: string;
}

export interface Product {
  yoast_head_json: any;
  sku: string;
  acf: {
    h2_zagolovok: string;
    data_reliza: any;
    flag_1: string;
    flag_2: string;
    tovary_pod_zakaz: boolean;
  };
  description: string;
  attributes: Attribute[];
  stock_status: string;
  type: string;
  variationsData: Variation[];
  id: number;
  new: boolean;
  slug: string;
  image: string;
  images: SingleImage[];
  name: string;
  price: number;
  variations?: [];
  brand: BrandDataItem[];
  tags: Tag[];
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  options: number[];
  count?: number;
  description?: string;
  acf: { ikonka: { url: string } };
  yoast_head_json: {};
}
export interface Products extends Omit<Product, "data"> {
  data: Product[];
}
export interface Variation {
  price: number;
  id: number;
  name: string;
  stock_status: string;
  [key: string]: any;
}

export interface CommonBanner {
  id: number;
  title: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  _embedded: {
    "wp:featuredmedia": FeaturedMedia[];
  };
  acf: {
    tovar: { ID: number };
  };
  yoast_head_json: any;
}

interface FeaturedMedia {
  source_url: string;
}

export interface Category {
  menu_order: any;
  id: number;
  name: string;
  slug: string;
  count: number;
  image: {
    src: string;
  };
  yoast_head_json?: any;
}

export interface Brand {
  count: number;
  description: string;
  yoast_head_json: any;
  id: number;
  name: string;
  slug: string;
  acf: {
    metki_pod_zagolovkom: Tag[] | undefined;
    logotip: {
      url: string;
    };
    kategoriya: {
      name: string;
      slug: string;
    }[];
    korotkoe_opisanie: string;
    ikonka: {
      url: string;
    };
  };
}

export interface BrandDataItem {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  acf: {
    tablicza_razmerov_obuvi: iSizesTable;
    tablicza_razmerov_obuvi_dlya_czen: iSizesTable;
  };
}
export interface ICartItem {
  id: number;
  slug: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  entrySize?: { [key: string]: any };
  sizeType?: string;
}

export interface User {
  username: string;
  birthdate: any;
  id: any;
  email: string;
  last_name: string;
  first_name: string;
  phone: string;
  acf: {
    addresses: Address[];
  };
}

export interface Address {
  id?: number;
  city: string;
  street: string;
  build: string;
  apartment_number: string;
}

export interface IOrder {
  shipping_lines: any;
  total: string;
  date_created: string | number | Date;
  line_items: OrderProduct[];
  id: number;
  status: string;
  name: string;
  image: {
    src: string;
  };
}

interface OrderProduct {
  name: string;
  image: any;
  total: string;
  quantity: number;
  variation_id: number;
  meta_data: any;
  id: number;
}

export interface IProductsOnRequest {
  tovary: [
    {
      izobrazhenie: {
        url: string;
      };
      czena: string;
      kategoriya: string;
      nazvanie: string;
    }
  ];
  zagolovok: string;
  tekst: string;
}

export interface Tag {
  term_id: number;
  id: number;
  name: string;
  slug: string;
}

export interface IMenu {
  items: IMenuItem[];
}
export interface IMenuItem {
  id: number;
  url: any;
  title: string;
  slug: string;
  image?: string;
  children?: IMenuItem[];
}

export interface ICoupon {
  discount_type: string;
  amount: string;
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: [];
}

export interface IFaqItem {
  vopros: string;
  otvet: string;
}

export interface IProductsQuery {
  category?: string;
  attribute?: string;
  attribute_term?: number;
  tag?: string;
  per_page?: number;
  page?: number;
}

export interface iSizesTable {
  use_header: boolean;
  header: { c: string }[];
  body: { c: string }[][];
}
