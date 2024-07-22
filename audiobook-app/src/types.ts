// src/types.ts
export interface Audiobook {
    _id: string;
    name: string;
    author: string;
    imageData?: string; // Optional because it may not always be present
    description?: string;
    genres?: string[];
    rating?: number;
    reviews?: {
      user_name: string;
      review: string;
      rating: number;
    }[];
  }
  