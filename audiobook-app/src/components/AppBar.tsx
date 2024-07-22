import React from 'react';

const AppBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-red-600 text-white shadow-lg z-50 p-4">
      <div className="container mx-auto flex items-center">
        <h1 className="text-2xl font-bold">Audio Novels</h1>
      </div>
      <br />
    </header>
  );
};

export default AppBar;
