import React, { useEffect, useRef, useState } from 'react';

export function Reveal({ children, delay = 0, direction = 'up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      default: return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransform(),
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        width: '100%',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
