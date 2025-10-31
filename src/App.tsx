import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataInput from "./pages/DataInput";
import Analysis from "./pages/Analysis";
import ImprovementPlan from "./pages/ImprovementPlan";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import UserSetup from "./pages/UserSetup";
import Landing from "./pages/Landing";
import LoginPlaceholder from "./pages/LoginPlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-input" element={<DataInput />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/improvement-plan" element={<ImprovementPlan />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<LoginPlaceholder />} />
          <Route path="/user-setup" element={<UserSetup />} />
          <Route path="/profile" element={<UserSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
