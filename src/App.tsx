import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import LegalNotificationBanner from "@/components/LegalNotificationBanner";
import Index from "./pages/Index";
import SobreNos from "./pages/SobreNos";
import NossasSolucoes from "./pages/NossasSolucoes";
import Metodologia from "./pages/Metodologia";
import Cases from "./pages/Cases";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { mounted } = useTheme();

  // Prevenir flash de conteúdo não estilizado
  useEffect(() => {
    if (mounted) {
      document.body.style.visibility = 'visible';
    }
  }, [mounted]);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <LegalNotificationBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/nossas-solucoes" element={<NossasSolucoes />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
