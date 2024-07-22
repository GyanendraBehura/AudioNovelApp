// src/components/Filters.tsx
import React from 'react';

const Filters: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <select className="border p-2 rounded">
        <option>Genre</option>
        {/* Add more genres */}
      </select>
      <select className="border p-2 rounded">
        <option>Author</option>
        {/* Add more authors */}
      </select>
      <select className="border p-2 rounded">
        <option>Rating</option>
        {/* Add more rating options */}
      </select>
    </div>
  );
};

export default Filters;
