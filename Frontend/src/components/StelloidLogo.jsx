// Official Stelloid 4x4 Dot Matrix Logo from stelloid.io
export function StelloidLogoIcon({ size = 26, isDark = false, className = '' }) {
  const inactiveColor = isDark ? '#1e293b' : 'rgba(30, 41, 59, 0.18)';

  // 4x4 Matrix pattern matching https://stelloid.io
  const dots = [
    // Row 0
    { r: 0, c: 0, color: inactiveColor },
    { r: 0, c: 1, color: '#4f6df5' },
    { r: 0, c: 2, color: '#7b8ffa' },
    { r: 0, c: 3, color: '#95a4fa' },
    // Row 1
    { r: 1, c: 0, color: inactiveColor },
    { r: 1, c: 1, color: inactiveColor },
    { r: 1, c: 2, color: '#22e49c' },
    { r: 1, c: 3, color: '#1ac5db' },
    // Row 2
    { r: 2, c: 0, color: inactiveColor },
    { r: 2, c: 1, color: '#22e49c' },
    { r: 2, c: 2, color: inactiveColor },
    { r: 2, c: 3, color: '#1ac5db' },
    // Row 3
    { r: 3, c: 0, color: '#fdb03a' },
    { r: 3, c: 1, color: inactiveColor },
    { r: 3, c: 2, color: inactiveColor },
    { r: 3, c: 3, color: inactiveColor }
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={4 + d.c * 10}
          cy={4 + d.r * 10}
          r={3.8}
          fill={d.color}
        />
      ))}
    </svg>
  );
}

export default StelloidLogoIcon;
