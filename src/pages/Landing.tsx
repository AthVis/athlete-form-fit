import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  LineChart,
  LogIn,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const statHighlights = [
  {
    value: "3x",
    label: "Mehr Klarheit im Training",
    detail: "dank smarter Belastungswarnungen auf deinem Phone",
  },
  {
    value: "89%",
    label: "Feel-Good Score",
    detail: "unserer Beta-Community für Alltagssportler:innen",
  },
  {
    value: "24/7",
    label: "Begleitung",
    detail: "dein Trainings- und Recovery-Check immer griffbereit",
  },
];

const featureHighlights = [
  {
    icon: Activity,
    title: "Individuelle Trainingssteuerung",
    description:
      "Belastung, Intensität und Erholung werden für dich interpretiert und in klare To-dos übersetzt.",
    metric: "Spürbar bessere Sessions",
  },
  {
    icon: ShieldCheck,
    title: "Smarter Body-Check",
    description:
      "Frühe Hinweise auf Überlastung inklusive Tipps für Regeneration und Mobility.",
    metric: "Mehr freie Tage nutzen",
  },
  {
    icon: BarChart3,
    title: "Glasklare Fortschritte",
    description:
      "Trends, Vergleiche und Highlights auf einen Blick – ohne Tabellenchaos.",
    metric: "Motivation auf Autopilot",
  },
];

const workflowSteps = [
  {
    icon: Gauge,
    title: "1. Daten verbinden",
    description: "Synce Wearables, Apple Health oder logge Workouts per Tap.",
    accent: "60 Sekunden Setup",
  },
  {
    icon: LineChart,
    title: "2. Insights verstehen",
    description: "Übersetzte Metriken erklären dir, was heute wirklich zählt.",
    accent: "Persönliche Alerts",
  },
  {
    icon: Sparkles,
    title: "3. Alltag meistern",
    description:
      "Teile Highlights mit Freund:innen, plane deine Woche stressfrei.",
    accent: "Alles in einer App",
  },
];

const brandPillars = [
  "Apple Health Community",
  "Garmin Connect Athlet:innen",
  "Urban Runner Clubs",
  "Home Gym Creator:innen",
];

