export type TimelineStatus = 'done' | 'current' | 'upcoming';

export type TimelinePhase = {
  id: string;
  title: string;
  detail: string;
  date: string | null;
  status: TimelineStatus;
};

export const timeline: TimelinePhase[] = [
  {
    id: 'registration-opens',
    title: 'Registration opens',
    detail: 'Teams apply and must be accepted before participating.',
    date: null,
    status: 'upcoming',
  },
  {
    id: 'development',
    title: 'Development phase and dev-set release',
    detail: 'A development set is released on Hugging Face for local evaluation.',
    date: null,
    status: 'upcoming',
  },
  {
    id: 'submission',
    title: 'Final submission deadline',
    detail: 'Each team designates one frozen checkpoint per track.',
    date: null,
    status: 'upcoming',
  },
  {
    id: 'results',
    title: 'Results and technical report',
    detail: 'Hidden-set scores are released and the technical report is prepared.',
    date: null,
    status: 'upcoming',
  },
];

export const timelineNotes = {
  extraMilestones:
    'Registration close, hidden-set score release, and a dispute window will be dated on this rail when the schedule is set.',
  officeHours:
    'Organizers hold 30-minute weekly office hours during the development phase. Clarifications that affect the competition go to all registered teams.',
};
