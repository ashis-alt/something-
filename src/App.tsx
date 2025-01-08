import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ConsumerLogin from "./pages/ConsumerLogin";
import VerifyLicense from "./pages/VerifyLicense";
import BusinessProfile from "./pages/BusinessProfile";
import RegisterComplaint from "./pages/RegisterComplaint";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consumer-login" element={<ConsumerLogin />} />
          <Route path="/verify-license" element={<VerifyLicense />} />
          <Route path="/business-profile/:licenseNumber" element={<BusinessProfile />} />
          <Route path="/register-complaint/:licenseNumber" element={<RegisterComplaint />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;