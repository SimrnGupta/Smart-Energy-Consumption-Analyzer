import React from 'react';
import { GlobeIcon } from './Icons';

const Header = ({ title } : { title : String }) => {
  return (
    <header className="flex items-center justify-between bg-sky-100 text-gray-800 text-center py-4">
      <div className="flex-grow-0 ml-4">
        <GlobeIcon/>
      </div>
      
      <h1 className="text-3xl font-bold flex-grow text-center">{title}</h1>
    </header>
  );
};

export default Header;
