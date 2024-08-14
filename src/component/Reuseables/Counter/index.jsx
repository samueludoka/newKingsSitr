import React, { useEffect, useState } from 'react';

const Counter = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / (end - start)));

        const timer = setInterval(() => {
            setCount((prevCount) => {
                if ((increment > 0 && prevCount >= end) || (increment < 0 && prevCount <= end)) {
                    clearInterval(timer);
                    return end;
                }
                return prevCount + increment;
            });
        }, stepTime);

        return () => clearInterval(timer);
    }, [start, end, duration]);

    return (
        <div className="counter">
            {count}
        </div>
    );
};

export default Counter;