const commitments = [
  "Trainingsbegleitung in Echtzeit",
  "Individuelle Verbesserungsvorschläge",
  "Transparente, moderne Visualisierungen",
  "Sicheres Sharing mit Freund:innen",
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,129,229,0.14)_0,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-3xl translate-x-1/4 rounded-full bg-[radial-gradient(circle_at_center,_rgba(22,52,110,0.35)_0,_transparent_70%)] blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
              AV
            </div>
            <div className="leading-tight">
              <span className="block text-base font-semibold tracking-tight">
                AthleteVision
              </span>
              <span className="block text-xs text-muted-foreground">
                Personal Training Companion
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a
              className="transition-colors hover:text-foreground"
              href="#features"
            >
              Features
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#workflow"
            >
              Workflow
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#commitments"
            >
              Vorteile
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden gap-2 md:inline-flex"
              onClick={() => navigate("/dashboard")}
            >
              Demo-Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/login")}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto grid gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="w-fit gap-2 rounded-full border border-primary/30 bg-secondary/80 text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Dein smarter Trainingsbuddy
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Deine moderne Plattform für{" "}
                <span className="text-primary">datengetriebene</span>{" "}
                <span className="rounded-md bg-accent/20 px-2 text-accent">
                  Fitness-Routinen
                </span>
                .
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                AthleteVision bündelt Workouts, Erholung und Motivation in einer
                App. Insights, Alerts und Routinen passen sich deinem Alltag an
                – ohne komplizierte Tools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                Jetzt ausprobieren
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/analysis")}
                className="border-border/80 bg-background/80"
              >
                Analyse entdecken
              </Button>
            </div>

            <div className="grid gap-6 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl shadow-primary/10 sm:grid-cols-3">
              {statHighlights.map((stat, index) => (
                <div key={stat.label} className="space-y-1">
                  <p
                    className={cn(
                      "text-3xl font-semibold",
                      index === 1 ? "text-accent" : "text-primary",
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-foreground/90">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-x-8 inset-y-6 rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary/15 via-background/70 to-background/50 blur-3xl"
              aria-hidden
            />
            <Card className="relative overflow-hidden border-border/80 bg-card/95 shadow-2xl shadow-primary/15">
              <CardContent className="space-y-8 p-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground/80">
                    Daily Control Center
                  </p>
                  <h2 className="text-2xl font-bold">
                    Alles im Blick – von Makro bis Mikro
                  </h2>
                </div>
                <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
                  <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>KW 37 Performance Snapshot</span>
                    <span>Aktualisiert vor 2 Min.</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-primary">
                        Training Load
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-primary">
                        542
                      </p>
                      <p className="text-xs text-primary/80">
                        im Wohlfühlbereich
                      </p>
                    </div>
                    <div className="rounded-xl border border-success/20 bg-success/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-success">
                        Recovery Index
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-success">
                        84%
                      </p>
                      <p className="text-xs text-success/80">
                        +6% vs. Vorwoche
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-accent">
                        Injury Risk
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-accent">
                        32%
                      </p>
                      <p className="text-xs text-accent/80">
                        Watchlist: Wadenmuskulatur
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card/80 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Nächste Schritte
                      </p>
                      <p className="mt-2 text-base font-medium text-foreground">
                        4 Empfehlungen bereit
                      </p>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-3 w-full"
                        onClick={() => navigate("/improvement-plan")}
                      >
                        Zur Wochenplanung
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Passe Workouts an, tracke Gefühle und teile Highlights mit
                  deiner Crew – ohne Extra-Tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="bg-secondary/40 py-20">
          <div className="container mx-auto space-y-12 px-6">
            <div className="flex flex-col gap-4 text-center">
              <Badge
                variant="outline"
                className="mx-auto w-fit rounded-full border border-primary/30 bg-background/90 text-muted-foreground"
              >
                Für ambitionierte Alltagsathlet:innen gemacht
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Performance-Intelligenz, die dich weiterbringt
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground">
                Von ersten Fitness-Zielen bis zur Regeneration nach dem Longrun
                – AthleteVision vereint alle Signale in einer modernen
                Experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featureHighlights.map((feature) => (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border-border/70 bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl"
                >
                  <CardContent className="space-y-4 p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {feature.metric}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="container mx-auto grid gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="w-fit rounded-full border border-primary/30 bg-secondary/80 text-primary"
            >
              So funktioniert's
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Entwickelt für deinen Trainingsalltag.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              AthleteVision sortiert deine Daten, Insights und Aufgaben in einem
              zentralen Workspace. Automatisierte Alerts und Smarte Vorschläge
              halten dich auf Kurs – ganz ohne Tabellenchaos.
            </p>

            <div className="grid gap-6">
              {workflowSteps.map((step) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-1 text-xs text-accent">
                        {step.accent}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden border-border/80 bg-card/90 shadow-2xl shadow-primary/15">
            <CardContent className="space-y-6 p-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/80">
                  Beliebt bei
                </p>
                <div className="flex flex-wrap gap-2 text-sm font-medium text-muted-foreground">
                  {brandPillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-sm leading-relaxed text-primary">
                "AthleteVision begleitet mich vom ersten Warm-up bis zur
                Abendroutine – und erklärt mir endlich, was meine Daten
                bedeuten."
                <p className="mt-3 text-xs uppercase tracking-wide text-primary/80">
                  Beta-Userin, Freizeitläuferin
                </p>
              </div>

              <div
                id="commitments"
                className="grid gap-3 text-sm text-muted-foreground"
              >
                {commitments.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                <h3 className="text-base font-semibold text-foreground">
                  Hol dir frühen Zugang
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hinterlasse deine E-Mail im Dashboard – wir informieren dich,
                  sobald die Login-Funktion live geht.
                </p>
                <Button
                  className="mt-4 w-full"
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard öffnen
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gradient-to-br from-primary/12 via-background to-background py-20">
          <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/30 bg-secondary/80 text-primary"
            >
              Bereit, wenn du es bist
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Starte heute in deine nächste Trainingsphase.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              Hol dir Zugang zum Demo-Dashboard, erstelle dein Profil und
              erlebe, wie sich AthleteVision an deine Fitnessroutine anpasst.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                Direkt zum Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Login demnächst freigeschaltet
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-background/80 py-8">
        <div className="container mx-auto flex flex-col justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} AthleteVision. Performance
            Intelligence für Alltagssportler:innen.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="transition-colors hover:text-foreground"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="transition-colors hover:text-foreground"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="transition-colors hover:text-foreground"
              onClick={() => navigate("/analysis")}
            >
              Analyse
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
