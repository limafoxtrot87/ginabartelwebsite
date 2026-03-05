export type SoldHome = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image?: string;
  soldPrice: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  yearBuilt?: number;
  lotSize?: string;
  // legacy fields kept for carousel compatibility
  price?: string;
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

export type ActiveListing = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  priceRaw: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft?: number;
  yearBuilt?: number;
  hoaMonthly?: number;
  type: string;
  mlsNumber: string;
  listedDate: string;
  daysOnMarket: number;
  status: "Active" | "Pending" | "Coming Soon";
  heroImage: string;
  photos: string[];
  highlights: string[];
  description: string;
  features: {
    interior: string[];
    outdoor: string[];
    community: string[];
  };
  pricePerSqft: number;
  loanTypes: string[];
  community?: string;
  virtualTourUrl?: string;
};
