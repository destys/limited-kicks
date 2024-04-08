"use strict";

export interface Banners {}

export interface Page {
  yoast_head_json: any;
  id: string;
  title: {
    rendered: string;
  };
  acf: {
    bannery: [];
  };
}

export interface Banners {
  izobrazhenie: SingleImage;
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
    listing_1: IListing;
    banner_dlya_pk: CommonBanner;
  };
}

export interface IListing {
  products?: Product[];
  title: string;
  titleTag: string;
  data: Product[];
}

export interface Product {
  stock_status: string;
  type: string;
  variationsData: Variation[];
  id: number;
  new: boolean;
  slug: string;
  images: SingleImage[];
  name: string;
  price: number;
  variations?: [];
  brand?: BrandDataItem[];
}

export interface Products {
  data: Product[];
  id: number;
  new: boolean;
  slug: string;
  images: SingleImage[];
  name: string;
  price: number;
  stock_status: string;
  type: string;
  variationsData: Variation[];
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
}

export interface Brand {
  title: string;
  image: string;
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
    tablicza_razmerov_obuvi: { [key: string]: string }[];
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
