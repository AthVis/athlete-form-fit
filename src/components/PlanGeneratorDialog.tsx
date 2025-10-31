import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SPORT_GOALS, SPORT_LABELS, type SportType } from "@/lib/sports";

interface PlanGeneratorDialogProps {
  onGenerate: (sport: string, goal: string) => Promise<void>;
  loading: boolean;
  children: React.ReactNode;
  defaultSport?: SportType;
  defaultGoal?: string;
}

export function PlanGeneratorDialog({ onGenerate, loading, children, defaultSport = "Running", defaultGoal }: PlanGeneratorDialogProps) {
  const [open, setOpen] = useState(false);
  const [sport, setSport] = useState<SportType>(defaultSport);
  const [goal, setGoal] = useState(defaultGoal || SPORT_GOALS[defaultSport][0]);

  useEffect(() => {
    if (open) {
      setSport(defaultSport);
      const goals = SPORT_GOALS[defaultSport];
      setGoal(defaultGoal && goals.includes(defaultGoal) ? defaultGoal : goals[0]);
    }
  }, [open, defaultSport, defaultGoal]);

  const handleSubmit = async () => {
    await onGenerate(sport, goal);
    setOpen(false);
  };

  const availableGoals = SPORT_GOALS[sport] || SPORT_GOALS.Running;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Your Plan</DialogTitle>
          <DialogDescription>
            Select your sport and goal to create a personalized 7-day improvement plan
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="plan-sport">Sport</Label>
            <Select value={sport} onValueChange={(value) => {
              const typedValue = value as SportType;
              setSport(typedValue);
              // Reset goal when sport changes
              const newGoals = SPORT_GOALS[typedValue];
              if (newGoals && !newGoals.includes(goal)) {
                setGoal(newGoals[0]);
              }
            }}>
              <SelectTrigger id="plan-sport">
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
            <Label htmlFor="plan-goal">Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger id="plan-goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableGoals.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Plan"
            )}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
