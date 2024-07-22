// src/context/AudiobookContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Audiobook {
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

interface AudiobookContextType {
  selectedAudiobook: Audiobook | null;
  setSelectedAudiobook: React.Dispatch<React.SetStateAction<Audiobook | null>>;
}

const AudiobookContext = createContext<AudiobookContextType | undefined>(undefined);

export const AudiobookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAudiobook, setSelectedAudiobook] = useState<Audiobook | null>(null);

  return (
    <AudiobookContext.Provider value={{ selectedAudiobook, setSelectedAudiobook }}>
      {children}
    </AudiobookContext.Provider>
  );
};

export const useAudiobook = (): AudiobookContextType => {
  const context = useContext(AudiobookContext);
  if (!context) {
    throw new Error('useAudiobook must be used within an AudiobookProvider');
  }
  return context;
};
