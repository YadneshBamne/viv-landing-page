// src/components/CountUp.jsx
import React, { useEffect, useState } from 'react';

const CountUp = ({ from = 0, to = 100, duration = 1, className = '' }) => {
  const [count, setCount] = useState(from);
  const increment = (to - from) / (duration * 60); // 60 frames per second

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = from + increment * frame;
      if (progress >= to) {
        setCount(to);
        clearInterval(interval);
      } else {
        setCount(Math.floor(progress));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return <div className={className}>{count}%</div>;
};

export default CountUp;
