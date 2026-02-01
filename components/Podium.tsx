import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface PodiumProps {
  winners: Participant[];
}

/**
 * ------------------------------------------------------------------
 * VISUAL EFFECTS COMPONENTS
 * ------------------------------------------------------------------
 */

/* 1. THE DIVINE SPOTLIGHT */
const Spotlight: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.6 }}
    transition={{ delay: delay + 0.5, duration: 1.5 }}
    className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[300px] h-[500px] pointer-events-none z-0"
    style={{
      background: 'conic-gradient(from 180deg at 50% 0%, transparent 45%, rgba(255,255,255,0.15) 48%, rgba(212,175,55,0.2) 50%, rgba(255,255,255,0.15) 52%, transparent 55%)',
      filter: 'blur(12px)',
      maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
    }}
  >
    {/* Core Beam */}
    <div className="absolute inset-0 bg-gradient-to-b from-amber-100/10 to-transparent w-full h-full" />
  </motion.div>
);

/* 2. CRYSTAL SHIMMER EFFECT */
const CrystalShimmer: React.FC = () => (
  <motion.div
    className="absolute inset-0 z-20 pointer-events-none"
    initial={{ x: '-150%' }}
    animate={{ x: '150%' }}
    transition={{
      repeat: Infinity,
      duration: 3.5,
      repeatDelay: 2.5,
      ease: "easeInOut"
    }}
  >
    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
  </motion.div>
);

