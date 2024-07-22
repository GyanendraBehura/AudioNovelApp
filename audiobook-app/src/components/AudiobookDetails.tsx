import React, { useState } from 'react';
import axios from 'axios';
import { useAudiobook } from '../context/AudiobookContext';
import ReviewFormModal from './ReviewFormModal';

const AudiobookDetails: React.FC = () => {
  const { selectedAudiobook, setSelectedAudiobook } = useAudiobook();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedAudiobook) return <p>No audiobook selected</p>;

  const handleReviewAdded = async (newReview: { user_name: string; review: string; rating: number }) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/audiobooks/${selectedAudiobook._id}/reviews`, newReview);
      const updatedReview = response.data;

      setSelectedAudiobook((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          reviews: [...(prev.reviews || []), updatedReview],
          rating: (prev.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, updatedReview.rating)) / (prev.reviews.length + 1),
        };
      });
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

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
      <button onClick={() => setIsModalOpen(true)} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Add Review
      </button>
      {isModalOpen && (
        <ReviewFormModal
          audiobookId={selectedAudiobook._id}
          onClose={() => setIsModalOpen(false)}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </div>
  );
};

export default AudiobookDetails;
