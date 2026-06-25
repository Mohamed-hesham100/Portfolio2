"use client";

import { useState, useEffect } from "react";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const experiences = [
  {
    year: "Early 2024",
    title: "CS Student & Self-Taught Dev",
    company: "Faculty of Computers and Information",
    description:
      "Combined academic foundations in Data Structures with intensive self-learning in the JavaScript/TypeScript ecosystem. Developed 15+ foundational projects, mastering clean code principles and modern DevOps deployment workflows.",
  },
  {
    year: "2024 — 2025",
    title: "Software Developer (MERN Stack)",
    company: "Freelance & Diverse Projects",
    description:
      "Engineered real-time communication systems using Socket.io and Node.js. Built robust E-commerce platforms with Next.js, focusing on performance optimization, database schema design, and seamless AI-driven backend integrations. Delivered diverse web solutions including real-time chat, e-commerce, and custom applications for various clients.",
  },
  {
    year: "2025 — Present",
    title: "Full-Stack Engineer (Backend Specialist)",
    company: "Freelance & Specialized Projects",
    description:
      "Architected and scaled complex backend systems using NestJS and PostgreSQL. Developed a high-traffic educational platform, implementing advanced routing logic, RBAC (Role-Based Access Control), and secure RESTful APIs to manage interactions between teachers and students efficiently.",
  },
  {
    year: "2026 — Present",
    title: "DevOps Engineer & Deployment Maintainer",
    company: "Infrastructure & Cloud Operations",
    description:
      "Orchestrated comprehensive DevOps workflows implementing Linux server management, PM2 process management, SSH secure access, SSL/TLS certificate automation, and DNS configuration. Established GitHub Actions CI/CD pipelines for automated testing and deployment, containerized applications with Docker, and maintained production infrastructure with 99.9% uptime.",
  },
];

const projects = [
  {
    title: "MedSupplySA",
    description:
      "Saudi medical e-commerce platform for healthcare products with integrated Saudi payment gateways, secure checkout, and comprehensive product management.",
    tags: ["Next.js", "TypeScript", "Node.js", "Saudi Payments"],
    link: "https://medsupplysa.com/",
  },
  {
    title: "LMS",
    description:
      "A full-stack educational platform with robust backend architecture, custom routing, and secure student-teacher portals.",
    tags: ["Express.js", "PostgreSQL", "Next.js", "Node.js"],
    link: "https://frontend-lms-f775.vercel.app/",
  },
  {
    title: "Al-Alamein Hotel System",
    description:
      "Enterprise-grade hospitality management system with real-time booking engines and secure payment gateway integration.",
    tags: ["Express.js", "React", "MongoDB", "Node.js"],
    link: "https://www.alalameinhotel.com/en/",
  },
  {
    title: "Real-time Chat",
    description:
      "Scalable messaging platform using Socket.io for instant communication and high-performance data streaming.",
    tags: ["Socket.io", "Express.js", "Node.js", "Redis"],
    link: "https://chat-app-hb1u.vercel.app/",
  },
  {
    title: "JobConnect",
    description:
      "Full-stack recruitment portal featuring advanced filtering, application tracking, and automated status updates.",
    tags: ["Express.js", "React", "MongoDB", "Node.js"],
    link: "https://job-portal-mocha-seven.vercel.app/",
  },
  {
    title: "Global E-commerce ",
    description:
      "Modern retail platform with complex inventory management, multi-currency support, and optimized checkout flows.",
    tags: ["Express.js", "Next.js", "MongoDB"],
    link: "https://egypt.sharafdg.com/",
  },
  {
    title: "E-commerce ",
    description:
      "Modern retail platform with complex inventory management, multi-currency support, and optimized checkout flows.",
    tags: ["Next.js", "MongoDB"],
    link: "https://ecommerce-frontend-e6fp.vercel.app/",
  },
  {
    title: "Vibe Nightclub Experience",
    description:
      "A premium Next.js platform featuring event booking, interactive gallery, and dynamic reservation management.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://night-glup.vercel.app/",
  },
  {
    title: "Luxury Real Estate Showcase",
    description:
      "High-end property listing site with interactive maps, lead generation, and optimized image processing.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://landing-page-realstate.vercel.app/",
  },
  {
    title: "Brand Store",
    description:
      "E-commerce frontend for a clothing brand focused on high-end UI/UX and seamless navigation.",
    tags: ["React", "Styled Components", "Tailwind"],
    link: "https://brand-landing-page-chi.vercel.app/",
  },
  {
    title: "Restaurant",
    description:
      "Professional restaurant interface featuring digital menus, online reservations, and a custom contact system.",
    tags: ["React", "Tailwind CSS", "AOS"],
    link: "https://landing-page-restaurant-psi.vercel.app/",
  },
  {
    title: "Female Fashion Boutique",
    description:
      "Clean and modern frontend for a fashion store with dynamic product filtering and responsive design.",
    tags: ["React", "Context API", "Tailwind"],
    link: "#",
  },
];

