import React from 'react';
import { Canvas } from '@react-three/fiber';
import { LayoutGroup } from 'framer-motion';
import { Lock } from 'lucide-react';

import { Terrain } from './components/Terrain';
import { Particles } from './components/Particles';
import { Header } from './components/Header';
import { Podium } from './components/Podium';
import { LeaderboardRow } from './components/LeaderboardRow';
import { AdminPanel } from './components/AdminPanel';
import { useTournamentStore } from './store';

const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 5, 12], fov: 50 }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        {/* Crisp Blue/White Lighting */}
        <color attach="background" args={['#F0F9FF']} />
        <fog attach="fog" args={['#F0F9FF', 8, 35]} />
        <ambientLight intensity={0.7} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#E0F2FE" />

        <Terrain />
        <Particles />
      </Canvas>
      {/* Dynamic Blue Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(240,249,255,0.8)_60%,rgba(186,230,253,0.3)_100%)]" />
    </div>
  );
};

export default function App() {
  const { getRankedParticipants, registerClick } = useTournamentStore();

  const ranked = getRankedParticipants();
  const podiumWinners = ranked.slice(0, 3);
  const runnersUp = ranked.slice(3);

  return (
    <div className="min-h-screen relative text-primary selection:bg-accent selection:text-white">
      <BackgroundCanvas />

      {/* Main Scrollable Content */}
      <main className="relative z-10 w-full min-h-screen pb-24">
        <Header />

        <div className="container mx-auto px-4 md:px-6">
          <Podium winners={podiumWinners} />

          {/* List Section */}
          <div className="max-w-6xl mx-auto mt-20 bg-white/70 backdrop-blur-xl border border-blue-100 rounded-2xl p-8 shadow-[0_8px_32px_-4px_rgba(0,62,155,0.05)]">
            <div className="flex justify-between text-lg uppercase tracking-widest text-accent font-bold mb-6 border-b border-blue-100 pb-4">
              <span className="w-24 text-center">Rank</span>
              <span className="flex-1 pl-8">Entrant</span>
              <span className="w-40 text-right pr-6">Score</span>
            </div>

            <LayoutGroup>
              <div className="flex flex-col">
                {runnersUp.map((participant, index) => (
                  <LeaderboardRow
                    key={participant.id}
                    participant={participant}
                    rank={index + 4}
                  />
                ))}
              </div>
            </LayoutGroup>
          </div>
        </div>
      </main>

      {/* Footer / Admin Trigger */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-4 px-6 flex justify-between items-end pointer-events-none">
        <div className="text-[10px] text-secondary font-mono">
          IEEE TEMS <br />
          ENGINEERED MOTION V.2.1
        </div>
        <button
          onClick={registerClick}
          className="pointer-events-auto p-2 opacity-30 hover:opacity-100 transition-opacity duration-300"
          aria-label="Admin Access"
        >
          <Lock size={14} className="text-accent" />
        </button>
      </footer>

      <AdminPanel />
    </div>
  );
}
