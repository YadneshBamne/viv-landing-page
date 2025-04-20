// src/components/Preloader.jsx
import React from 'react';
import CountUp from '@/bits/Counterpreloader';

const Preloader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
      <CountUp
        from={0}
        to={100}
        separator=","
        direction="up"
        duration={1}
        className="text-6xl font-extrabold tracking-widest count-up-text"
      />
    </div>
  );
};

export default Preloader;
