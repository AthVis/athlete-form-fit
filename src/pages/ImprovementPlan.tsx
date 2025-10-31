import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Dumbbell, Timer, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlanGeneratorDialog } from "@/components/PlanGeneratorDialog";
import {
  generatePlan,
  loadSessions,
  loadPlan,
  savePlan,
  loadUserProfile,
  loadLatestFeedback,
  type PlanResponse,
  type UserProfile,
  type WeeklyFeedback,
} from "@/lib/athleteVision";
import { SPORT_GOALS, SPORT_LABELS, type SportType } from "@/lib/sports";

const ImprovementPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanResponse | null>(() => loadPlan());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(() => loadUserProfile());
  const [latestFeedback, setLatestFeedback] = useState<WeeklyFeedback | null>(() => loadLatestFeedback());

  useEffect(() => {
    const saved = localStorage.getItem('athletevision_completed_days');
    if (saved) setCompletedDays(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      setProfile(loadUserProfile());
      setLatestFeedback(loadLatestFeedback());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  useEffect(() => {
    if (plan?.profile_snapshot && !profile) {
      setProfile(plan.profile_snapshot);
    }
    if (plan?.feedback_snapshot && !latestFeedback) {
      setLatestFeedback(plan.feedback_snapshot);
    }
  }, [plan, profile, latestFeedback]);

  const toggleDay = (dayIndex: number) => {
    const updated = completedDays.includes(dayIndex)
      ? completedDays.filter(d => d !== dayIndex)
      : [...completedDays, dayIndex];
    setCompletedDays(updated);
    localStorage.setItem('athletevision_completed_days', JSON.stringify(updated));
  };

  const handleGeneratePlan = async (sport: string, goal: string) => {
    setLoading(true);
    try {
      const sessions = loadSessions();
      if (sessions.length === 0) {
        toast.error("Please add training sessions before generating a plan");
        return;
      }

      const currentProfile = loadUserProfile();
      if (!currentProfile) {
        toast.error("Complete your athlete setup first so we can tailor the plan");
        navigate("/profile");
        return;
      }

      const feedbackSnapshot = loadLatestFeedback();
      const adjustments: string[] = [];

      let effectiveGoal = goal;
      if (feedbackSnapshot) {
        const { fatigue, pain, difficulty } = feedbackSnapshot;
        const wantsRecovery = difficulty === "too-hard" || fatigue >= 7 || pain >= 6;
        const wantsChallenge = difficulty === "too-easy" && fatigue <= 4 && pain <= 3;

        if (wantsRecovery) {
          const preventionGoal = SPORT_GOALS[sport as SportType].find(g => g.toLowerCase().includes("prevention")) || goal;
          if (preventionGoal !== goal) {
            effectiveGoal = preventionGoal;
          }
          adjustments.push("Shifted to a recovery-focused week based on your latest feedback.");
        } else if (wantsChallenge) {
          adjustments.push("Dialed up progression after you reported the week felt easy.");
        }
      }

      if (currentProfile.availableDays.length <= 3) {
        adjustments.push("Limited weekly availability detected – prioritizing quality over volume.");
      }

      const today = new Date().toISOString().split('T')[0];
      const newPlan = await generatePlan(today, sport, effectiveGoal, sessions);

      const enrichedPlan: PlanResponse = {
        ...newPlan,
        requested_goal: goal,
        effective_goal: effectiveGoal,
        adjustments: adjustments.length > 0 ? adjustments : undefined,
        profile_snapshot: currentProfile,
        feedback_snapshot: feedbackSnapshot ?? undefined,
      };

      setPlan(enrichedPlan);
      savePlan(enrichedPlan);
      setCompletedDays([]);
      localStorage.removeItem('athletevision_completed_days');
      setProfile(currentProfile);
      setLatestFeedback(feedbackSnapshot ?? null);

      toast.success(`${newPlan.plan_type} plan generated successfully!`);
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">7-Day Improvement Plan</h1>
                <p className="text-muted-foreground">Generate your personalized training schedule</p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8 max-w-2xl">
          {!profile && (
            <Card className="mb-6 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="py-4">
                <h3 className="font-semibold text-primary">Setup required</h3>
                <p className="text-sm text-primary/80">
                  Before we can build your plan, complete the athlete setup with your sport, goal and availability.
                </p>
                <Button className="mt-4" onClick={() => navigate("/profile")}>Start Athlete Setup</Button>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Dumbbell className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Plan Generated Yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                Create a personalized 7-day improvement plan based on your training data
              </p>
              <PlanGeneratorDialog
                onGenerate={handleGeneratePlan}
                loading={loading}
                defaultSport={(profile?.sport as SportType) || "Running"}
                defaultGoal={profile?.primaryGoal}
              >
                <Button size="lg">Generate Your Plan</Button>
              </PlanGeneratorDialog>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentPlan = plan.week_plan;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">7-Day Improvement Plan</h1>
              <p className="text-muted-foreground">
                {plan.plan_type} plan - {plan.reason}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/profile")}> 
                Adjust Profile
              </Button>
              <PlanGeneratorDialog
                onGenerate={handleGeneratePlan}
                loading={loading}
                defaultSport={(profile?.sport as SportType) || "Running"}
                defaultGoal={profile?.primaryGoal}
              >
                <Button variant="outline">Regenerate Plan</Button>
              </PlanGeneratorDialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {plan.adjustments && (
          <Card className="mb-6 border-warning/40 bg-warning/10">
            <CardHeader>
              <CardTitle className="text-warning">Plan Adjustments</CardTitle>
              <CardDescription>We tailored this plan based on your availability and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-warning/90">
                {plan.adjustments.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Badge variant={
                    plan.plan_type === "Performance" ? "default" :
                    plan.plan_type === "Deload" ? "secondary" : "outline"
                  }>{plan.plan_type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan Type</p>
                  <p className="text-sm font-medium">{plan.plan_type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedDays.length}/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Timer className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <p className="text-2xl font-bold">5h 45m</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-success/10">
                  <Dumbbell className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Intensity</p>
                  <p className="text-2xl font-bold">Medium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Athlete Snapshot</CardTitle>
              <CardDescription>Profile details applied to this plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Sport:</span>{' '}
                {profile?.sport ? SPORT_LABELS[profile.sport as SportType] : "Not set"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Requested Goal:</span>{' '}
                {plan.requested_goal || "-"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Effective Goal:</span>{' '}
                {plan.effective_goal || plan.requested_goal || "-"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Availability:</span>{' '}
                {profile?.availableDays.length ? profile.availableDays.join(", ") : "Not set"}
              </p>
              {profile?.focusNotes && (
                <p>
                  <span className="font-semibold text-foreground">Notes:</span>{' '}
                  {profile.focusNotes}
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Latest Feedback</CardTitle>
              <CardDescription>Used to adjust risk & recovery focus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {latestFeedback ? (
                <>
                  <p>
                    <span className="font-semibold text-foreground">Submitted:</span>{' '}
                    {new Date(latestFeedback.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Fatigue:</span>{' '}
                    {latestFeedback.fatigue}/10
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Pain:</span>{' '}
                    {latestFeedback.pain}/10
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Difficulty:</span>{' '}
                    {latestFeedback.difficulty.replace('-', ' ')}
                  </p>
                  {latestFeedback.notes && (
                    <p>
                      <span className="font-semibold text-foreground">Notes:</span>{' '}
                      {latestFeedback.notes}
                    </p>
                  )}
                </>
              ) : (
                <p>No feedback submitted yet. Share your experience after completing this plan.</p>
              )}
              <Button variant="outline" className="w-full" onClick={() => navigate("/feedback")}>Submit Feedback</Button>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Plan Cards */}
        <div className="grid gap-4">
          {currentPlan.map((day, index) => (
            <Card 
              key={index}
              className={`transition-all ${
                completedDays.includes(index) 
                  ? "bg-success/5 border-success/30" 
                  : "hover:shadow-md"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={completedDays.includes(index)}
                        onCheckedChange={() => toggleDay(index)}
                        className="mt-1"
                      />
                      <div>
                        <CardTitle className="text-lg">{day.day}</CardTitle>
                        <CardDescription>{day.focus}</CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{day.session}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly Feedback</CardTitle>
            <CardDescription>Help us improve your next plan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate("/feedback")}>
              Submit Weekly Feedback
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ImprovementPlan;
