import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mousePosition = useRef({ x: 50, y: 50 });
  const rafId = useRef(null);
  const lastUpdate = useRef(0);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
  };

  const scrollToSection = (section) => {
    if (sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile) return;

      const now = Date.now();
      if (now - lastUpdate.current < 16) return;

      lastUpdate.current = now;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        mousePosition.current = {
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        };

        const root = document.documentElement;
        root.style.setProperty("--mouse-x", `${mousePosition.current.x}%`);
        root.style.setProperty("--mouse-y", `${mousePosition.current.y}%`);
      });
    },
    [isMobile],
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        homeRef.current &&
        scrollPosition >= homeRef.current.offsetTop &&
        (!aboutRef.current || scrollPosition < aboutRef.current.offsetTop)
      ) {
        setActiveSection("home");
      } else if (
        aboutRef.current &&
        scrollPosition >= aboutRef.current.offsetTop &&
        (!projectsRef.current || scrollPosition < projectsRef.current.offsetTop)
      ) {
        setActiveSection("about");
      } else if (
        projectsRef.current &&
        scrollPosition >= projectsRef.current.offsetTop &&
        (!experienceRef.current ||
          scrollPosition < experienceRef.current.offsetTop)
      ) {
        setActiveSection("projects");
      } else if (
        experienceRef.current &&
        scrollPosition >= experienceRef.current.offsetTop &&
        (!contactRef.current || scrollPosition < contactRef.current.offsetTop)
      ) {
        setActiveSection("experience");
      } else if (
        contactRef.current &&
        scrollPosition >= contactRef.current.offsetTop
      ) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [
    homeRef,
    aboutRef,
    projectsRef,
    experienceRef,
    contactRef,
    handleMouseMove,
    isMobile,
  ]);

  return (
    <div className="portfolio">
      {!isMobile && (
        <>
          <div className="particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <div className="wave-layer wave-1"></div>
          <div className="wave-layer wave-2"></div>
          <div className="wave-layer wave-3"></div>

          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </>
      )}

      <Head>
        <title>Felipe Paraizo | Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Desenvolvedor Full Stack especializado em React, Next.js e Node.js. Criando soluções digitais inovadoras e de alto desempenho."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main className="main-content">
        <HeroSection ref={homeRef} />
        <AboutSection ref={aboutRef} />
        <ProjectsSection ref={projectsRef} />
        <ExperienceSection ref={experienceRef} />
        <ContactSection ref={contactRef} />
      </main>

      <Footer />

      <style jsx global>{`
        :root {
          --primary-green: #084734;
          --primary-green-dark: #063626;
          --primary-green-light: #0a5942;
          --accent-lime: #cef17b;
          --accent-lime-dark: #b8d46a;
          --accent-lime-light: #e0f7a4;
          --secondary-mint: #ceedb2;
          --secondary-mint-dark: #b4d49a;
          --secondary-mint-light: #e2f4d0;
          --dark: #0a1f18;
          --darker: #05140f;
          --light: #f8faf9;
          --gray: #94a39c;
          --gray-light: #e2e8e5;
          --gray-dark: #64746b;
          --success: #10b981;
          --primary: var(--primary-green);
          --primary-dark: var(--primary-green-dark);
          --primary-light: var(--primary-green-light);
          --accent: var(--accent-lime);
          --secondary: var(--secondary-mint);
          --border-radius: 12px;
          --shadow-sm: 0 1px 2px 0 rgba(4, 71, 52, 0.05);
          --shadow:
            0 4px 6px -1px rgba(4, 71, 52, 0.1),
            0 2px 4px -1px rgba(4, 71, 52, 0.06);
          --shadow-lg:
            0 10px 15px -3px rgba(4, 71, 52, 0.1),
            0 4px 6px -2px rgba(4, 71, 52, 0.05);
          --shadow-xl:
            0 20px 25px -5px rgba(4, 71, 52, 0.1),
            0 10px 10px -5px rgba(4, 71, 52, 0.04);
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }

        body {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            sans-serif;
          line-height: 1.6;
          color: var(--light);
          background: var(--darker);
          overflow-x: hidden;
          min-height: 100vh;
        }

        .portfolio {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(
            135deg,
            var(--darker) 0%,
            var(--dark) 50%,
            var(--darker) 100%
          );
          overflow: hidden;
        }

        .main-content {
          position: relative;
          z-index: 10;
          width: 100%;
          padding-top: 80px;
        }

        .portfolio::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .desktop-bg {
          background:
            radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              rgba(8, 71, 52, 0.4) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at calc(100% - var(--mouse-x)) calc(100% - var(--mouse-y)),
              rgba(206, 241, 123, 0.25) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at var(--mouse-y) var(--mouse-x),
              rgba(206, 237, 178, 0.2) 0%,
              transparent 60%
            ),
            radial-gradient(
              circle at 20% 30%,
              rgba(10, 89, 66, 0.3) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(184, 212, 106, 0.2) 0%,
              transparent 40%
            ),
            linear-gradient(
              135deg,
              rgba(5, 20, 15, 0.85) 0%,
              rgba(8, 71, 52, 0.4) 50%,
              rgba(5, 20, 15, 0.85) 100%
            );
          animation: gradientShift 20s ease-in-out infinite;
        }

        .mobile-bg {
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(8, 71, 52, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(206, 241, 123, 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 80%,
              rgba(206, 237, 178, 0.15) 0%,
              transparent 60%
            ),
            linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
        }

        .portfolio::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .desktop-pattern {
          background-image:
            linear-gradient(
              45deg,
              transparent 49%,
              rgba(206, 241, 123, 0.04) 50%,
              transparent 51%
            ),
            linear-gradient(
              -45deg,
              transparent 49%,
              rgba(206, 237, 178, 0.03) 50%,
              transparent 51%
            ),
            radial-gradient(
              circle at 0% 25%,
              rgba(206, 241, 123, 0.1) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 50% 75%,
              rgba(206, 237, 178, 0.08) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 100% 25%,
              rgba(8, 71, 52, 0.15) 2px,
              transparent 2px
            );
          background-size:
            80px 80px,
            80px 80px,
            150px 150px,
            150px 150px,
            200px 200px;
          opacity: 0.5;
          animation: geometricFlow 25s linear infinite;
        }

        .mobile-pattern {
          background-image: radial-gradient(
            circle at 50% 50%,
            rgba(206, 241, 123, 0.1) 1px,
            transparent 1px
          );
          background-size: 80px 80px;
          opacity: 0.3;
        }

        .wave-layer {
          position: fixed;
          width: 200%;
          height: 200%;
          opacity: 0.15;
          z-index: 2;
          pointer-events: none;
          border-radius: 45%;
          will-change: transform;
        }

        .wave-1 {
          background: radial-gradient(
            circle,
            var(--accent-lime) 0%,
            transparent 70%
          );
          top: -50%;
          left: -50%;
          animation: waveMove 18s ease-in-out infinite;
        }

        .wave-2 {
          background: radial-gradient(
            circle,
            var(--secondary-mint) 0%,
            transparent 70%
          );
          top: -60%;
          left: -40%;
          animation: waveMove 22s ease-in-out infinite reverse;
          opacity: 0.12;
        }

        .wave-3 {
          background: radial-gradient(
            circle,
            var(--primary-green-light) 0%,
            transparent 70%
          );
          top: -40%;
          left: -60%;
          animation: waveMove 26s ease-in-out infinite;
          opacity: 0.1;
        }

        .floating-element {
          position: fixed;
          border-radius: 50%;
          z-index: 3;
          pointer-events: none;
          filter: blur(1px);
          will-change: transform;
        }

        .element-1 {
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            rgba(206, 241, 123, 0.15) 0%,
            transparent 70%
          );
          top: 10%;
          left: 5%;
          animation: floatElement 25s ease-in-out infinite;
        }

        .element-2 {
          width: 80px;
          height: 80px;
          background: radial-gradient(
            circle,
            rgba(206, 237, 178, 0.12) 0%,
            transparent 70%
          );
          top: 70%;
          left: 85%;
          animation: floatElement 30s ease-in-out infinite reverse;
        }

        .element-3 {
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            rgba(8, 71, 52, 0.2) 0%,
            transparent 70%
          );
          top: 50%;
          left: 10%;
          animation: floatElement 35s ease-in-out infinite;
        }

        .element-4 {
          width: 100px;
          height: 100px;
          background: radial-gradient(
            circle,
            rgba(10, 89, 66, 0.18) 0%,
            transparent 70%
          );
          top: 20%;
          left: 80%;
          animation: floatElement 28s ease-in-out infinite reverse;
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 4;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: particleFloat 10s ease-in-out infinite;
          opacity: 0.2;
          will-change: transform;
        }

        .particle:nth-child(1) {
          width: 6px;
          height: 6px;
          background: var(--accent-lime);
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }
        .particle:nth-child(2) {
          width: 8px;
          height: 8px;
          background: var(--secondary-mint);
          top: 65%;
          left: 82%;
          animation-delay: -2s;
        }
        .particle:nth-child(3) {
          width: 4px;
          height: 4px;
          background: var(--accent-lime-light);
          top: 85%;
          left: 15%;
          animation-delay: -4s;
        }
        .particle:nth-child(4) {
          width: 7px;
          height: 7px;
          background: var(--primary-green-light);
          top: 35%;
          left: 92%;
          animation-delay: -1s;
        }
        .particle:nth-child(5) {
          width: 5px;
          height: 5px;
          background: var(--accent-lime);
          top: 12%;
          left: 55%;
          animation-delay: -3s;
        }
        .particle:nth-child(6) {
          width: 3px;
          height: 3px;
          background: var(--secondary-mint-light);
          top: 75%;
          left: 25%;
          animation-delay: -5s;
        }
        .particle:nth-child(7) {
          width: 9px;
          height: 9px;
          background: var(--primary-green);
          top: 45%;
          left: 5%;
          animation-delay: -1.5s;
        }
        .particle:nth-child(8) {
          width: 5px;
          height: 5px;
          background: var(--accent-lime);
          top: 90%;
          left: 65%;
          animation-delay: -3.5s;
        }

        @keyframes gradientShift {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(0.5deg) scale(1.01);
          }
          50% {
            transform: rotate(-0.5deg) scale(1.02);
          }
          75% {
            transform: rotate(0.3deg) scale(1.01);
          }
        }

        @keyframes geometricFlow {
          0% {
            background-position:
              0% 0%,
              0% 0%,
              0% 0%,
              0% 0%,
              0% 0%;
          }
          100% {
            background-position:
              100px 100px,
              -100px -100px,
              300px 300px,
              -300px -300px,
              400px 400px;
          }
        }

        @keyframes waveMove {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-3%, 2%) rotate(1deg) scale(1.05);
          }
          50% {
            transform: translate(2%, -1%) rotate(-0.5deg) scale(1.03);
          }
          75% {
            transform: translate(-1%, 3%) rotate(0.5deg) scale(1.04);
          }
        }

        @keyframes floatElement {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          20% {
            transform: translate(20px, -15px) rotate(3deg) scale(1.05);
            opacity: 0.5;
          }
          40% {
            transform: translate(-15px, 20px) rotate(-2deg) scale(0.95);
            opacity: 0.45;
          }
          60% {
            transform: translate(18px, 12px) rotate(1deg) scale(1.03);
            opacity: 0.55;
          }
          80% {
            transform: translate(-12px, -18px) rotate(-1deg) scale(0.98);
            opacity: 0.45;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.15;
          }
          20% {
            transform: translateY(-25px) translateX(15px) scale(1.1);
            opacity: 0.2;
          }
          40% {
            transform: translateY(15px) translateX(-20px) scale(0.9);
            opacity: 0.25;
          }
          60% {
            transform: translateY(-18px) translateX(10px) scale(1.05);
            opacity: 0.22;
          }
          80% {
            transform: translateY(8px) translateX(-15px) scale(0.95);
            opacity: 0.17;
          }
        }

        .main-content > * {
          position: relative;
          z-index: 20;
        }

        ::selection {
          background: var(--accent-lime);
          color: var(--primary-green);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-section {
          padding: 8rem 0 6rem 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .main-section {
          padding: 5rem 0;
        }

        .secondary-section {
          padding: 4rem 0;
        }

        .contact-section {
          padding: 3rem 0;
        }

        .section-title {
          font-size: 2.75rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(
            135deg,
            var(--accent-lime) 0%,
            var(--secondary-mint) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          line-height: 1.2;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--accent-lime),
            var(--primary-green)
          );
          border-radius: 2px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--gray-light);
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .grid-container {
          display: grid;
          gap: 2rem;
          margin-top: 2rem;
        }

        .grid-2 {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .grid-3 {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: var(--border-radius);
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent-lime),
            transparent
          );
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(206, 241, 123, 0.3);
          box-shadow:
            0 10px 30px rgba(8, 71, 52, 0.2),
            0 5px 15px rgba(206, 241, 123, 0.1);
        }

        .card-small {
          padding: 1.5rem;
        }

        .card-large {
          padding: 2.5rem;
        }

        .card-header {
          margin-bottom: 1.5rem;
        }

        .card-body {
          margin-bottom: 1.5rem;
        }

        .card-footer {
          margin-top: auto;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
          text-align: center;
          min-width: 140px;
        }

        .btn-small {
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          min-width: 120px;
        }

        .btn-large {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          min-width: 160px;
        }

        .btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(
            135deg,
            var(--primary-green),
            var(--primary-green-dark)
          );
          color: var(--light);
          box-shadow: var(--shadow-lg);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
          background: linear-gradient(
            135deg,
            var(--primary-green-light),
            var(--primary-green)
          );
        }

        .btn-secondary {
          background: transparent;
          color: var(--accent-lime);
          border: 2px solid var(--accent-lime);
        }

        .btn-secondary:hover {
          background: rgba(206, 241, 123, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(206, 241, 123, 0.2);
        }

        .list {
          list-style: none;
          margin: 1.5rem 0;
        }

        .list-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(206, 237, 178, 0.1);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .list-item:last-child {
          border-bottom: none;
        }

        .text-lead {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--secondary-mint);
          margin-bottom: 1.5rem;
        }

        .text-body {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--gray-light);
          margin-bottom: 1rem;
        }

        .text-small {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--gray);
        }

        @media (min-width: 769px) {
          .portfolio::before {
            background:
              radial-gradient(
                circle at var(--mouse-x) var(--mouse-y),
                rgba(8, 71, 52, 0.4) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at calc(100% - var(--mouse-x))
                  calc(100% - var(--mouse-y)),
                rgba(206, 241, 123, 0.25) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at var(--mouse-y) var(--mouse-x),
                rgba(206, 237, 178, 0.2) 0%,
                transparent 60%
              ),
              radial-gradient(
                circle at 20% 30%,
                rgba(10, 89, 66, 0.3) 0%,
                transparent 40%
              ),
              radial-gradient(
                circle at 80% 70%,
                rgba(184, 212, 106, 0.2) 0%,
                transparent 40%
              ),
              linear-gradient(
                135deg,
                rgba(5, 20, 15, 0.85) 0%,
                rgba(8, 71, 52, 0.4) 50%,
                rgba(5, 20, 15, 0.85) 100%
              );
            animation: gradientShift 20s ease-in-out infinite;
          }

          .portfolio::after {
            background-image:
              linear-gradient(
                45deg,
                transparent 49%,
                rgba(206, 241, 123, 0.04) 50%,
                transparent 51%
              ),
              linear-gradient(
                -45deg,
                transparent 49%,
                rgba(206, 237, 178, 0.03) 50%,
                transparent 51%
              ),
              radial-gradient(
                circle at 0% 25%,
                rgba(206, 241, 123, 0.1) 1px,
                transparent 1px
              ),
              radial-gradient(
                circle at 50% 75%,
                rgba(206, 237, 178, 0.08) 1px,
                transparent 1px
              ),
              radial-gradient(
                circle at 100% 25%,
                rgba(8, 71, 52, 0.15) 2px,
                transparent 2px
              );
            background-size:
              80px 80px,
              80px 80px,
              150px 150px,
              150px 150px,
              200px 200px;
            opacity: 0.5;
            animation: geometricFlow 25s linear infinite;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          .main-content {
            padding-top: 60px;
          }

          .hero-section {
            padding: 0 0 4rem 0;
            min-height: auto;
          }

          .about-section,
          .projects-section,
          .experience-section,
          .contact-section {
            scroll-margin-top: 80px;
          }

          .main-section {
            padding: 3rem 0;
          }

          .secondary-section {
            padding: 2.5rem 0;
          }

          .contact-section {
            padding: 2rem 0;
          }

          .section-title {
            font-size: 2.25rem;
            margin-bottom: 2rem;
          }

          .section-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .grid-container {
            gap: 1.5rem;
            margin-top: 1.5rem;
          }

          .card {
            padding: 1.5rem;
          }

          .card-large {
            padding: 2rem;
          }

          .portfolio::before {
            background:
              radial-gradient(
                circle at 20% 30%,
                rgba(8, 71, 52, 0.3) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 80% 70%,
                rgba(206, 241, 123, 0.2) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 40% 80%,
                rgba(206, 237, 178, 0.15) 0%,
                transparent 60%
              ),
              linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
          }

          .portfolio::after {
            background-image: radial-gradient(
              circle at 50% 50%,
              rgba(206, 241, 123, 0.1) 1px,
              transparent 1px
            );
            background-size: 80px 80px;
            opacity: 0.3;
            animation: none;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }

          .main-content {
            padding-top: 60px;
          }

          .hero-section {
            padding: 0 0 2rem 0;
          }

          .main-section {
            padding: 2.5rem 0;
          }

          .secondary-section {
            padding: 2rem 0;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }

          .card {
            padding: 1.25rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        .mb-1 {
          margin-bottom: 0.5rem;
        }
        .mb-2 {
          margin-bottom: 1rem;
        }
        .mb-3 {
          margin-bottom: 1.5rem;
        }
        .mb-4 {
          margin-bottom: 2rem;
        }
        .mb-5 {
          margin-bottom: 3rem;
        }

        .mt-1 {
          margin-top: 0.5rem;
        }
        .mt-2 {
          margin-top: 1rem;
        }
        .mt-3 {
          margin-top: 1.5rem;
        }
        .mt-4 {
          margin-top: 2rem;
        }
        .mt-5 {
          margin-top: 3rem;
        }

        .py-1 {
          padding: 0.5rem 0;
        }
        .py-2 {
          padding: 1rem 0;
        }
        .py-3 {
          padding: 1.5rem 0;
        }
        .py-4 {
          padding: 2rem 0;
        }
        .py-5 {
          padding: 3rem 0;
        }
      `}</style>
    </div>
  );
}
