import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, useEffect } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useThemeStore } from "./Store/useThemeStore";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import { TooltipProvider } from "./Components/Ui/tooltip";
import ErrorBoundary from "./Components/ErrorBoundary";
import { trackPageView } from "./utils/analytics";
const NotFound = lazy(() => import("./Pages/NotFound"));

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 0,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

// Animated page wrapper component
const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

// Routes component (needs to be inside Router to use useLocation)
const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change or page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Track page view
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/blog"
          element={
            <AnimatedPage>
              <Blog />
            </AnimatedPage>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <ErrorBoundary>
      <TooltipProvider delayDuration={0} skipDelayDuration={0}>
        <Router>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default App;
