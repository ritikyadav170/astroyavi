"use client";

import React, { useMemo } from "react";
import { compatibilityData } from "../matchMaking";

export function RadarChart() {
  const radialPoints = useMemo(() => {
    const centerX = 220;
    const centerY = 220;
    const maxRadius = 150;
    const labels = compatibilityData.labels.length;

    return compatibilityData.values.map((value, index) => {
      const angle = (Math.PI * 2 * index) / labels - Math.PI / 2;
      const radius = (value / 8) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y };
    });
  }, []);

  const gridLevels = Array.from({ length: 5 }, (_, level) => level + 1);
  const labels = compatibilityData.labels;

  return (
    <div className="relative mx-auto h-[420px] w-[440px]">
      <svg viewBox="0 0 440 440" className="h-full w-full overflow-visible">
        {gridLevels.map((level) => {
          const radius = (level / 5) * 150;
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
          const x = 220 + Math.cos(angle) * 170;
          const y = 220 + Math.sin(angle) * 170;
          const textX = 220 + Math.cos(angle) * 200;
          const textY = 220 + Math.sin(angle) * 200;

          return (
            <g key={label}>
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
                fontSize="12"
                fill="#4a3020"
                fontWeight={500}
              >
                {label}
              </text>
            </g>
          );
        })}

        <polygon
          points={radialPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="#b3a3df"
          fillOpacity="0.4"
          stroke="#8a7ae3"
          strokeWidth="2"
        />
        {radialPoints.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="#8a7ae3"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}
