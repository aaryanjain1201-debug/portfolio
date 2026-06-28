"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "3D Modeling", level: 92 },
  { name: "Animation", level: 88 },
  { name: "Motion Design", level: 85 },
  { name: "AI Tools", level: 80 },
  { name: "Compositing", level: 82 },
  { name: "Texturing", level: 87 },
];

const centerX = 150;
const centerY = 150;
const maxRadius = 120;

function getPoint(index: number, level: number) {
  const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
  const radius = (level / 100) * maxRadius;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

function getPolygonPath(values: number[]) {
  return values
    .map((val, i) => {
      const point = getPoint(i, val);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export function RadarChart() {
  const dataPoints = skills.map((s) => s.level);
  const polygonPath = getPolygonPath(dataPoints);

  return (
    <div className="relative">
      <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
        {/* Background rings */}
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={getPolygonPath(Array(skills.length).fill(level))}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          points={polygonPath}
          fill="rgba(0, 217, 255, 0.1)"
          stroke="rgba(0, 217, 255, 0.6)"
          strokeWidth="2"
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Data points */}
        {skills.map((skill, i) => {
          const point = getPoint(i, skill.level);
          return (
            <motion.circle
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#00D9FF"
              stroke="#0A0E27"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const point = getPoint(i, 115);
          return (
            <text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white/50 text-[10px] font-medium"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
