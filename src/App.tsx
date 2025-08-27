import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SecurityReports from "./pages/modules/SecurityReports";
import Ombudsman from "./pages/modules/Ombudsman";
import Voting from "./pages/modules/Voting";
import Shopping from "./pages/modules/Shopping";
import Supplies from "./pages/modules/Supplies";
import Suggestions from "./pages/modules/Suggestions";
import PromaxEvents from "./pages/modules/PromaxEvents";
import Maintenance from "./pages/modules/Maintenance";
import Support from "./pages/modules/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/security-reports" element={<SecurityReports />} />
          <Route path="/ombudsman" element={<Ombudsman />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/supplies" element={<Supplies />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/promax-events" element={<PromaxEvents />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
