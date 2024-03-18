"use strict";

export interface Banners {}

export interface Page {
  id: string;
  acf: {
    bannery: [];
  };
}

export interface Posts {
  id: number;
  data: BlogItem[];
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
    listing_1: Listing;
    banner_dlya_pk: Banner;
  };
}

export interface Listing {
  products?: ProductItem[];
  title: string;
  titleTag: string;
  data: ProductItem[];
}

export interface ProductItem {
  data: ProductItem[];
  id: number;
  new: boolean;
  images: Image[];
  name: string;
  price: number;
}

export interface Banner {
  id: number;
  title: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogSLider {
  data: BlogItem2[];
}

export interface BlogItem {
  id: number;
  data: {
    id: number;
    slug: string;
    title: {
      rendered: string;
    };
    _embedded: {
      "wp:featuredmedia": FeaturedMedia[];
    };
  };
}

export interface BlogItem2 {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  _embedded: {
    "wp:featuredmedia": FeaturedMedia[];
  };
}

interface FeaturedMedia {
  source_url: string;
}
