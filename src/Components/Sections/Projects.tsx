import React, { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
}

const Projects: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedProjects((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const projects: Project[] = [
    {
      title: "Truecaller-Check",
      description:
        "The Phone Number Info Detector is a simple application designed to analyze and extract useful details from phone numbers.",
      technologies: [
        "CSS",
        "Html",
        "Js",
      ],
      github: "https://github.com/Laxman-Mahto/Truecaller-Check.git",
      live: "https://laxman-mahto.github.io/Truecaller-Check/",
      image: "/project-1.png",
    },
    {
      title: "Coming Soon",
      description: "Coming Soon",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Coming Soon",
      description: "Coming Soon",
      technologies: ["Next.js", "TypeScript", "Prisma"],
    },
    {
      title: "Coming Soon",
      description: "Coming Soon",
      technologies: ["React", "Express", "PostgreSQL"],
    },
  ];

  return (
    <section
      id="projects"
      className="w-full max-w-4xl mx-auto py-10 sm:py-14 mb-4"
      aria-labelledby="projects-heading"
    >
      <div>
        <motion.h2
          id="projects-heading"
          className="text-xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-10 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              className="group relative overflow-hidden rounded-xl 
                       border border-gray-200 dark:border-white/10 
                       bg-transparent"
              aria-label={`Project: ${project.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="p-4 sm:p-6 flex flex-col">
                {/* Project Title */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 font-inter">
                  {project.title}
                </h3>

                {/* Description */}
                <div className="mb-4">
                  <p
                    className={`text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${
                      !expandedProjects.includes(index) ? "line-clamp-3" : ""
                    }`}
                  >
                    {project.description}
                  </p>
                  {project.description.length > 150 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                    >
                      {expandedProjects.includes(index)
                        ? "Read less"
                        : "Read more"}
                    </button>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md 
                             bg-gray-100 dark:bg-white/5 
                             border border-gray-200 dark:border-white/10 
                             text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm 
                             text-gray-600 dark:text-gray-300 
                             hover:text-gray-900 dark:hover:text-white 
                             transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm 
                             text-gray-600 dark:text-gray-300 
                             hover:text-gray-900 dark:hover:text-white 
                             transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