const skills = [
  {
    category: "Backend",
    items: [
      "NestJS",
      "Express.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Socket.io",
      "REST APIs",
    ],
  },
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Linux",
      "PM2",
      "SSH",
      "SSL/TLS",
      "DNS",
      "Docker",
      "GitHub Actions (CI/CD)",
    ],
  },
  {
    category: "Specialized",
    items: [
      "AI Integration",
      "System Architecture",
      "Database Design",
      "Security (JWT/RBAC)",
      "Unit Testing",
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Mohamed-hesham100",
  },
  {
    label: "GitHub",
    href: "https://github.com/Mohamedasddf",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-h-3362b53a1/",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState({
    about: false,
    experience: false,
    skills: false,
    projects: false,
    contact: false,
  });
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    // Generate particles only on client
    const generatedParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      size: Math.random() * 4 + 2,
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const experienceSection = document.getElementById('experience');
      const skillsSection = document.querySelector('section:nth-of-type(4)');
      const projectsSection = document.getElementById('projects');
      const contactSection = document.getElementById('contact');

      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsVisible(prev => ({ ...prev, about: rect.top < window.innerHeight * 0.8 }));
      }
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        setIsVisible(prev => ({ ...prev, experience: rect.top < window.innerHeight * 0.8 }));
      }
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        setIsVisible(prev => ({ ...prev, skills: rect.top < window.innerHeight * 0.8 }));
      }
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        setIsVisible(prev => ({ ...prev, projects: rect.top < window.innerHeight * 0.8 }));
      }
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        setIsVisible(prev => ({ ...prev, contact: rect.top < window.innerHeight * 0.8 }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Particle Background */}
      {isMounted && (
        <div className="particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#050508] via-[#0f172a] to-[#050508] pointer-events-none" />

      {/* Gradient Orbs */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 hidden lg:flex w-80 h-screen flex-col justify-between border-r border-border/30 glass-strong px-8 py-12 overflow-hidden z-50">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 border-r-2 border-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500 opacity-50 animate-gradient-shift" />

        <div className="relative z-10 animate-slideInLeft">
          <div className="mb-20">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-4">
              <p className="text-xs font-semibold gradient-text uppercase tracking-widest">
                &lt;Developer/&gt;
              </p>
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              <span className="gradient-text">Mohamed</span>
              <br />
              <span className="text-foreground">Hisham</span>
            </h1>
          </div>
          <nav className="space-y-2">
            {navigation.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                className="group block text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 hover:border hover:border-emerald-500/30 relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-teal-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
            ))}
          </nav>
        </div>
        <div className="relative z-10 space-y-6 animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Building elegant interfaces and scalable systems with modern technologies.
          </p>
          <div className="space-y-3">
            {socials.map((social, idx) => (
              <a
                key={social.href}
                href={social.href}
                className="flex items-center gap-3 text-xs text-muted-foreground hover:text-accent transition-all duration-300 group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-teal-500 group-hover:animate-pulse transition-colors" />
                <span className="group-hover:translate-x-1 transition-transform">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-strong border-b border-border/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg gradient-text">Mohamed Hisham</h1>
          <div className="flex gap-4 text-xs">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Hero Section */}
        <section className="px-6 lg:px-16  pb-24 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-8 animate-slideInLeft">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 animate-bounce-subtle">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold gradient-text uppercase tracking-widest">
                    Full Stack Engineer
                  </span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <span className="animate-text-shimmer">I build</span>
                  <br />
                  <span className="gradient-text">extraordinary</span>
                  <br />
                  <span className="text-foreground">web experiences.</span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Passionate about creating elegant solutions to complex problems.
                Specializing in full-stack development with focus on user
                experience, performance, and accessibility.
              </p>
              <div className="flex gap-4 pt-6">
                <a
                  href="https://drive.google.com/file/d/1y_cvMXVzSAzAy_zNQo_DjYeT50jCvZac/view?usp=sharing"
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
                >
                  <span className="relative z-10">View My CV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a
                  href="#projects"
                  className="group px-8 py-4 border-2 border-emerald-500/50 text-emerald-400 font-semibold text-sm rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10">Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-teal-500/20 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="lg:col-span-1 flex justify-center animate-slideInRight">
              <div className="relative w-full max-w-sm group">
                {/* Animated glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-glow" />

                {/* Rotating border */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl opacity-20 animate-rotate-slow" style={{ animationDuration: '10s' }} />

                {/* Image container */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors duration-500 shadow-2xl group-hover:shadow-emerald-500/30 transition-all">
                  <img
                    src="/profile.jpg"
                    alt="Mohamed Hisham - Full Stack Developer"
                    className="w-full h-auto aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`px-6 lg:px-16 py-32 border-t border-border/30 max-w-6xl relative transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold gradient-text uppercase tracking-widest sticky top-8">
                About Me
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg leading-relaxed">
                I am a <span className="gradient-text font-semibold">Full-Stack Engineer & DevOps Specialist</span> with over 2.5 years of hands-on
                experience, deeply rooted in the <span className="text-amber-400">JavaScript/TypeScript</span>
                ecosystem. While I excel across the entire stack using <span className="text-teal-400">React</span>
                and <span className="text-teal-400">Next.js</span>, my true passion lies in architecting robust
                <span className="text-amber-400"> Back-end</span> systems with <span className="text-teal-400">Node.js</span> and <span className="text-teal-400">NestJS</span>.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                From developing complex <span className="text-amber-400">E-commerce</span> platforms to building
                <span className="text-teal-400"> Real-time Chat</span> applications using <span className="text-amber-400">Socket.io</span>, I focus on
                creating scalable, high-performance solutions. Currently, I am
                bridging the gap between web development and <span className="gradient-text">AI integration</span>,
                while managing deployments through <span className="text-teal-400">Cloud & DevOps</span> workflows including Linux server management, Docker containerization, and GitHub Actions CI/CD pipelines.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                As a <span className="text-amber-400">Computer Science student</span> and a self-taught developer, I
                combine academic foundations with a relentless drive to master
                new technologies. I thrive on solving complex logic puzzles and
                optimizing database performance with <span className="text-teal-400">PostgreSQL</span> and
                <span className="text-teal-400">MongoDB</span>, while maintaining production infrastructure with 99.9% uptime through automated deployment strategies.
              </p>

              <div className="pt-8 grid grid-cols-3 gap-4">
                <div className="group p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <p className="text-3xl font-bold gradient-text">2.5+</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Years Experience
                  </p>
                </div>
                <div className="group p-6 rounded-2xl glass border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                  <p className="text-3xl font-bold gradient-text-secondary">Hybrid</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    CS & Self-Taught
                  </p>
                </div>
                <div className="group p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <p className="text-3xl font-bold gradient-text">AI-Ready</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tech Mindset
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className={`px-6 lg:px-16 py-32 border-t border-border/30 max-w-6xl relative transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold gradient-text uppercase tracking-widest sticky top-8">
                Experience
              </h2>
            </div>
            <div className="lg:col-span-3">
              {/* Timeline */}
              <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent" />

                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-20 group">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 border-4 border-background group-hover:scale-125 transition-transform duration-300 animate-pulse" />

                    {/* Card */}
                    <div className="group p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold gradient-text uppercase tracking-wider">
                          {exp.year}
                        </p>
                        <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-medium text-teal-400">
                          @ {exp.company}
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed pt-2">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className={`px-6 lg:px-16 py-32 border-t border-border/30 max-w-6xl relative transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold gradient-text uppercase tracking-widest sticky top-8">
                Skills & Tools
              </h2>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-6">
                {skills.map((skillGroup, idx) => (
                  <div
                    key={skillGroup.category}
                    className="group p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/50 bg-card hover:bg-emerald-500/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                  >
                    <h3 className="text-sm font-bold gradient-text mb-4 group-hover:translate-x-1 transition-transform flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {skillGroup.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {skillGroup.items.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`px-6 lg:px-16 py-32 border-t border-border/30 max-w-6xl relative transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold gradient-text uppercase tracking-widest sticky top-8">
                Featured Projects
              </h2>
            </div>
            <div className="lg:col-span-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                A selection of recent projects showcasing my expertise in
                building scalable, performant web applications with modern
                technologies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                className="group relative overflow-hidden p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/50 bg-card hover:bg-emerald-500/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors flex-1">
                      {project.title}
                    </h3>
                    <span className="text-2xl text-muted-foreground group-hover:text-teal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl" />
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`px-6 lg:px-16 py-32 border-t border-border/30 max-w-6xl relative transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold gradient-text uppercase tracking-widest sticky top-8">
                Contact
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-2xl lg:text-3xl font-bold mb-4 gradient-text">
                  Let's build something amazing together.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and
                  opportunities. Whether you need help building something new or
                  improving existing systems, I'd love to connect.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl glass border border-emerald-500/30 bg-card text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all hover:border-emerald-500/50"
                  />
                  <button
                    type="submit"
                    className="group px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap relative overflow-hidden"
                  >
                    <span className="relative z-10">{submitted ? "Sent ✓" : "Send Message"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </form>

              <div className="space-y-4 pt-8 border-t border-border/30">
                <p className="text-xs font-semibold gradient-text uppercase tracking-wider">
                  Connect
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/Mohamed-hesham100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center p-4 rounded-xl glass border border-emerald-500/20 hover:border-emerald-500/50 bg-card hover:bg-emerald-500/5 text-muted-foreground hover:text-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                    title="GitHub"
                  >
                    <svg
                      className="w-5 h-5 group-hover:animate-bounce-subtle"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/mohamed-h-3362b53a1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center p-4 rounded-xl glass border border-cyan-500/20 hover:border-cyan-500/50 bg-card hover:bg-cyan-500/5 text-muted-foreground hover:text-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
                    title="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5 group-hover:animate-bounce-subtle"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:mh1351448@gmail.com"
                    className="group flex items-center justify-center p-4 rounded-xl glass border border-emerald-500/20 hover:border-emerald-500/50 bg-card hover:bg-emerald-500/5 text-muted-foreground hover:text-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                    title="Email"
                  >
                    <svg
                      className="w-5 h-5 group-hover:animate-bounce-subtle"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="px-6 lg:px-16 py-20 border-t border-border text-sm text-muted-foreground bg-gradient-to-br from-background to-accent/5">
          <div className="max-w-5xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="font-bold text-foreground text-lg">Alex Dev</p>
                <p className="text-sm text-muted-foreground">
                  Building elegant interfaces and scalable systems.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-accent uppercase tracking-widest">
                  Quick Links
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#about"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-accent uppercase tracking-widest">
                  Connect
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="p-2.5 rounded-lg border border-border bg-card hover:border-accent/50 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300"
                    title="GitHub"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2.5 rounded-lg border border-border bg-card hover:border-accent/50 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300"
                    title="Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2.5 rounded-lg border border-border bg-card hover:border-accent/50 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300"
                    title="LinkedIn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="mailto:hello@example.com"
                    className="p-2.5 rounded-lg border border-border bg-card hover:border-accent/50 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300"
                    title="Email"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
              <p>© 2024 Alex Dev. All rights reserved.</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-sm hover:text-accent transition-colors duration-300"
                >
                  Imprint
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-accent transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}
