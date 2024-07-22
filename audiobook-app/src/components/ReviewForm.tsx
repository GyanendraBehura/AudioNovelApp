// src/components/ReviewForm.tsx
import React, { useState } from 'react';

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2">
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </label>
      <label className="block mb-2">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
