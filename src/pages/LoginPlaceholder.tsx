import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPlaceholder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              AV
            </div>
            <div className="leading-tight">
              <span className="block text-base font-semibold text-foreground">
                AthleteVision
              </span>
              <span className="block text-xs text-muted-foreground">
                Personal Training Companion
              </span>
            </div>
          </button>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Zum Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Login bald verfügbar
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Wir arbeiten an einer sicheren Anmeldung, damit du dein Training
            jederzeit abrufen kannst. Trag dich ein, um als erstes informiert zu
            werden, sobald die Funktion freigeschaltet ist.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard")} size="lg">
          Dashboard entdecken
        </Button>
      </main>
    </div>
  );
};

export default LoginPlaceholder;
