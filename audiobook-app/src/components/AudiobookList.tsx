// src/components/AudiobookList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAudiobook } from '../context/AudiobookContext';

interface Audiobook {
  _id: string;
  name: string;
  author: string;
  imageData?: string; // Optional because it may not always be present
}

const AudiobookList: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedAudiobook } = useAudiobook();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/audiobooks');
        console.log('Fetched audiobooks:', response.data); // Log fetched data
        setAudiobooks(response.data);
      } catch (err) {
        console.error('Error fetching audiobooks:', err);
        setError('Error fetching audiobooks. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  const handleCardClick = (audiobook: Audiobook) => {
    setSelectedAudiobook(audiobook);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-6 gap-4">
      {audiobooks.map((book) => (
        <Link
          to={`/audiobooks/${book._id}`}
          key={book._id}
          className="p-4 border rounded"
          onClick={() => handleCardClick(book)}
        >
          <img
            src={book.imageData} // Use the base64 image data
            alt={book.name}
            className="h-50 w-full object-cover"
          />
          <h3 className="mt-2 text-lg font-bold">{book.name}</h3>
          <p className="text-sm">{book.author}</p>
        </Link>
      ))}
    </div>
  );
};

export default AudiobookList;
