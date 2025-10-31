import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AppTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isAnalysis = location.pathname.startsWith("/analysis");

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold uppercase text-primary-foreground shadow-sm">
              AV
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-foreground">
                AthleteVision
              </span>
              <span className="block text-[11px] text-muted-foreground">
                Personal Training Companion
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full px-4",
                isAnalysis && "text-primary hover:text-primary",
              )}
              onClick={() => navigate("/analysis")}
            >
              Analysis
            </Button>
            <Button
              size="sm"
              variant={isDashboard ? "default" : "outline"}
              className="rounded-full"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <HoverCard openDelay={100} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full border border-border bg-card text-primary hover:bg-primary/10"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              side="bottom"
              align="end"
              className="w-56 border-border bg-card/95 p-2"
            >
              <button
                type="button"
                onClick={() => navigate("/data-input")}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Manuelles Training aufzeichnen
              </button>
            </HoverCardContent>
          </HoverCard>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="rounded-full"
          >
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage
                src="https://i.pravatar.cc/100?img=12"
                alt="Profil"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppTopBar;
