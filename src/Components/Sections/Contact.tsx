import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SOCIAL_LINKS } from "../../utils/constants";
import { isEmailJSConfigured } from "../../utils/validateEnv";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Ui/tooltip";

// Helper icon for the success message
const CheckIcon = () => (
  <svg
    className="w-16 h-16 text-teal-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for professional success/error messages
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // State for validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  // Rate limiting - prevent spam submissions
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const COOLDOWN_MS = 5000; // 5 seconds between submissions

  // Validation function
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (submissionStatus === "success") {
      const timer = setTimeout(() => {
        setSubmissionStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  // Professional submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < COOLDOWN_MS) {
      setSubmissionStatus("error");
      setErrors({
        message: `Please wait ${Math.ceil(
          (COOLDOWN_MS - (now - lastSubmitTime)) / 1000
        )} seconds before submitting again`,
      });
      return;
    }

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle"); // Reset status
    setErrors({}); // Clear any errors
    setLastSubmitTime(now); // Update last submit time

    try {
      // Trim whitespace from form data before submission
      const trimmedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      // EmailJS credentials from environment variables
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate credentials are set
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS credentials not configured");
      }

      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: trimmedData.name, // Changed from from_name to name
          email: trimmedData.email, // Changed from from_email to email
          message: trimmedData.message,
        },
        PUBLIC_KEY
      );

      // On success:
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // On failure:
      console.error("Submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social icons (Email icon is removed as requested)
  const socialIcons = [
    {
      name: "Twitter",
      href: SOCIAL_LINKS.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
      color: "hover:text-[#E2E2E2]",
    },
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:text-gray-200",
    },
    {
      name: "Discord",
      href: SOCIAL_LINKS.discord,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: "hover:text-indigo-400",
    },
    {
      name: "Instagram",
      href: SOCIAL_LINKS.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "hover:text-pink-400",
    },
  ];

  return (
    <section
      className="w-full max-w-4xl mx-auto relative"
      aria-labelledby="contact-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <div>
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Contact
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-600 dark:text-[#A3A3A3] font-inter"
            >
              Let's build your next project.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-5 pt-2"
          >
            <div>
              <h4 className="text-gray-900 dark:text-[#E2E2E2] font-bold mb-1.5 font-inter text-base">
                Always Available
              </h4>
              <p className="text-gray-600 dark:text-[#A3A3A3] text-xs md:text-sm leading-relaxed">
                Open to new opportunities, collaborations, and exciting
                projects. Let's create something amazing together! Reach me at{" "}
                <a
                  href="mailto:dakshsgt69@gmail.com"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = "mailto:dakshsgt69@gmail.com";
                  }}
                  className="text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-all font-medium hover:underline underline-offset-2 cursor-pointer"
                >
                  dakshsgt69@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

          <motion.h4
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-base font-bold text-gray-700 dark:text-gray-200 pt-4"
          >
            Connect With Me
          </motion.h4>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex gap-5"
          >
            <TooltipProvider delayDuration={100}>
              {socialIcons.map((social, index) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-500 dark:text-gray-400 transition-all duration-300 ${social.color} hover:scale-110`}
                      aria-label={social.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                  >
                    {social.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </motion.div>

          {/* Footer - Desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="pt-3 hidden lg:block"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">
              © 2026 Designed & Built by Daksh
            </p>
          </motion.div>
        </div>

        {/* Right Side - Contact Form */}

        <div className="max-lg:p-6 max-lg:bg-gray-50/50 dark:max-lg:bg-white/[0.02] max-lg:border max-lg:border-gray-200 dark:max-lg:border-white/5 max-lg:rounded-2xl max-lg:backdrop-blur-sm">
          {/* Conditional Rendering for Success State */}
          {submissionStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center h-full min-h-[380px]"
            >
              <CheckIcon />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                Message Sent!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 mb-6">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmissionStatus("idle")}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-2.5 px-5 rounded-lg transition-all duration-300 font-inter text-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            // Final Form - Grid Layout, Placeholders, Boxed Inputs
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5 relative z-10"
            >
              {/* EmailJS Configuration Warning */}
              {!isEmailJSConfigured() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                >
                  <p className="text-yellow-500 text-xs font-inter flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    EmailJS not configured. Contact form will not send emails.
                  </p>
                </motion.div>
              )}

              <fieldset disabled={isSubmitting} className="contents">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="col-span-2"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    aria-label="Full Name"
                    aria-invalid={errors.name ? "true" : "false"}
                    required
                    className={`w-full px-4 py-2.5 
                             bg-gray-50 dark:bg-white/[0.03] 
                             border-2 ${
                               errors.name
                                 ? "border-red-500/50"
                                 : "border-gray-300 dark:border-white/5"
                             } rounded-lg text-sm 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500 
                             focus:outline-none ${
                               errors.name
                                 ? "focus:border-red-500"
                                 : "focus:border-teal-500 dark:focus:border-cyan-400"
                             } focus:bg-gray-100 dark:focus:bg-white/[0.05] 
                             focus:scale-[1.01] transition-all font-inter 
                             hover:bg-gray-100 dark:hover:bg-white/[0.05] 
                             hover:border-gray-400 dark:hover:border-white/10`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-1.5 font-inter"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="col-span-2"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    aria-label="Email Address"
                    aria-invalid={errors.email ? "true" : "false"}
                    required
                    className={`w-full px-4 py-2.5 
                             bg-gray-50 dark:bg-white/[0.03] 
                             border-2 ${
                               errors.email
                                 ? "border-red-500/50"
                                 : "border-gray-300 dark:border-white/5"
                             } rounded-lg text-sm 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500 
                             focus:outline-none ${
                               errors.email
                                 ? "focus:border-red-500"
                                 : "focus:border-teal-500 dark:focus:border-cyan-400"
                             } focus:bg-gray-100 dark:focus:bg-white/[0.05] 
                             focus:scale-[1.01] transition-all font-inter 
                             hover:bg-gray-100 dark:hover:bg-white/[0.05] 
                             hover:border-gray-400 dark:hover:border-white/10`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-1.5 font-inter"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="col-span-2"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    aria-label="Message"
                    aria-invalid={errors.message ? "true" : "false"}
                    required
                    rows={5}
                    maxLength={500}
                    className={`w-full px-4 py-2.5 
                             bg-gray-50 dark:bg-white/[0.03] 
                             border-2 ${
                               errors.message
                                 ? "border-red-500/50"
                                 : "border-gray-300 dark:border-white/5"
                             } rounded-lg text-sm 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500 
                             focus:outline-none ${
                               errors.message
                                 ? "focus:border-red-500"
                                 : "focus:border-teal-500 dark:focus:border-cyan-400"
                             } focus:bg-gray-100 dark:focus:bg-white/[0.05] 
                             focus:scale-[1.01] transition-all resize-none font-inter 
                             hover:bg-gray-100 dark:hover:bg-white/[0.05] 
                             hover:border-gray-400 dark:hover:border-white/10`}
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs font-inter"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                    <p
                      className={`text-xs ${errors.message ? "ml-auto" : ""} ${
                        formData.message.length > 500
                          ? "text-red-400"
                          : "text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {formData.message.length}/500
                    </p>
                  </div>
                </motion.div>

                {/* Error message */}
                {submissionStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-sm text-center col-span-2"
                  >
                    Oops! Something went wrong. Please try again or email me
                    directly.
                  </motion.p>
                )}
              </fieldset>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="col-span-2 w-full 
                         bg-gray-900 dark:bg-[#E2E2E2] 
                         hover:bg-gray-800 dark:hover:bg-white 
                         text-white dark:text-black 
                         font-bold py-3 px-6 rounded-lg 
                         transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         font-inter text-sm relative overflow-hidden 
                         group/button 
                         shadow-lg shadow-gray-900/10 dark:shadow-white/5 
                         hover:shadow-xl hover:shadow-gray-900/20 dark:hover:shadow-white/10"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              </motion.button>
            </form>
          )}
        </div>
      </div>

      {/* Mobile Footer - Separate, only visible on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="pt-8 lg:hidden"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 font-inter text-center">
          © 2026 Designed & Built by Laxman;
        </p>
      </motion.div>
    </section>
  );
};
export default Contact;
