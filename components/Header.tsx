import React from 'react';
import { motion, Variants } from 'framer-motion';

export const Header: React.FC = () => {
  const text = "PITCH PERFECT 2.0";
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const child: Variants = {
    hidden: { y: "120%", rotateX: 90, opacity: 0 },
    visible: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <header className="w-full py-16 flex flex-col items-center justify-center relative z-10">

      {/* Logo - Top Left */}
      <motion.img
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src="/logo.png"
        alt="Logo"
        className="absolute top-6 left-6 w-16 h-16 md:w-24 md:h-24 object-contain z-50 drop-shadow-md"
      />

      {/* Subtle Background Atmosphere Animation - Reduced Opacity */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-blue-400/10 blur-[100px] rounded-full -z-10 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1], // Significantly reduced from 0.3-0.5
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* IEEE TEMS Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 flex flex-col items-center"
      >
        <span className="text-accent font-sans font-black text-2xl md:text-3xl tracking-widest drop-shadow-sm">
          IEEE TEMS
        </span>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent mt-2" />
        <span className="text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2">
          Technology & Engineering Management Society
        </span>
      </motion.div>

      {/* Main Title - Character Wave Animation */}
      <motion.h1
        className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter text-primary drop-shadow-2xl flex flex-wrap justify-center overflow-visible px-4 text-center leading-[1.1]"
        style={{ textShadow: '0 4px 30px rgba(0, 40, 85, 0.2)' }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block origin-bottom"
            style={{
              marginRight: char === ' ' ? '0.4em' : '-0.02em',
              position: 'relative'
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -12, 0],
                color: ["#002855", "#00629B", "#002855"], // Primary -> Accent -> Primary
                textShadow: [
                  "0 4px 30px rgba(0, 40, 85, 0.2)",
                  "0 10px 40px rgba(0, 98, 155, 0.4)",
                  "0 4px 30px rgba(0, 40, 85, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5 + (index * 0.1), // Staggered wave start
              }}
            >
              {char === " " ? "" : char}
            </motion.span>
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle Line */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-8 flex items-center gap-4"
      >
        <div className="h-[2px] w-8 md:w-16 bg-accent" />
        <span className="text-primary font-sans font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
          Design Excellence Awards
        </span>
        <div className="h-[2px] w-8 md:w-16 bg-accent" />
      </motion.div>
    </header>
  );
};