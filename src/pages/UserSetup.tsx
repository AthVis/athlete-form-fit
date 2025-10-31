import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarCheck, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/useUserProfile";
import { EXPERIENCE_LEVELS, SPORT_GOALS, SPORT_LABELS, WEEK_DAYS, type SportType } from "@/lib/sports";

const UserSetup = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [sport, setSport] = useState<SportType>("Running");
  const [primaryGoal, setPrimaryGoal] = useState<string>(SPORT_GOALS.Running[0]);
  const [experienceLevel, setExperienceLevel] = useState<(typeof EXPERIENCE_LEVELS)[number]>("Beginner");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [focusNotes, setFocusNotes] = useState("");

  useEffect(() => {
    if (profile) {
      setSport(profile.sport);
      const goals = SPORT_GOALS[profile.sport];
      setPrimaryGoal(goals.includes(profile.primaryGoal) ? profile.primaryGoal : goals[0]);
      setExperienceLevel(profile.experienceLevel);
      setAvailableDays(profile.availableDays);
      setFocusNotes(profile.focusNotes || "");
    }
  }, [profile]);

  const goalOptions = useMemo(() => SPORT_GOALS[sport], [sport]);

  useEffect(() => {
    if (!goalOptions.includes(primaryGoal)) {
      setPrimaryGoal(goalOptions[0]);
    }
  }, [goalOptions, primaryGoal]);

  const updateDay = (day: string, nextState: boolean) => {
    setAvailableDays(prev => {
      if (nextState) {
        return prev.includes(day) ? prev : [...prev, day];
      }
      return prev.filter(existing => existing !== day);
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const sortedDays = [...availableDays].sort(
      (a, b) => WEEK_DAYS.indexOf(a as typeof WEEK_DAYS[number]) - WEEK_DAYS.indexOf(b as typeof WEEK_DAYS[number])
    );

    const nextProfile = {
      sport,
      primaryGoal,
      experienceLevel,
      availableDays: sortedDays,
      focusNotes: focusNotes.trim() || undefined,
    };

    updateProfile(nextProfile);
    toast.success("Athlete profile saved!");
    navigate("/improvement-plan");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Athlete Setup</h1>
              <p className="text-muted-foreground">Define your sport focus, experience and weekly availability</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sport & Goal</CardTitle>
              <CardDescription>Select the sport you train for and your primary objective</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select value={sport} onValueChange={value => setSport(value as SportType)}>
                    <SelectTrigger id="sport">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(SPORT_GOALS) as SportType[]).map(option => (
                        <SelectItem key={option} value={option}>
                          {SPORT_LABELS[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Primary Goal</Label>
                  <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
                    <SelectTrigger id="goal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {goalOptions.map(goal => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={value => setExperienceLevel(value as typeof EXPERIENCE_LEVELS[number])}>
                  <SelectTrigger id="experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
              <CardDescription>Choose the days you can train to tailor your plan cadence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {WEEK_DAYS.map(day => (
                  <label key={day} className="flex items-center gap-3 rounded-lg border p-3 hover:border-primary">
                    <Checkbox
                      checked={availableDays.includes(day)}
                      onCheckedChange={checked => updateDay(day, checked === true)}
                    />
                    <span className="text-sm font-medium text-foreground">{day}</span>
                  </label>
                ))}
              </div>
              {availableDays.length === 0 && (
                <p className="mt-3 text-xs text-destructive">Select at least one training day</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Focus Notes</CardTitle>
              <CardDescription>Share any constraints or emphasis areas we should consider</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                value={focusNotes}
                onChange={event => setFocusNotes(event.target.value)}
                placeholder="Example: Build speed without exceeding 4 sessions/week"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CalendarCheck className="h-5 w-5" />
                Weekly Snapshot
              </CardTitle>
              <CardDescription className="text-primary/80">
                Preview of how your information shapes the rule engine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-primary-foreground">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {SPORT_LABELS[sport]}
                </Badge>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  Goal: {primaryGoal}
                </Badge>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  Level: {experienceLevel}
                </Badge>
              </div>
              <p className="text-primary/90">
                Available days: {availableDays.length > 0 ? availableDays.join(", ") : "Not set"}
              </p>
              {focusNotes.trim() && <p className="text-primary/80">Notes: {focusNotes}</p>}
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={availableDays.length === 0}>
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserSetup;
