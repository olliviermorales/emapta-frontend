import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-extrabold mb-4'>
        Country Information Finder
      </h1>
      <div className='flex flex-col gap-2 mb-4'>
        <p className='font-bold'>
          Type ALL or PART of a country name to search.
        </p>
        <p>Select a country from the list to see more details.</p>
      </div>
      <SearchBar onSelectCountry={setSelectedCountry} />
      {selectedCountry && (
        <CountryDetails key={selectedCountry.cca3} country={selectedCountry} />
      )}
    </div>
  );
};

export default App;
