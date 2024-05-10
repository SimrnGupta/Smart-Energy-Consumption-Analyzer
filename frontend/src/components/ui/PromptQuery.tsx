import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useState } from 'react';

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

{/* <div className="flex items-center rounded-md border border-gray-200 border-gray-300 bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:border-gray-800">
<SearchIcon className="h-5 w-5 text-gray-400" />
<Input
className="w-full border-0 focus:ring-0 dark:bg-gray-950 dark:text-gray-50"
placeholder="Search the Gemini API"
type="text"
/>
</div> */}

