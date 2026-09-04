export type ProofStatus = 'CONFIRMED' | 'INFERRED' | 'NOT_CONFIRMED';

export interface Chapter {
  id: string;
  title: string;
  category: 'FOUNDATION' | 'BASE GENERATION' | 'PEOPLE / PPL · MODULE' | 'FINAL PIPELINE' | 'EVIDENCE & REFERENCE';
  order: number;
  status: ProofStatus;
  content: React.ReactNode;
}