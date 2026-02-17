import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../Store/useThemeStore";
import { Dock, DockIcon } from "../Ui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Ui/tooltip";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  HomeIcon,
  BlogIcon,
  SunIcon,
  MoonIcon,
} from "../icons/Icons";
import { SOCIAL_LINKS } from "../../utils/constants";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Blog", path: "/blog", icon: BlogIcon },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url:  SOCIAL_LINKS.github,
      icon: GitHubIcon,
    },
    {
      name: "LinkedIn",
      url: SOCIAL_LINKS.linkedin,
      icon: LinkedInIcon,
    },
    {
      name: "X",
      url:  SOCIAL_LINKS.twitter,
      icon: TwitterIcon,
    },
  ];

  // Handler functions for better code organization
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    callback: () => void,
    allowSpace: boolean = true
  ) => {
    if (e.key === "Enter" || (allowSpace && e.key === " ")) {
      e.preventDefault();
      callback();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>

      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-full">
        
        {/* Navigation Links */}
        {navLinks.map((link) => {
          const IconComponent = link.icon;

          return (
            <DockIcon key={link.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="p-3 rounded-full transition-all duration-200 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/10 dark:hover:bg-gray-700/30"
                    onClick={() => handleNavigation(link.path)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => handleNavigation(link.path))
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={`Navigate to ${link.name} page`}
                  >
                    <IconComponent size={16} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}

        {/* Divider */}
        <div className="w-px h-10 bg-border" aria-hidden="true"></div>

        {/* Social Links */}
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <DockIcon key={social.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200/10 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                    onClick={() => handleSocialClick(social.url)}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        () => handleSocialClick(social.url),
                        false
                      )
                    }
                    tabIndex={0}
                    role="link"
                    aria-label={`Open ${social.name} profile in new tab`}
                  >
                    <IconComponent size={16} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}

        {/* Divider */}
        <div className="w-px h-10 bg-border" aria-hidden="true"></div>

        {/* Theme Toggle */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200/10 dark:hover:bg-gray-700/20 transition-all duration-200"
              >
                {theme === "dark" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === "dark" ? "Dark" : "Light"} mode</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default Navbar;