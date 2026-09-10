export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Knee OA Severity Classification",
    description:
      "A deep learning research project for five-class knee osteoarthritis severity grading from X-ray images using a custom multi-scale attention-residual CNN with CBAM, imbalance-aware training, ensemble inference, and TTA.",
    technologies: [
      "PyTorch",
      "Python",
      "Deep Learning",
      "Computer Vision",
      "CBAM",
      "CNN",
      "ResNet"
    ],
    github: "Private",
    live: "Soon",
    image: "/project-1.png",
  },
  {
    title: "ClassGuard",
    description: "A real-time exam monitoring platform for in-class, paper-based tests — detects tab switches, split-screen, and app-switching live, so teachers always know what's happening across the room.",
    technologies: ["Javascript","React", "Vite", "Supabase", "TailwindCSS"],
    github: "https://github.com/Laxman-Mahto/ClassGuard.git",
    live: "https://class-guard-five.vercel.app/",
    image: "/project-2.png",
  },
    {
    title: "InternPulse",
    description: "An enterprise-grade B2B SaaS platform for colleges and corporate HR to manage, track, and verify student internships. Features custom dual-portals, real-time analytics, automated SMTP email verifications, and dynamically generated Proof of Work certificates.",
    technologies: [
      "Next.js", 
      "TypeScript", 
      "TailwindCSS", 
      "Prisma", 
      "Supabase"
    ],
    github: "https://github.com/Laxman-Mahto/InternPulse",
    live: "https://intern-pulse-bay.vercel.app/",
    image: "/project-3.png",
  },
];
