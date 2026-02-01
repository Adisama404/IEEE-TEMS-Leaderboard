import React from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface RowProps {
  participant: Participant;
  rank: number;
}

export const LeaderboardRow: React.FC<RowProps> = ({ participant, rank }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex items-center py-6 border-b border-blue-100/50 hover:bg-blue-50/40 transition-colors duration-300"
    >
      {/* Rank */}
      <div className="w-24 font-serif text-4xl text-accent italic font-bold text-center group-hover:scale-110 transition-transform duration-300 opacity-60 group-hover:opacity-100">
        {rank < 10 ? `0${rank}` : rank}
      </div>

      {/* Info */}
      <div className="flex-1 pl-8">
        <h4 className="text-primary font-bold text-2xl tracking-tight group-hover:translate-x-1 transition-transform">{participant.name}</h4>
        <span className="text-secondary text-sm uppercase tracking-wider font-semibold">{participant.organization}</span>
      </div>

      {/* Score */}
      <div className="w-40 text-right pr-6">
        <span className="font-mono text-2xl text-primary font-bold bg-white/50 px-3 py-2 rounded border border-transparent group-hover:border-blue-200 transition-colors">
          {participant.score.toFixed(2)}
        </span>
      </div>

      {/* Indicator Line (Hover effect) */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
    </motion.div>
  );
};
