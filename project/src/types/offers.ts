
export type Host = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type City = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
}

export type Offer = {
  id: number;
  isPremium: boolean;
  title: string;
  previewImage: string;
  price: number;
  type: string;
  rating: number;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };

  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  city: City;
}
