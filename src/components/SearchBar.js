import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { useDebounce } from 'use-debounce';

const SearchBar = ({ onSelectCountry }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery] = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredCountries = useMemo(() => {
    if (debouncedQuery.length === 0) {
      return [];
    }
    return suggestions.filter((country) =>
      country.name.common.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [suggestions, debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setSuggestions([]);
      setError('');
      setIsLoading(false);
      return;
    }

    const fetchCountries = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${debouncedQuery}`
        );

        if (response.data.length === 0) {
          setSuggestions([]);
          setError('No results found.');
        } else {
          setSuggestions(response.data);
        }
      } catch (error) {
        setSuggestions([]);
        setError('No results found.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [debouncedQuery]);

  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search for a country...'
        aria-label='Search for a country'
        className='w-full p-2 border border-gray-300 rounded'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && (
        <div className='absolute right-2 top-2'>
          <LoadingSpinner />
        </div>
      )}
      {error && <p className='text-xs text-red-500'>{error}</p>}
      {filteredCountries.length > 0 && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto'>
          {filteredCountries.map((country) => (
            <li
              key={country.cca3}
              className='p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between'
              onClick={() => {
                onSelectCountry(country);
                setQuery('');
                setSuggestions([]);
                setError('');
              }}
            >
              <div>
                <span className='font-semibold'>{country.name.common}</span>
                <span className='text-sm text-gray-500'>
                  {' '}
                  ({country.name.official})
                </span>
              </div>
              {country.flags && (
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`${country.name.common} flag`}
                  className='w-6 h-4 object-cover ml-2'
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
