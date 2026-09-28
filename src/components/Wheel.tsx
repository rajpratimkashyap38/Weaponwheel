import { useMemo } from 'react';
import type { Weapon } from '@/types';

interface WheelProps {
  weapons: Weapon[];
  rotation: number;
  isSpinning: boolean;
}

export function Wheel({ weapons, rotation, isSpinning }: WheelProps) {
  const size = 500;
  const center = size / 2;
  const radius = center - 4;
  const segmentCount = weapons.length;
  const segmentAngle = (Math.PI * 2) / segmentCount;

  const segments = useMemo(() => {
    return weapons.map((weapon, i) => {
      const startAngle = i * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;
      const midAngle = startAngle + segmentAngle / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const largeArc = segmentAngle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      const labelRadius = radius * 0.62;
      const labelX = center + labelRadius * Math.cos(midAngle);
      const labelY = center + labelRadius * Math.sin(midAngle);
      const labelRotation = (midAngle * 180) / Math.PI;

      return { pathData, weapon, labelX, labelY, labelRotation };
    });
  }, [weapons, segmentAngle, center, radius]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full transition-shadow duration-300"
        style={{
          boxShadow: isSpinning
            ? '0 0 60px rgba(255,45,61,0.5), 0 0 120px rgba(255,140,0,0.25)'
            : '0 0 40px rgba(255,45,61,0.25), 0 0 80px rgba(255,140,0,0.12)',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transition: isSpinning ? 'none' : 'none',
            }}
          >
            {segments.map(({ pathData, weapon, labelX, labelY, labelRotation }, i) => (
              <g key={weapon.id}>
                <path
                  d={pathData}
                  fill={weapon.color}
                  stroke="#0a0a0f"
                  strokeWidth={2}
                  style={{
                    filter: `drop-shadow(0 0 4px ${weapon.color}66)`,
                  }}
                />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#ffffff"
                  fontSize={segmentCount > 8 ? 13 : 16}
                  fontWeight={700}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${labelRotation} ${labelX} ${labelY})`}
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {weapon.name.length > 16 ? `${weapon.name.slice(0, 14)}…` : weapon.name}
                </text>
                {i === 0 && null}
              </g>
            ))}
          </g>

          <circle cx={center} cy={center} r={28} fill="#0a0a0f" stroke="#ff2d3d" strokeWidth={3} />
          <circle cx={center} cy={center} r={12} fill="#ff8c00" />
        </svg>
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: -14 }}
      >
        <svg width="36" height="42" viewBox="0 0 36 42">
          <defs>
            <linearGradient id="pointerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8c00" />
              <stop offset="100%" stopColor="#ff2d3d" />
            </linearGradient>
          </defs>
          <path
            d="M 18 42 L 4 6 Q 4 0 10 0 L 26 0 Q 32 0 32 6 Z"
            fill="url(#pointerGrad)"
            stroke="#0a0a0f"
            strokeWidth={2}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,45,61,0.6))' }}
          />
        </svg>
      </div>
    </div>
  );
}
