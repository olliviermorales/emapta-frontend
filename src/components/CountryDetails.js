import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const CountryDetails = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [country]);

  if (isLoading) {
    return (
      <div className='mt-6 p-4 border border-gray-300 rounded flex justify-center'>
        <LoadingSpinner size='h-8 w-8' />
      </div>
    );
  }

  const { name, currencies, flags, coatOfArms, car } = country;

  const currency = currencies ? Object.values(currencies)[0] : null;

  return (
    <div className='mt-6 p-4 border border-gray-300 rounded'>
      <h2 className='text-xl font-bold mb-2'>{name.official}</h2>
      {currency && (
        <p>
          <strong>Currency:</strong> {currency.name} ({currency.symbol})
        </p>
      )}
      <div className='flex flex-wrap space-x-4 mt-4'>
        {flags && (
          <div>
            <img
              src={flags.svg || flags.png}
              alt={`${name.common} flag`}
              className='w-32 h-20 object-cover'
              loading='lazy'
            />
            <p className='text-center text-sm'>Flag</p>
          </div>
        )}
        {coatOfArms && (coatOfArms.svg || coatOfArms.png) && (
          <div>
            <img
              src={coatOfArms.svg || coatOfArms.png}
              alt={`${name.common} coat of arms`}
              className='w-32 h-20 object-cover'
              loading='lazy'
            />
            <p className='text-center text-sm'>Coat of Arms</p>
          </div>
        )}
      </div>
      {car && car.side && (
        <p className='mt-4'>
          <strong>Drives on the:</strong>{' '}
          {car.side.charAt(0).toUpperCase() + car.side.slice(1)}
        </p>
      )}
    </div>
  );
};

export default CountryDetails;
