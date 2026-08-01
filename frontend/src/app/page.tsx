"use client";

import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { contactApi } from "@/lib/api";
import { useState, FormEvent, useEffect } from "react";

const NAV_LINKS = [
  { id: "hero", href: "#hero", label: "Home" },
  { id: "about", href: "#about", label: "About" },
  { id: "experience", href: "#experience", label: "Experience" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "contact", href: "#contact", label: "Contact" },
];

const EMAIL = "aishaanjumsiddiqui97@gmail.com";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AI Resume Analyzer",
    description: "An AI tool that scores resumes and gives actionable feedback on how to improve them.",
    tech: ["Next.js", "TypeScript", "AI SDK"],
    github: "https://github.com/Aishasiddiqui97/Ai-Resume-Analyzer",
    demo: "https://ai-resume-analyzer-ebon-eight.vercel.app/",
  },
  {
    title: "AI Todo Evolution",
    description: "A responsive task manager to add, manage, and track tasks with a clean interface.",
    tech: ["React.js", "TypeScript"],
    github: "https://github.com/Aishasiddiqui97/TODO-EVOLUTION-PHASE-5",
    demo: "https://todo-evolution-phase-5-qcbh.vercel.app/",
  },
  {
    title: "Quran Audio Player",
    description: "An audio player for the Quran with multiple reciters and a simple, mobile-friendly interface.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Aishasiddiqui97/Quran-audio-player",
    demo: "https://quran-audio-player.vercel.app/",
  },
  {
    title: "RAG Chatbot",
    description: "A retrieval-augmented chatbot that answers questions using your own documents (book content).",
    tech: ["React", "Python", "FastAPI", "RAG"],
    github: "https://github.com/Aishasiddiqui97/final-book",
  },
  {
    title: "Portfolio Website",
    description: "This portfolio — built with Next.js, TypeScript, and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Aishasiddiqui97/My-Portfolio-",
    demo: "https://aisha-siddiqui-portfolio.vercel.app/",
  },
  {
    title: "Face Vitals AI",
    description: "AI health monitoring that reads vital signs from facial analysis in real time.",
    tech: ["Python", "OpenCV", "Computer Vision"],
    github: "https://github.com/Aishasiddiqui97/Face-Vitals-AI",
  },
  {
    title: "Quad Solutions Health",
    description: "A health management platform for clinics and patients.",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    github: "https://github.com/Aishasiddiqui97/Quad-solutions-frontend",
    demo: "https://quad-solutions-frontend.vercel.app/",
  },
  {
    title: "Personal AI Employee Hackathon 0",
    description: "A hackathon project on building autonomous AI agents that complete work on their own.",
    tech: ["AI Agents", "LLM", "Automation"],
    github: "https://github.com/Aishasiddiqui97/Hackaton-0",
  },
  {
    title: "Unit Converter",
    description: "A simple tool to convert length, weight, and temperature units.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/aishasiddiqui97/projects-giaic/blob/main/unit_convertor.py",
    demo: "https://unitconvertorpy-gzjghyusduxm8doedcqdrh.streamlit.app/",
  },
  {
    title: "Password Strength Meter",
    description: "Checks password strength by length, characters, and complexity, with instant feedback.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/aishasiddiqui97/projects-giaic/blob/main/pasword_strenght_meters.py",
    demo: "https://paswordstrenghtmeterspy-2awyryajvgfaz9ywsqjuqi.streamlit.app/",
  },
  {
    title: "Library Management",
    description: "Manage books — add, view, issue, and track records in one interface.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/aishasiddiqui97/projects-giaic/blob/main/Library_Management.py",
    demo: "https://librarymanagementpy-olhpzagzsljg6mqrjraezr.streamlit.app/",
  },
  {
    title: "Growth Mindset",
    description: "Interactive activities that encourage continuous learning and self-improvement.",
    tech: ["Python", "Streamlit"],
    github: "https://github.com/aishasiddiqui97/project-growth-mindset-/blob/main/project%2014.py",
    demo: "https://aishasiddiqui97.streamlit.app/",
  },
  {
    title: "Modern AI Chat Bot",
    description: "A real-time AI chatbot with natural language responses.",
    tech: ["Python", "Streamlit", "AI"],
    github: "https://github.com/aishasiddiqui97/gemini-/blob/main/chatbot_app.py",
    demo: "https://sodex89xjepehndvvyjpjk.streamlit.app/",
  },
  {
    title: "Physical AI Humanoid & Robotics",
    description: "A hackathon project explaining humanoid robotics and intelligent systems.",
    tech: ["AI", "Robotics"],
    github: "https://github.com/Aishasiddiqui97/hackaton1",
    demo: "https://h-nu-lyart.vercel.app/",
  },
  {
    title: "INTERNSHIP Todo App",
    description: "A full-stack todo app with secure cookie-based authentication.",
    tech: ["Next.js", "MongoDB", "JWT"],
    github: "https://github.com/Aishasiddiqui97/INTERNSHIP-Todo-App",
    demo: "https://internship-tasks-todo-app-yplf.vercel.app/",
  },
  {
    title: "Blog Platform Admin Panel",
    description: "A blog platform with an admin panel, rich text editor, and image upload.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Aishasiddiqui97/Blog-Platform-AdminPanel",
    demo: "https://internship-tasks-blog-platform-admi-ten.vercel.app/",
  },
  {
    title: "E-commerce WebApp",
    description: "A responsive store with product catalog, cart, checkout, and payments.",
    tech: ["Next.js", "React", "Payments"],
    github: "https://github.com/Aishasiddiqui97/-E-commerce-webapp",
    demo: "https://e-commerce-webapp-two.vercel.app/",
  },
  {
    title: "RedPulse SaaS Dashboard",
    description: "A SaaS admin dashboard with auth, analytics, and API key management.",
    tech: ["React", "Vite", "Tailwind CSS"],
    github: "https://github.com/Aishasiddiqui97/redpulse-saas-dashboard",
    demo: "https://redpulse-saas-dashboard.vercel.app/login",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sentVia, setSentVia] = useState<"api" | "mailto" | "">("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPos) current = link.id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (endpoint) {
      try {
        await contactApi.submitContact(formData);
        setFormStatus("sent");
        setSentVia("api");
        setFormData({ name: "", email: "", message: "" });
        return;
      } catch {
        // fall through to email client
      }
    }

    const subject = encodeURIComponent(`Portfolio message from ${formData.name || "a visitor"}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormStatus("sent");
    setSentVia("mailto");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0F0B1F] via-[#1A1333] to-[#0F0B1F] text-[#F8F7FF]">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[#00E5C4] focus:text-[#0F0B1F] focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Animated Background Particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5C4]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4A24C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-[#00E5C4]/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-[#D4A24C]/5 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0F0B1F]/90 backdrop-blur-2xl z-50 border-b border-[#00E5C4]/30 shadow-lg shadow-[#00E5C4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="#hero" className="flex-shrink-0 flex items-center" aria-label="Back to top">
              <span className="text-xl font-bold bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
                AS
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  className={`${
                    activeSection === link.id ? "text-[#00E5C4]" : "text-[#F8F7FF]"
                  } hover:text-[#00E5C4] px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-[#00E5C4]/30`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-md text-[#00E5C4] hover:bg-[#00E5C4]/10"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-[#00E5C4]/20 bg-[#0F0B1F]/95 backdrop-blur-2xl">
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === link.id ? "text-[#00E5C4]" : "text-[#F8F7FF]"
                  } hover:text-[#00E5C4]`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-[#00E5C4] via-[#D4A24C] to-[#00E5C4] bg-clip-text text-transparent">
                  Aisha A. Siddiqui
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#A09FC0] max-w-2xl">
                Full Stack Developer · AI Developer · Fashion Designer — from Karachi, Pakistan. I build AI
                applications, web apps, and software projects that bring technology and creativity together.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/aisha-a-siddiqui-3bb140306/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] font-semibold rounded-lg shadow-lg hover:shadow-[#00E5C4]/30 transition-all duration-500 hover:scale-105"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Aishasiddiqui97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0F0B1F]/30 border border-[#00E5C4]/30 text-[#00E5C4] font-semibold rounded-lg hover:bg-[#00E5C4]/10 transition-all duration-500"
                >
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] font-semibold rounded-lg shadow-lg hover:shadow-[#00E5C4]/30 transition-all duration-500 hover:scale-105"
                >
                  Resume
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] rounded-2xl blur-lg opacity-20 animate-pulse"></div>
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Aisha Siddiqui"
                  width={400}
                  height={400}
                  priority
                  className="relative rounded-full shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-[#1A1333]/70 backdrop-blur-sm border border-[#00E5C4]/30 rounded-lg px-4 py-2 max-w-xs">
                  <p className="text-sm md:text-base font-medium text-[#A09FC0]">
                    <span className="bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
                      Full Stack Developer & 5+ AI Systems
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-[#A09FC0] text-lg">
                I&apos;m a Full Stack Developer and AI Developer from Karachi, Pakistan. I build AI applications, web
                apps, and software projects using React, Next.js, TypeScript, Python, and the OpenAI SDK. Outside of
                code, I&apos;m also a fashion designer, photographer, and artist — I enjoy combining creativity with
                logic.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-[#1A1333] to-[#0F0B1F] rounded-2xl p-6 border border-[#00E5C4]/20 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">My Journey</h3>
                <p className="text-[#A09FC0] mb-4">
                  I started with HTML, CSS, and Python, then kept building from there — first small scripts, then
                  full-stack applications and AI tools like the OpenAI SDK and Claude. Curiosity and a habit of building
                  real things have driven most of my progress.
                </p>
                <p className="text-[#A09FC0]">
                  Today I focus on frontend development and AI-assisted workflows, making applications that are useful
                  first and polished second.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1333]/40 backdrop-blur-sm border-t border-[#00E5C4]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-[#A09FC0] max-w-2xl mx-auto">Where I&apos;ve been building and what I&apos;m working on now.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-bold text-[#00E5C4]">Frontend AI Engineering Intern</h3>
                <p className="text-[#F8F7FF] font-medium">FlyRank</p>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                Current
              </span>
            </div>
            <p className="text-[#A09FC0]">
              Building AI-assisted frontend applications with React, Next.js, TypeScript, and the Vercel AI SDK.
              Delivering weekly projects covering streaming chat interfaces, error and empty states, typed tool calls,
              and structured AI output.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1333]/50 backdrop-blur-sm border-t border-[#00E5C4]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
              My Skills
            </h2>
            <p className="text-[#A09FC0] max-w-2xl mx-auto">
              A blend of technical expertise, creative vision, and continuous learning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Frontend
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Backend
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    AI
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Autonomous AI Agents
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Cloud
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    DevOps
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Full Stack
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Database
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    3D
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    English
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Urdu
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02]">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Fashion Design Certification (Garment Construction, Styling & Illustration)
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Photography & Visual Arts Training
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Computer Skills Training
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Trading Basics Training
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Freelancing Skills Development
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-full text-sm font-medium">
                    Creative Writing Workshop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-[#A09FC0] max-w-2xl mx-auto">
              A selection of the apps and tools I&apos;ve built while learning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-3 text-[#00E5C4]">{project.title}</h3>
                  <p className="text-[#A09FC0] mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#0F0B1F]/40 border border-[#00E5C4]/20 text-[#A09FC0] rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#0F0B1F]/30 border border-[#00E5C4]/30 text-[#00E5C4] rounded-lg text-sm font-medium hover:bg-[#00E5C4]/10 transition-opacity"
                      >
                        Live Demo
                      </a>
                    ) : null}
                    {!project.github && !project.demo ? (
                      <span className="px-4 py-2 bg-[#0F0B1F]/30 border border-[#00E5C4]/20 text-[#A09FC0] rounded-lg text-sm font-medium">
                        Coming soon
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F0B1F]/30 backdrop-blur-sm border-t border-[#00E5C4]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
              Resume
            </h2>
            <p className="text-[#A09FC0] max-w-2xl mx-auto">
              View my experience in development, design, and creative arts.
            </p>
          </div>
          <div className="bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="/resume.pdf"
              className="w-full h-[75vh] border-none"
              title="Aisha Siddiqui Resume"
              aria-label="PDF resume viewer"
              loading="lazy"
            >
              <p className="text-center p-8 text-[#A09FC0]">
                Your browser doesn&apos;t support PDFs.{" "}
                <a href="/resume.pdf" className="text-[#00E5C4] hover:underline" target="_blank" rel="noopener noreferrer">
                  Download the PDF instead
                </a>
                .
              </p>
            </iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F0B1F]/30 backdrop-blur-sm border-t border-[#00E5C4]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-[#A09FC0] max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Send me a message — I&apos;m always open to new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl p-6 shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-[#00E5C4] mr-3 mt-1" aria-hidden="true">
                      📧
                    </span>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${EMAIL}`} className="text-[#A09FC0] hover:text-[#00E5C4] transition-colors">
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00E5C4] mr-3 mt-1" aria-hidden="true">
                      📱
                    </span>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:03323742808" className="text-[#A09FC0] hover:text-[#00E5C4] transition-colors">
                        0332-3742808
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl p-6 shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700">
                <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Follow Me</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/aisha-a-siddiqui-3bb140306/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Aishasiddiqui97"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61557075519526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/as97982/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group relative bg-[#1A1333]/50 backdrop-blur-xl border border-[#00E5C4]/20 rounded-2xl p-6 shadow-xl hover:shadow-[#00E5C4]/30 transition-all duration-700">
              <h3 className="text-xl font-bold mb-4 text-[#00E5C4]">Send a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#A09FC0] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-[#0F0B1F]/50 border border-[#00E5C4]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E5C4]/50 text-[#F8F7FF]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#A09FC0] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-[#0F0B1F]/50 border border-[#00E5C4]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E5C4]/50 text-[#F8F7FF]"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#A09FC0] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full px-4 py-2 bg-[#0F0B1F]/50 border border-[#00E5C4]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E5C4]/50 text-[#F8F7FF]"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {formStatus === "sent" && (
                  <p role="status" className="text-sm text-[#00E5C4]">
                    {sentVia === "api"
                      ? "Thanks! Your message has been sent."
                      : "Your email app should open now — just press send."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00E5C4]/20 py-8 px-4 sm:px-6 lg:px-8 bg-[#0F0B1F]/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A09FC0]">
            © {new Date().getFullYear()} Aisha A. Siddiqui. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Aishasiddiqui97"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#A09FC0] hover:text-[#00E5C4] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aisha-a-siddiqui-3bb140306/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#A09FC0] hover:text-[#00E5C4] transition-colors"
            >
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm text-[#A09FC0] hover:text-[#00E5C4] transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
