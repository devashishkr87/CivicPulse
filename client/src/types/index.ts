// ── Domain types ─────────────────────────────────────────────────────────────

export interface Candidate {
  _id: string;
  name: string;
  party: string;
  constituency: string;
  state: string;
  education: string;
  criminal_cases: number;
  /** Stored as integer lakhs (e.g. 150 = ₹1.5 crore) */
  assets: number;
  /** Stored as integer lakhs */
  liabilities: number;
  profile_image: string; // empty string = use generated avatar
}

export interface CandidateScores {
  economy: number; // 1–5
  education: number; // 1–5
  healthcare: number; // 1–5
  environment: number; // 1–5
}

export interface CandidatePositions {
  _id: string;
  candidate_id: string;
  scores: CandidateScores;
}

export interface ManifestoSummary {
  economy: string;
  education: string;
  healthcare: string;
}

export interface Manifesto {
  _id: string;
  party: string;
  summary: ManifestoSummary;
}

export interface ScoreBreakdown {
  economy: number;
  education: number;
  healthcare: number;
  environment: number;
}

/** Candidate enriched by the /match endpoint */
export interface CandidateWithScore extends Candidate {
  positions: CandidateScores;
  manifesto: ManifestoSummary;
  matchScore: number; // 0–100, integer
  breakdown: ScoreBreakdown; // per-category weighted score (not percentage)
}

// ── Request / Response types ──────────────────────────────────────────────────

export interface UserPriorities {
  economy: number; // 1–5
  education: number; // 1–5
  healthcare: number; // 1–5
  environment: number; // 1–5
}

export interface MatchRequest {
  state: string;
  constituency: string;
  priorities: UserPriorities;
}

export interface ApiError {
  error: true;
  message: string;
  code: string;
}

// ── AI types ──────────────────────────────────────────────────────────────────

export interface ExplainResponse {
  explanation: string; // ≤60 words
  example: string; // ≤30 words (may be empty string if not applicable)
}

export interface VerifyResponse {
  verdict: 'Likely True' | 'Likely False' | 'Unverified';
  confidence: 'High' | 'Medium' | 'Low';
  explanation: string; // ≤50 words
}

export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO 8601
}

export interface ChatResponse {
  reply: string;
}

// ── Journey store type (client only) ─────────────────────────────────────────

export type JourneyStage = 1 | 2 | 3 | 4;

export interface EligibilityResult {
  eligible: boolean;
  message: string;
}

export interface JourneyState {
  stage: JourneyStage;
  eligibility: EligibilityResult | null;
  priorities: UserPriorities;
  // Actions
  completeStage: (s: JourneyStage) => void;
  setEligibility: (r: EligibilityResult) => void;
  setPriorities: (p: UserPriorities) => void;
  reset: () => void;
}
