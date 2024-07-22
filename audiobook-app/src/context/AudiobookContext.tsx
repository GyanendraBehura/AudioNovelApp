// src/context/AudiobookContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Audiobook } from '../types'; // Import the Audiobook type

interface AudiobookContextType {
  selectedAudiobook: Audiobook | null;
  setSelectedAudiobook: (audiobook: Audiobook) => void;
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

export const useAudiobook = () => {
  const context = useContext(AudiobookContext);
  if (context === undefined) {
    throw new Error('useAudiobook must be used within an AudiobookProvider');
  }
  return context;
};
