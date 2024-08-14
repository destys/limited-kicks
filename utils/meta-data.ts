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
  return {
    title: yoast_head_json.title,
    description: yoast_head_json.description,
    canonical: yoast_head_json.canonical,
    openGraph: {
      type: yoast_head_json.og_type,
      locale: yoast_head_json.og_locale,
      url: yoast_head_json.og_url,
      title: yoast_head_json.og_title,
      description: yoast_head_json.og_description,
      site_name: yoast_head_json.og_site_name,
    },
    twitter: {
      cardType: yoast_head_json.twitter_card,
    },
  };
};
