import { SearchIcon } from 'lucide-react';
import React from 'react';

export const PromptQuery = ({ searchQuery, handleInputChange, handleSubmit } : { searchQuery : string, handleInputChange : any, handleSubmit : any}) => {
  return (
    <div className="flex items-center rounded-md border border-gray-200 bg-sky-100 px-4 py-2 shadow-sm">
      <SearchIcon className="h-5 w-5 text-gray-500" />
      <input
        className="w-full bg-sky-100 text-gray-600 px-4 py-2 outline-none"
        placeholder=" Search the Gemini API"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={event => event.key === 'Enter' && handleSubmit(event)}
      />
    </div>
  );
};

