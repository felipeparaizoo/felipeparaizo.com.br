import React, { useState, useEffect } from "react";

const HeroSection = React.forwardRef((props, ref) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const texts = [
      "CTO do Grupo Veronez",
      "Desenvolvedor Full Stack",
      "Especialista em PHP/Laravel",
      "Entusiasta em Next.js",
      "Fascinado por Banco de Dados",
      "Experiente em APIs REST",
      "Focado em Performance",
      "Transformando ideias em código",
      "Arquitetura de Software e Padrões",
      "DevOps e Infraestrutura com Docker",
      "Versionamento com Git & GitHub",
      "Testes e Qualidade de Código",
      "Mobile com Flutter & Firebase",
      "Ambiente 100% Linux 🐧",
      "Aprendizado Contínuo",
      "Resolução Criativa de Problemas",
      "Código Limpo e Boas Práticas",
      "Colaboração e Metodologias Ágeis",
    ];

    const currentString = texts[currentIndex];

    if (!isDeleting && currentText === currentString) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, 0);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  const experiencia = new Date().getFullYear() - 2025;

  return (
    <section
      ref={ref}
      id="home"
      className={`hero ${isVisible ? "visible" : ""}`}
    >
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">
              Felipe Paraizo
              <span className="typing-text">
                {currentText}
                <span className="cursor">|</span>
              </span>
            </h1>

            <p className="hero-description">
              Como CTO do{" "}
              <a
                href="https://www.grupoveronez.com.br"
                className="description-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Grupo Veronez
              </a>{" "}
              e com {experiencia} {experiencia > 1 ? "anos" : "ano"} de
              experiência em arquitetura e desenvolvimento full stack,
              transformo necessidades complexas em soluções digitais robustas,
              escaláveis e orientadas a resultados. Da idealização à produção,
              entrego performance, qualidade e valor de negócio.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>Ver Projetos</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-secondary">
                Entrar em Contato
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="window-title">developer.js</span>
              </div>
              <div className="window-content">
                <div className="code-block">
                  <div className="code-line">
                    <span className="keyword">
                      function <span className="function-name"> Developer</span>
                    </span>
                    <span className="bracket">()</span>
                    <span className="bracket"> {"{"}</span>
                  </div>

                  <div className="code-line indent-1">
                    <span className="keyword">
                      const <span className="variable"> skills</span>
                    </span>
                    <span className="operator"> = </span>
                    <span className="bracket">{"{"}</span>
                  </div>

                  <div className="code-line indent-2">
                    <span className="property">frontend</span>
                    <span className="operator">: </span>
                    <span className="bracket">[</span>
                    <span className="string">&apos;React&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Next.js&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Tailwind CSS&apos;</span>
                    <span className="bracket">]</span>
                    <span className="comma">,</span>
                  </div>

                  <div className="code-line indent-2">
                    <span className="property">backend</span>
                    <span className="operator">: </span>
                    <span className="bracket">[</span>
                    <span className="string">&apos;Node.js&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Php&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;PostgreSQL&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;MySQL&apos;</span>
                    <span className="bracket">]</span>
                    <span className="comma">,</span>
                  </div>

                  <div className="code-line indent-2">
                    <span className="property">tools</span>
                    <span className="operator">: </span>
                    <span className="bracket">[</span>
                    <span className="string">&apos;Git&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Docker&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Jest&apos;</span>
                    <span className="comma">, </span>
                    <span className="string">&apos;Composer&apos;</span>
                    <span className="bracket">]</span>
                  </div>

                  <div className="code-line indent-1">
                    <span className="bracket">{"}"}</span>
                    <span className="comma">;</span>
                  </div>

                  <div className="code-line"></div>

                  <div className="code-line indent-1">
                    <span className="keyword">return</span>
                    <span className="operator"> (</span>
                  </div>

                  <div className="code-line indent-2">
                    <span className="operator">{"<"}</span>
                    <span className="component">ProblemSolver</span>
                    <span className="operator">{">"}</span>
                  </div>

                  <div className="code-line indent-3">
                    <span className="operator">{"<"}</span>
                    <span className="component">InnovativeSolutions</span>
                    <span className="operator"> {"/>"}</span>
                  </div>

                  <div className="code-line indent-3">
                    <span className="operator">{"<"}</span>
                    <span className="component">CleanCode</span>
                    <span className="operator"> {"/>"}</span>
                  </div>

                  <div className="code-line indent-2">
                    <span className="operator">{"</"}</span>
                    <span className="component">ProblemSolver</span>
                    <span className="operator">{">"}</span>
                  </div>

                  <div className="code-line indent-1">
                    <span className="bracket">)</span>
                    <span className="comma">;</span>
                  </div>

                  <div className="code-line">
                    <span className="bracket">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 5rem 0 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .hero.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation-duration: 8s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-blue-light)
          );
          top: 10%;
          left: 5%;
          animation-name: float-1;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, var(--accent-amber), #f97316);
          top: 50%;
          right: 5%;
          animation-name: float-2;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #10b981, #059669);
          bottom: 10%;
          left: 15%;
          animation-name: float-3;
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) translateX(-10px) rotate(240deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(-20px) scale(1.1);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(25px) rotate(180deg);
          }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--primary-blue-light);
          backdrop-filter: blur(10px);
          width: fit-content;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .hero-title .typing-text {
          display: block;
          color: var(--primary-blue);
          margin-top: 0.5rem;
          min-height: 3.5rem;
          font-size: 2rem;
          font-weight: 600;
          border-right: 3px solid var(--primary-blue);
          padding-right: 5px;
          white-space: nowrap;
          overflow: hidden;
        }

        .cursor {
          animation: blink 1s infinite;
          color: var(--primary-blue);
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          line-height: 1.7;
          max-width: 95%;
        }

        .hero-description :global(.description-link),
        .hero-description :global(.description-link:link),
        .hero-description :global(.description-link:visited),
        .hero-description :global(.description-link:active),
        .hero-description :global(.description-link:focus) {
          color: var(--accent-lime);
          text-decoration: none;
        }

        .hero-description :global(.description-link:hover) {
          color: var(--accent-lime);
          text-decoration: underline;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-blue-dark)
          );
          color: white;
          box-shadow: 0 8px 25px rgba(1, 19, 2, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(1, 19, 2, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border-color: var(--border-light);
        }

        .btn-secondary:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-2px);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .code-window {
          background: #1a1b26;
          border: 1px solid #2a2b3a;
          border-radius: 16px;
          overflow: hidden;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
          font-family: "Fira Code", monospace;
        }

        .code-window:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
        }

        .window-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: #16161e;
          border-bottom: 1px solid #2a2b3a;
        }

        .window-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .dot.red {
          background: #ff5f56;
        }
        .dot.yellow {
          background: #ffbd2e;
        }
        .dot.green {
          background: #27ca3f;
        }

        .window-title {
          font-size: 0.75rem;
          color: #a9b1d6;
          font-weight: 500;
          font-family: "Fira Code", monospace;
        }

        .window-content {
          padding: 1.25rem;
          background: #1a1b26;
        }

        .code-block {
          font-family: "Fira Code", "Monaco", "Cascadia Code", monospace;
          font-size: 0.75rem;
          line-height: 1.5;
          color: #c0caf5;
          margin: 0;
          background: none;
          border: none;
          padding: 0;
        }

        .code-line {
          display: flex;
          min-height: 1.5em;
          align-items: center;
        }

        .indent-1 {
          padding-left: 1.5em;
        }
        .indent-2 {
          padding-left: 3em;
        }
        .indent-3 {
          padding-left: 4.5em;
        }

        .keyword {
          color: #bb9af7;
          font-weight: 600;
        }

        .function-name {
          color: #7dcfff;
          font-weight: 600;
        }

        .variable {
          color: #c0caf5;
        }

        .property {
          color: #7aa2f7;
        }

        .string {
          color: #9ece6a;
        }

        .bracket {
          color: #c0caf5;
        }

        .operator {
          color: #89ddff;
        }

        .comma {
          color: #c0caf5;
        }

        .component {
          color: #ff9e64;
        }

        @media (min-width: 1440px) {
          .hero-content {
            gap: 5rem;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-title .typing-text {
            font-size: 2.25rem;
          }
        }

        @media (max-width: 1200px) {
          .hero-content {
            gap: 3rem;
          }

          .hero-title {
            font-size: 2.75rem;
          }

          .hero-title .typing-text {
            font-size: 1.75rem;
            min-height: 3rem;
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-main {
            align-items: center;
          }

          .hero-badge {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-description {
            max-width: 85%;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .code-window {
            transform: none;
            max-width: 450px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 4rem 0 2rem;
            min-height: auto;
          }

          .container {
            padding: 0 1.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
            margin-bottom: 1.25rem;
          }

          .hero-title .typing-text {
            font-size: 1.5rem;
            min-height: 2.5rem;
            margin-top: 0.25rem;
          }

          .hero-description {
            font-size: 1.0625rem;
            margin-bottom: 2rem;
            max-width: 100%;
          }

          .hero-actions {
            gap: 0.875rem;
            margin-bottom: 1.5rem;
          }

          .btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
          }

          .code-window {
            max-width: 400px;
          }

          .window-content {
            padding: 1rem;
          }

          .code-block {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 3rem 0 1.5rem;
          }

          .container {
            padding: 0 1rem;
          }

          .hero-content {
            gap: 2.5rem;
          }

          .hero-badge {
            padding: 0.625rem 1.25rem;
            font-size: 0.85rem;
            margin-bottom: 1.5rem;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .hero-title .typing-text {
            font-size: 1.375rem;
            min-height: 2.25rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 280px;
            margin-left: auto;
            margin-right: auto;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .code-window {
            max-width: 100%;
          }

          .gradient-orb {
            filter: blur(60px);
          }

          .orb-1 {
            width: 300px;
            height: 300px;
          }

          .orb-2 {
            width: 250px;
            height: 250px;
          }

          .orb-3 {
            width: 200px;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-title .typing-text {
            font-size: 1.25rem;
            min-height: 2rem;
          }

          .hero-description {
            font-size: 1rem;
            line-height: 1.6;
          }

          .code-block {
            font-size: 0.65rem;
          }

          .indent-1 {
            padding-left: 1em;
          }
          .indent-2 {
            padding-left: 2em;
          }
          .indent-3 {
            padding-left: 3em;
          }

          .window-header {
            padding: 0.875rem 1rem;
          }

          .window-content {
            padding: 0.875rem;
          }
        }

        @media (max-width: 360px) {
          .hero {
            padding: 2.5rem 0 1rem;
          }

          .hero-title {
            font-size: 1.75rem;
          }

          .hero-title .typing-text {
            font-size: 1.125rem;
          }

          .hero-badge {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .btn {
            padding: 0.625rem 1.25rem;
            font-size: 0.85rem;
          }

          .code-block {
            font-size: 0.6rem;
          }
        }

        @media (max-height: 700px) and (max-width: 768px) {
          .hero {
            min-height: 100vh;
            padding: 3rem 0;
          }
        }
      `}</style>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