/* 3. FLOATING SPARKLES */
const Sparkles: React.FC<{ color: string }> = ({ color }) => {
  // Generate random positions for sparkles
  const sparkles = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
  }, [color]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]"
          style={{ left: s.left, top: '100%', backgroundColor: color }}
          animate={{
            y: [0, -120],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};


/**
 * GLASS CROWN (2D SVG)
 * High-fidelity, etched glass aesthetic with specific gradient fills.
 */
interface GlassCrownProps {
  rank: 1 | 2 | 3;
  className?: string;
}

const GlassCrown: React.FC<GlassCrownProps> = ({ rank, className }) => {
  const isGold = rank === 1;
  const isSilver = rank === 2;

  let colorStart, colorBorder, shadowClass;

  if (isGold) {
    colorStart = '#D4AF37';
    colorBorder = '#FCD34D'; // Lighter gold border
    shadowClass = 'drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]';
  } else if (isSilver) {
    colorStart = '#E2E8F0';
    colorBorder = '#F1F5F9';
    shadowClass = 'drop-shadow-[0_0_15px_rgba(148,163,184,0.6)]';
  } else {
    colorStart = '#B45309';
    colorBorder = '#FDBA74';
    shadowClass = 'drop-shadow-[0_0_15px_rgba(180,83,9,0.5)]';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: [-4, 4, -4] // Gentle vertical float
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`pointer-events-none ${className}`}
    >
      <svg viewBox="0 0 24 24" className={`w-full h-full ${shadowClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad-${rank}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorStart} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Symmetrical Regal Crown */}
        <path
          d="M2 18H22L19 6L14 11L12 2L10 11L5 6L2 18Z"
          fill={`url(#grad-${rank})`}
          stroke={colorBorder}
          strokeWidth="0.75"
          strokeLinejoin="round"
        />

        {/* Central Jewel */}
        <circle cx="12" cy="2" r="1.5" fill="white" className="animate-pulse" />

        {/* Decorative Lines */}
        <path
          d="M12 4V18 M8 11L12 15L16 11"
          stroke={colorBorder}
          strokeWidth="0.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Base Highlight */}
        <path d="M3 16.5H21" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
};

const Pillar: React.FC<{
  participant: Participant;
  rank: 1 | 2 | 3;
  delay: number;
  height: string;
}> = ({ participant, rank, delay, height }) => {
  const isGold = rank === 1;
  const isSilver = rank === 2;

  const glowColor = isGold
    ? 'bg-amber-400'
    : isSilver
      ? 'bg-slate-300'
      : 'bg-orange-800/20'; // Reduced intensity for 3rd place

  const textColor = isGold
    ? 'text-[#B49226]' // Darker gold for better contrast
    : isSilver
      ? 'text-[#475569]'
      : 'text-[#9A3412]';

  // More crystalline borders
  const accentBorder = isGold
    ? 'border-amber-200/60'
    : isSilver
      ? 'border-slate-300/60'
      : 'border-orange-200/60';

  const topGradient = isGold
    ? 'via-amber-300/50'
    : isSilver
      ? 'via-blue-200/50'
      : 'via-orange-400/50';

  const outlineStyle = isGold
    ? 'shadow-[0_0_50px_-12px_rgba(251,191,36,0.6),inset_0_0_30px_rgba(251,191,36,0.2)] ring-1 ring-amber-300/40'
    : isSilver
      ? 'shadow-[0_0_50px_-12px_rgba(148,163,184,0.5),inset_0_0_30px_rgba(148,163,184,0.2)] ring-1 ring-blue-200/40'
      : 'shadow-[0_0_50px_-12px_rgba(154,52,18,0.4),inset_0_0_30px_rgba(154,52,18,0.1)] ring-1 ring-orange-800/30';

  const roman = rank === 1 ? 'I' : rank === 2 ? 'II' : 'III';

  return (
    <div className={`relative flex flex-col justify-end items-center w-full max-w-[320px] group ${rank === 1 ? 'z-10 order-2 h-[750px]' : rank === 2 ? 'order-1 h-[650px]' : 'order-3 h-[580px]'}`}>

      {/* 1. Divine Spotlight (Rank 1 Only) */}
      {isGold && <Spotlight delay={delay} />}

      {/* 2. Floor Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.6, 0.3, 0.7, 0.4],
          scale: [0.5, 1.25, 0.9, 1.2, 1]
        }}
        transition={{
          delay: delay,
          duration: 3,
          times: [0, 0.2, 0.4, 0.7, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[100px] blur-[90px] rounded-full transition-opacity duration-700 ${glowColor}`}
      />

      {/* 3. Floating User Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2, duration: 0.8 }}
        className="mb-8 text-center relative z-20 flex flex-col items-center"
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Floating Crown (Centered Above) */}
          <GlassCrown
            rank={rank}
            className={`mb-4 ${rank === 1 ? 'w-28 h-28' : 'w-20 h-20'}`}
          />

          <h3 className="text-primary font-bold text-3xl md:text-5xl tracking-tight leading-none drop-shadow-md whitespace-nowrap px-4">
            {participant.name}
          </h3>

          <p className="text-accent text-sm font-bold uppercase tracking-[0.25em] mt-3 backdrop-blur-md bg-white/40 px-4 py-1.5 rounded-md border border-white/50 shadow-sm">
            {participant.organization}
          </p>
        </div>

        {/* Score Badge */}
        <div className={`mt-6 inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] border ${accentBorder} ring-4 ring-white/30`}>
          <span className={`font-mono font-black text-3xl tracking-tight ${textColor}`}>
            {participant.score.toFixed(2)}
          </span>
        </div>
      </motion.div>

      {/* 4. The Crystal Pillar */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{
          height: ["0%", "15%", "8%", height]
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.15, 0.25, 1],
          ease: ["easeOut", "easeIn", [0.22, 1, 0.36, 1]],
          delay: delay,
        }}
        className={`w-full relative rounded-t-lg backdrop-blur-2xl bg-gradient-to-b from-white/90 via-white/50 to-white/10 border-t-2 border-x border-white ${outlineStyle} overflow-hidden`}
      >
        {/* Shimmer Effect */}
        <CrystalShimmer />

        {/* Floating Sparkles inside the glass */}
        {isGold && <Sparkles color="#FCD34D" />}
        {isSilver && <Sparkles color="#E2E8F0" />}

        {/* Top Highlight/Rim */}
        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent ${topGradient} to-transparent blur-[2px] opacity-90`} />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-white mix-blend-overlay" />

        {/* Roman Numeral Background */}
        <div className={`absolute left-0 right-0 flex justify-center items-center pointer-events-none select-none ${rank === 3 ? 'top-14' : 'top-20'}`}>
          <span className={`font-serif font-black italic leading-none ${textColor} opacity-[0.5] scale-y-125 tracking-tighter mix-blend-multiply ${rank === 3 ? 'text-[130px]' : 'text-[180px]'}`}>
            {roman}
          </span>
        </div>

        {/* Tech Markings */}
        <div className="absolute inset-0 p-6 pointer-events-none opacity-60">
          {/* Left Line */}
          <div className="absolute top-8 bottom-8 left-6 w-[1px] bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />

          {/* Right Ruler */}
          <div className="absolute top-8 bottom-8 right-6 w-[1px] bg-gradient-to-b from-transparent via-blue-900/10 to-transparent flex flex-col justify-around items-end">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-[1px] bg-blue-900/20 ${i % 4 === 0 ? 'w-4' : 'w-2'}`} />
            ))}
          </div>

          {/* Rank Label */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="text-[0.6rem] uppercase tracking-[0.5em] text-blue-900/40 font-mono">
              rank_{rank < 10 ? `0${rank}` : rank}
            </span>
          </div>
        </div>

        {/* Glass Surface Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 skew-x-12 opacity-50" />
      </motion.div>
    </div>
  );
};

export const Podium: React.FC<PodiumProps> = ({ winners }) => {
  const first = winners[0];
  const second = winners[1];
  const third = winners[2];

  if (!first) return null;

  return (
    <div className="w-full max-w-7xl mx-auto flex items-end justify-center gap-4 md:gap-8 px-4 mb-24 perspective-[1000px]">
      {second && <Pillar participant={second} rank={2} delay={0.2} height="50%" />}
      <Pillar participant={first} rank={1} delay={0} height="65%" />
      {third && <Pillar participant={third} rank={3} delay={0.4} height="40%" />}
    </div>
  );
};
