"use client";

import React, { useMemo } from "react";

interface RadarChartProps {
  labels?: string[];
  values?: number[];
}

const DEFAULT_LABELS = [
  "Nature 5/6",
  "Love 3/4",
  "Health 8/8",
  "Mentality 4/5",
  "Compatibility 7/7",
  "Dominance 2/2",
  "Destiny 3/3",
  "Work 1/1",
];

const DEFAULT_VALUES = [8.3, 7.5, 10, 8, 10, 10, 10, 10];

export function RadarChart({
  labels = DEFAULT_LABELS,
  values = DEFAULT_VALUES,
}: RadarChartProps) {
  const radialPoints = useMemo(() => {
    const centerX = 220;
    const centerY = 220;
    const maxRadius = 140;
    const count = labels.length;

    return values.map((val, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const normalizedValue = Math.min(10, Math.max(0, val));
      const radius = (normalizedValue / 10) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y };
    });
  }, [labels, values]);

  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[440px]">
      <svg viewBox="0 0 440 440" className="h-full w-full overflow-visible">
        {gridLevels.map((level) => {
          const radius = (level / 5) * 140;
          const points = Array.from({ length: labels.length }, (_, index) => {
            const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
            const x = 220 + Math.cos(angle) * radius;
            const y = 220 + Math.sin(angle) * radius;
            return `${x},${y}`;
          }).join(" ");

          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#d8d0c2"
              strokeDasharray="4 4"
            />
          );
        })}

        {labels.map((label, index) => {
          const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
          const x = 220 + Math.cos(angle) * 145;
          const y = 220 + Math.sin(angle) * 145;
          const textX = 220 + Math.cos(angle) * 175;
          const textY = 220 + Math.sin(angle) * 175;

          return (
            <g key={`${label}-${index}`}>
              <line
                x1={220}
                y1={220}
                x2={x}
                y2={y}
                stroke="#d8d0c2"
                strokeDasharray="4 4"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="#2b1810"
                fontWeight={600}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <polygon
          points={radialPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="#1c5b49"
          fillOpacity="0.25"
          stroke="#1c5b49"
          strokeWidth="2.5"
        />

        {/* Data Points */}
        {radialPoints.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={4.5}
            fill="#801c10"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}
