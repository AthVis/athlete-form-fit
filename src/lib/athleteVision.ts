import { supabase } from "@/integrations/supabase/client";
import type { SportType } from "@/lib/sports";
import { EXPERIENCE_LEVELS } from "@/lib/sports";

export interface TrainingSession {
  date: string;
  sport: string;
  duration_min: number;
  rpe_1_10: number;
  distance_km?: number;
  avg_hr_bpm?: number;
  sleep_hours?: number;
  hrv_ms?: number;
  soreness_1_10?: number;
  notes?: string;
}

export interface AnalyzeResponse {
  tl_7d: number;
  tl_14d: number;
  tl7_norm: number;
  avg_sleep7: number;
  avg_soreness7: number;
  avg_rpe7: number;
  recovery_index: number;
  injury_risk: number;
  today: string;
}

export interface DayPlan {
  day: string;
  session: string;
  focus: string;
}

export interface PlanResponse {
  plan_type: string;
  reason: string;
  week_plan: DayPlan[];
  metrics: AnalyzeResponse;
  requested_goal?: string;
  effective_goal?: string;
  adjustments?: string[];
  profile_snapshot?: UserProfile;
  feedback_snapshot?: WeeklyFeedback;
}

export interface UserProfile {
  sport: SportType;
  primaryGoal: string;
  experienceLevel: (typeof EXPERIENCE_LEVELS)[number];
  availableDays: string[];
  focusNotes?: string;
}

export interface WeeklyFeedback {
  date: string;
  fatigue: number;
  pain: number;
  difficulty: "too-easy" | "just-right" | "too-hard";
  notes?: string;
}

export async function analyzeTraining(
  today: string,
  sessions: TrainingSession[]
): Promise<AnalyzeResponse> {
  const { data, error } = await supabase.functions.invoke('analyze', {
    body: { today, sessions }
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function generatePlan(
  today: string,
  sport: string,
  goal: string,
  sessions: TrainingSession[]
): Promise<PlanResponse> {
  const { data, error } = await supabase.functions.invoke('plan', {
    body: { today, sport, goal, sessions }
  });

  if (error) throw new Error(error.message);
  return data;
}

// Local storage helpers
const SESSIONS_KEY = 'athletevision_sessions';
const METRICS_KEY = 'athletevision_metrics';
const PLAN_KEY = 'athletevision_plan';
const PROFILE_KEY = 'athletevision_profile';
const FEEDBACK_KEY = 'athletevision_feedback';

export function saveSessions(sessions: TrainingSession[]): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function loadSessions(): TrainingSession[] {
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveMetrics(metrics: AnalyzeResponse): void {
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

export function loadMetrics(): AnalyzeResponse | null {
  const data = localStorage.getItem(METRICS_KEY);
  return data ? JSON.parse(data) : null;
}

export function savePlan(plan: PlanResponse): void {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function loadPlan(): PlanResponse | null {
  const data = localStorage.getItem(PLAN_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadUserProfile(): UserProfile | null {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveFeedbackEntry(entry: WeeklyFeedback): void {
  const existing = loadFeedbackHistory();
  const updated = [entry, ...existing];
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
}

export function loadFeedbackHistory(): WeeklyFeedback[] {
  const data = localStorage.getItem(FEEDBACK_KEY);
  return data ? JSON.parse(data) : [];
}

export function loadLatestFeedback(): WeeklyFeedback | null {
  const history = loadFeedbackHistory();
  return history.length > 0 ? history[0] : null;
}

// CSV parsing
export function parseCSV(csvText: string): TrainingSession[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV must have header and at least one data row');

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const sessions: TrainingSession[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const session: any = {};

    headers.forEach((header, index) => {
      const value = values[index];
      if (!value) return;

      switch (header) {
        case 'date':
          session.date = value;
          break;
        case 'sport':
          session.sport = value;
          break;
        case 'duration_min':
        case 'duration':
          session.duration_min = parseFloat(value);
          break;
        case 'rpe_1_10':
        case 'rpe':
          session.rpe_1_10 = parseFloat(value);
          break;
        case 'distance_km':
        case 'distance':
          session.distance_km = parseFloat(value);
          break;
        case 'avg_hr_bpm':
        case 'hr':
        case 'heart_rate':
          session.avg_hr_bpm = parseFloat(value);
          break;
        case 'sleep_hours':
        case 'sleep':
          session.sleep_hours = parseFloat(value);
          break;
        case 'hrv_ms':
        case 'hrv':
          session.hrv_ms = parseFloat(value);
          break;
        case 'soreness_1_10':
        case 'soreness':
          session.soreness_1_10 = parseFloat(value);
          break;
        case 'notes':
          session.notes = value;
          break;
      }
    });

    if (session.date && session.sport && session.duration_min && session.rpe_1_10) {
      sessions.push(session as TrainingSession);
    }
  }

  return sessions;
}
