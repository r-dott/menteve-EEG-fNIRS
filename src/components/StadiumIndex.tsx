import React from 'react';

interface StadiumIndexProps {
  value: number;
}

export const StadiumIndex: React.FC<StadiumIndexProps> = ({ value }) => {
  return (
    <div className="h-full bg-black rounded-lg flex flex-col items-center justify-center">
      <div className="text-4xl mb-4 text-white">BIS</div>
      <div className="text-9xl font-bold text-white">{Math.floor(value)}</div>
    </div>
  );
};