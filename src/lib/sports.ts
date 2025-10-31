export const SPORT_GOALS = {
  Running: ["Endurance", "Technique", "Prevention"],
  Strength: ["Power", "Hypertrophy", "Prevention"],
  Football: ["Endurance", "Technique", "Prevention"],
  Basketball: ["Explosiveness", "Technique", "Prevention"],
} as const;

export type SportType = keyof typeof SPORT_GOALS;

export const SPORT_LABELS: Record<SportType, string> = {
  Running: "Running",
  Strength: "Strength Training",
  Football: "Football",
  Basketball: "Basketball",
};

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
