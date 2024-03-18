"use strict";

export interface Banners {}

export interface Page {
  id: string;
  title: {
    rendered: string;
  };
  acf: {
    bannery: [];
  };
}

export interface Banners {
  izobrazhenie: Image;
}

export interface Image {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  src: string;
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
  data: Product[];
  id: number;
  new: boolean;
  images: Image[];
  name: string;
  price: number;
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
