// src/components/AudiobookDetails.tsx
import React from 'react';
import { useAudiobook } from '../context/AudiobookContext';

const AudiobookDetails: React.FC = () => {
  const { selectedAudiobook } = useAudiobook();

  if (!selectedAudiobook) return <p>No audiobook selected</p>;

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <img
          src={selectedAudiobook.imageData}
          alt={selectedAudiobook.name}
          className="w-1/3 object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{selectedAudiobook.name}</h1>
      <h2 className="text-lg text-gray-700">{selectedAudiobook.author}</h2>
      <p className="mt-4">{selectedAudiobook.description}</p>
      <p className="mt-2"><strong>Genres:</strong> {selectedAudiobook.genres?.join(', ')}</p>
      <p className="mt-2"><strong>Rating:</strong> {selectedAudiobook.rating?.toFixed(1)}</p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Reviews:</h3>
        {selectedAudiobook.reviews?.map((review, index) => (
          <div key={index} className="mt-2 p-2 border rounded">
            <p><strong>{review.user_name}:</strong> {review.review}</p>
            <p className="text-sm text-yellow-500">Rating: {review.rating.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiobookDetails;
