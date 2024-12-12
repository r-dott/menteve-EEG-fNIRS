import React from 'react';

interface FnirsIndexProps {
  value: number;
}

export const FnirsIndex: React.FC<FnirsIndexProps> = ({ value }) => {
  return (
    <div className="h-full bg-black rounded-lg flex flex-col items-center justify-center">
      <div className="text-4xl mb-4 text-white"></div>
      <div className="text-9xl font-bold text-white">{Math.floor(value)}</div>
    </div>
  );
};