import { create } from 'zustand';
import { Participant } from './types';

interface TournamentStore {
  participants: Participant[];
  isAdminOpen: boolean;
  unlockCounter: number;
  lastClick: number;
  
  // Actions
  updateScore: (id: string, newScore: number) => void;
  updateName: (id: string, newName: string) => void;
  updateOrganization: (id: string, newOrg: string) => void;
  addParticipant: () => void;
  removeParticipant: (id: string) => void;
  registerClick: () => void;
  closeAdmin: () => void;
  getRankedParticipants: () => Participant[];
}

const INITIAL_DATA: Participant[] = [
  { id: '1', name: 'Elena Vossen', organization: 'Studio B', score: 98.5 },
  { id: '2', name: 'Marcus Chen', organization: 'Vertex Group', score: 96.2 },
  { id: '3', name: 'Sarah Miller', organization: 'Foundations', score: 94.8 },
  { id: '4', name: 'David Okafor', organization: 'Nexis Arch', score: 91.0 },
  { id: '5', name: 'Priya Patel', organization: 'Flux Design', score: 89.5 },
  { id: '6', name: 'James Wilson', organization: 'Linear', score: 88.2 },
  { id: '7', name: 'Coco Laurent', organization: 'Bureau 42', score: 87.4 },
  { id: '8', name: 'Alex H', organization: 'Solo', score: 85.0 },
  { id: '9', name: 'Team Alpha', organization: 'University X', score: 82.1 },
  { id: '10', name: 'John D', organization: 'Drafts', score: 79.5 },
];

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  participants: INITIAL_DATA,
  isAdminOpen: false,
  unlockCounter: 0,
  lastClick: 0,

  getRankedParticipants: () => {
    return [...get().participants].sort((a, b) => b.score - a.score);
  },

  updateScore: (id, newScore) => set((state) => ({
    participants: state.participants.map(p => 
      p.id === id ? { ...p, score: newScore } : p
    )
  })),

  updateName: (id, newName) => set((state) => ({
    participants: state.participants.map(p => 
      p.id === id ? { ...p, name: newName } : p
    )
  })),

  updateOrganization: (id, newOrg) => set((state) => ({
    participants: state.participants.map(p => 
      p.id === id ? { ...p, organization: newOrg } : p
    )
  })),

  addParticipant: () => set((state) => {
    const newId = Date.now().toString();
    return {
      participants: [
        ...state.participants,
        { id: newId, name: "New Entrant", organization: "Organization", score: 0 }
      ]
    };
  }),

  removeParticipant: (id) => set((state) => ({
    participants: state.participants.filter(p => p.id !== id)
  })),

  registerClick: () => set({ isAdminOpen: true }),

  closeAdmin: () => set({ isAdminOpen: false })
}));
