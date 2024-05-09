import React from 'react';

const Header = ({ title } : { title : String }) => {
  return (
    <header className="bg-gray-950 text-white text-center py-4">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
