import React, { lazy, Suspense } from "react";
import Hero from "../Components/Sections/Hero";
import About from "../Components/Sections/About";
import ScrollProgressBar from "../Components/Ui/ScrollProgressBar";
import Contact from "../Components/Sections/Contact";
import SEO from "../Components/Ui/SEO";
import { Skeleton } from "../Components/Ui/Skeleton";

// Lazy load heavy components with icons
const TechStack = lazy(() => import("../Components/Sections/TechStack"));
const Projects = lazy(() => import("../Components/Sections/Projects"));

// Loading fallback for lazy components
const SectionSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto py-12 space-y-4">
    <Skeleton className="h-8 w-48 mb-6" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const Home: React.FC = () => {
  return (
    <div>
      <SEO />
      <ScrollProgressBar />
      <Hero />
      <About />
      <Suspense fallback={<SectionSkeleton />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>
      <Contact />
    </div>
  );
};

export default Home;
