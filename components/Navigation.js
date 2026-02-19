import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({
  href,
  section,
  children,
  setIsMenuOpen,
  handleNavigation,
}) => {
  const isInternal = !!section;

  if (isInternal) {
    return (
      <a
        href={`/#${section}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(section);
        }}
        className="nav-link"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={() => setIsMenuOpen(false)} className="nav-link">
      {children}
    </Link>
  );
};

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const router = useRouter();

  const handleNavigation = (section) => {
    setIsMenuOpen(false);

    if (router.pathname === "/") {
      const sectionIds = {
        home: "home",
        about: "about",
        projects: "projects",
        experience: "experience",
        contact: "contact",
      };

      const elementId = sectionIds[section];
      const element = document.getElementById(elementId);

      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: section === "home" ? 0 : offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      router.push(`/#${section}`);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (router.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const commonProps = {
    router,
    setIsMenuOpen,
    handleNavigation,
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" onClick={handleLogoClick} className="logo-link">
            Felipe Paraizo
          </Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <NavLink section="home" {...commonProps}>
            Início
          </NavLink>
          <NavLink section="about" {...commonProps}>
            Sobre
          </NavLink>
          <NavLink section="projects" {...commonProps}>
            Projetos
          </NavLink>
          <NavLink section="experience" {...commonProps}>
            Experiência
          </NavLink>
          <NavLink href="/commits" {...commonProps}>
            Commits
          </NavLink>
          <NavLink section="contact" {...commonProps}>
            Contato
          </NavLink>
        </div>

        <div className="nav-actions">
          <Link
            href="/#contact"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("contact");
            }}
          >
            Contratar
          </Link>
          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(1, 26, 17, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(206, 241, 123, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .nav-logo :global(.logo-link) {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8faf9;
          text-decoration: none;
          background: linear-gradient(135deg, #cef17b, #ceedb2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
        }

        .nav-logo :global(.logo-link:hover) {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #ceedb2, #cef17b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-menu :global(.nav-link) {
          color: #e2e8e5;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
          position: relative;
          cursor: pointer;
        }

        .nav-menu :global(.nav-link:hover) {
          color: #cef17b;
          transform: translateY(-1px);
        }

        .nav-menu :global(.nav-link::after) {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #cef17b;
          transition: width 0.3s ease;
        }

        .nav-menu :global(.nav-link:hover::after) {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-actions :global(.btn-primary) {
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #084734, #063626);
          color: #f8faf9;
          border: none;
          box-shadow: 0 4px 15px rgba(8, 71, 52, 0.3);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .nav-actions :global(.btn-primary:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(8, 71, 52, 0.4);
          background: linear-gradient(135deg, #0a5942, #084734);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 18px;
          position: relative;
          padding: 0;
          z-index: 1001;
        }

        .menu-toggle span {
          display: block;
          height: 2px;
          width: 100%;
          background: #cef17b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
          border-radius: 1px;
        }

        .menu-toggle span:nth-child(1) {
          transform: translateY(0);
        }
        .menu-toggle span:nth-child(2) {
          transform: translateY(6px);
        }
        .menu-toggle span:nth-child(3) {
          transform: translateY(12px);
        }

        .menu-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        .menu-toggle.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        .menu-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .nav-menu.active::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(3px);
          z-index: -1;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .nav-container {
            padding: 1rem 1.5rem;
          }
          .nav-menu {
            gap: 1.5rem;
          }
          .nav-menu :global(.nav-link) {
            font-size: 0.9rem;
          }
          .nav-actions :global(.btn-primary) {
            padding: 0.625rem 1.25rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 1rem 1.5rem;
          }
          .menu-toggle {
            display: flex;
          }
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: rgba(1, 26, 17, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            border-left: 1px solid rgba(206, 241, 123, 0.1);
            transition: right 0.3s ease;
            z-index: 1000;
            padding: 2rem 1rem;
          }
          .nav-menu.active {
            right: 0;
          }
          .nav-menu :global(.nav-link) {
            font-size: 1.1rem;
            width: 100%;
            text-align: center;
            padding: 1rem;
          }
          .nav-actions {
            gap: 1rem;
          }
          .nav-actions :global(.btn-primary) {
            padding: 0.625rem 1.25rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.875rem 1rem;
          }
          .nav-logo :global(.logo-link) {
            font-size: 1.25rem;
          }
          .nav-actions :global(.btn-primary) {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
          .nav-menu {
            width: 100%;
            max-width: none;
          }
          .nav-menu :global(.nav-link) {
            font-size: 1rem;
            padding: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
