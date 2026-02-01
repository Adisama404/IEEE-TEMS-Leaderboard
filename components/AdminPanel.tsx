import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Plus } from 'lucide-react';
import { useTournamentStore } from '../store';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminOpen, 
    closeAdmin, 
    participants, 
    updateScore, 
    updateName,
    updateOrganization,
    addParticipant,
    removeParticipant
  } = useTournamentStore();

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-x-0 bottom-0 h-[70vh] md:h-[60vh] bg-white shadow-2xl z-50 rounded-t-3xl overflow-hidden border-t border-slate-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-slate-50 border-b border-slate-100">
          <div>
            <h2 className="text-primary font-serif font-bold italic text-2xl">The Vault</h2>
            <p className="text-secondary text-sm">Adjust scores and details to update global rankings immediately.</p>
          </div>
          <button 
            onClick={closeAdmin}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-3">
          {participants.map((p) => (
            <div key={p.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors bg-white hover:shadow-sm group relative">
              <span className="font-mono text-slate-300 text-xs hidden md:block w-8 shrink-0 truncate" title={p.id}>{p.id.length > 4 ? `..${p.id.slice(-3)}` : p.id}</span>
              
              <div className="flex-1 w-full">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Entrant Name</label>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updateName(p.id, e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-medium py-1 text-primary text-sm md:text-base transition-colors"
                />
              </div>

              <div className="flex-1 w-full">
                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Team / Organization</label>
                 <input
                  type="text"
                  value={p.organization}
                  onChange={(e) => updateOrganization(p.id, e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-medium py-1 text-secondary text-sm md:text-base transition-colors"
                />
              </div>

              <div className="w-full md:w-32">
                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Score</label>
                 <input
                  type="number"
                  step="0.01"
                  value={p.score}
                  onChange={(e) => updateScore(p.id, parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent border-b border-slate-200 focus:border-primary outline-none font-mono font-bold py-1 md:text-right text-primary text-lg transition-colors"
                />
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeParticipant(p.id)}
                className="absolute top-2 right-2 md:static p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Remove Participant"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add Participant Button */}
          <button
            onClick={addParticipant}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all group mt-6"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Add New Entrant</span>
          </button>

          <div className="h-4"></div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={closeAdmin}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-accent transition-colors shadow-lg hover:shadow-xl font-medium tracking-wide text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Updates</span>
          </button>
        </div>
      </motion.div>
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={closeAdmin}
        className="fixed inset-0 bg-slate-900 z-40 backdrop-blur-sm"
      />
    </AnimatePresence>
  );
};
