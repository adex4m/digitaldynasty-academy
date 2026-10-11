import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useRealtimeContent } from "@/hooks/useRealtimeContent";
import VisitorCaptureDialog from "@/components/VisitorCaptureDialog";
import { Skeleton } from "@/components/ui/skeleton";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Message = lazy(() => import("./pages/Message"));
const Bootcamp = lazy(() => import("./pages/Bootcamp"));
const Resources = lazy(() => import("./pages/Resources"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoading = () => (
  <main className="min-h-screen bg-background pt-16 lg:pt-20" aria-busy="true" aria-label="Loading page">
    <Skeleton className="h-72 w-full rounded-none" />
    <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <Skeleton key={item} className="h-80 w-full" />
      ))}
    </div>
  </main>
);

const AppRoutes = () => {
  useRealtimeContent();

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/message" element={<Message />} />
        <Route path="/bootcamp" element={<Bootcamp />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <VisitorCaptureDialog />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
