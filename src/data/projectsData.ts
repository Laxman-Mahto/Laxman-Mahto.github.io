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
    technologies: ["React", "Vite", "Supabase", "TailwindCSS"],
    github: "https://github.com/Laxman-Mahto/ClassGuard.git",
    live: "https://class-guard-five.vercel.app/",
    image: "/project-2.png",
  },
  {
    title: "Coming Soon",
    description: "Coming Soon",
    technologies: ["Next.js", "TypeScript", "Prisma"],
    image: "/project-3.png",
  },
  {
    title: "Coming Soon",
    description: "Coming Soon",
    technologies: ["React", "Express", "PostgreSQL"],
  },
];
