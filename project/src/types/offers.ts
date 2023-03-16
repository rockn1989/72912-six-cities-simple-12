import { TypeHousing } from '../const';


export type Host = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type Offer = {
  id: number;
  isPremium: boolean;
  title: string;
  previewImage: string;
  price: number;
  type: keyof typeof TypeHousing;
  rating: number;

  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
}
