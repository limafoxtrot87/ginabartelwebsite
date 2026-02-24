export type SoldHome = {
  slug: string;
  address: string;
  city: string;
  image: string;
  price?: string;
  beds?: number;
  baths?: number;
  description: string;
  saleDate?: string;
  daysOnMarket?: number;
};

export type Neighborhood = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  overview: string;
  lifestyle: string;
  amenities: string[];
  market: string;
};

export type ServiceArea = {
  slug: string;
  name: string;
  overview: string;
  lifestyle: string;
  amenities: string[];
  commute: string;
  market: string;
  image: string;
  pros: string[];
  cons: string[];
  medianPrice?: string;
  schoolsRating?: number;
};

export type SocialLink = {
  label: string;
  href: string;
};
