import axios from 'axios';
import type {
  Candidate,
  CandidateWithScore,
  ExplainResponse,
  VerifyResponse,
  ChatMsg,
  ChatResponse,
  MatchRequest,
} from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// ── Candidates ────────────────────────────────────────────────────────────────

export async function getCandidates(state: string, constituency: string): Promise<Candidate[]> {
  const { data } = await api.get<Candidate[]>('/candidates', {
    params: { state, constituency },
  });
  return data;
}

// ── Match ─────────────────────────────────────────────────────────────────────

export async function postMatch(body: MatchRequest): Promise<CandidateWithScore[]> {
  const { data } = await api.post<CandidateWithScore[]>('/match', body);
  return data;
}

// ── AI: Explain ───────────────────────────────────────────────────────────────

export async function postExplain(topic: string): Promise<ExplainResponse> {
  const { data } = await api.post<ExplainResponse>('/ai/explain', { topic });
  return data;
}

// ── AI: Verify ────────────────────────────────────────────────────────────────

export async function postVerify(claim: string): Promise<VerifyResponse> {
  const { data } = await api.post<VerifyResponse>('/ai/verify', { claim });
  return data;
}

// ── AI: Chat ──────────────────────────────────────────────────────────────────

export async function postChat(message: string, history: ChatMsg[]): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>('/ai/chat', { message, history });
  return data;
}
