

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Review = {
  id: number;
  date: string;
  rating: number;
  comment: string;
  user: User;
}
