// src/components/ReviewFormModal.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ReviewFormModalProps {
  audiobookId: string;
  onClose: () => void;
  onReviewAdded: (review: { user_name: string; review: string; rating: number }) => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ audiobookId, onClose, onReviewAdded }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/audiobooks/${audiobookId}/reviews`, {
        user_name: userName,
        rating,
        review,
      });
      onReviewAdded(response.data);
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="user_name">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="rating">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="review">
              Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 p-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
