import { removeAdminFromYoast } from "./build-url";

interface YoastHeadJson {
  title: string;
  description: string;
  canonical: string;
  og_type: string;
  og_locale: string;
  og_url: string;
  og_title: string;
  og_description: string;
  og_site_name: string;
  twitter_card: string;
}

interface Metadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    site_name: string;
  };
  twitter: {
    cardType: string;
  };
}

export const generateYoastMetadata = (
  yoast_head_json: YoastHeadJson
): Metadata => {
  const cleaned = removeAdminFromYoast(yoast_head_json);
  

  return {
    title: cleaned.title,
    description: cleaned.description,
    canonical: cleaned.canonical,
    robots: cleaned.robots,
    openGraph: {
      type: cleaned.og_type,
      locale: cleaned.og_locale,
      url: cleaned.og_url,
      title: cleaned.og_title,
      description: cleaned.og_description,
      site_name: cleaned.og_site_name,
    },
    twitter: {
      cardType: cleaned.twitter_card,
    },
  };
};
