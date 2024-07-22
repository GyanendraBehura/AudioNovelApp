import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAudiobook } from '../context/AudiobookContext';

interface Audiobook {
  _id: string;
  name: string;
  author: string;
  imageData?: string; // Optional because it may not always be present
  genres?: string[];
  rating?: number;
}

const AudiobookList: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const { setSelectedAudiobook } = useAudiobook();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/audiobooks');
        setAudiobooks(response.data);
        setFilteredAudiobooks(response.data); // Initialize filtered audiobooks with all audiobooks
      } catch (err) {
        console.error('Error fetching audiobooks:', err);
        setError('Error fetching audiobooks. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  useEffect(() => {
    let filtered = [...audiobooks]; // Create a new array to avoid mutating the original

    if (selectedGenre) {
      filtered = filtered.filter(audiobook =>
        audiobook.genres?.includes(selectedGenre)
      );
    }

    if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredAudiobooks(filtered);
  }, [selectedGenre, sortOption, audiobooks]);

  const handleCardClick = (audiobook: Audiobook) => {
    setSelectedAudiobook(audiobook);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="mr-4 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Love">Love</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
        </select>
        <label className="mr-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">None</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredAudiobooks.map((book) => (
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
            <p className="text-sm">Rating: {book.rating?.toFixed(1)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudiobookList;
