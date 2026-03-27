import Head from "next/head";
import { useState, useEffect, useCallback, useMemo } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Commits() {
  const [isMobile, setIsMobile] = useState(false);
  const [commits, setCommits] = useState([]);
  const [loadingCommits, setLoadingCommits] = useState(true);
  const [error, setError] = useState(null);
  const [commitLimit, setCommitLimit] = useState(10);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection] = useState("commits");

  const mousePosition = useMemo(() => ({ current: { x: 50, y: 50 } }), []);
  const rafId = useMemo(() => ({ current: null }), []);
  const lastUpdateTime = useMemo(() => ({ current: 0 }), []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile) return;

      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return;

      lastUpdateTime.current = now;

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
    [isMobile, lastUpdateTime, rafId, mousePosition],
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
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, isMobile, rafId]);

  const fetchCommits = async (limit = 10) => {
    setLoadingCommits(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/felipeparaizoo/felipeparaizo.com.br/commits?per_page=${limit}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Fparaiz0-Portfolio",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Repositório não encontrado");
        } else if (response.status === 403) {
          throw new Error(
            "Limite de requisições excedido. Tente novamente mais tarde.",
          );
        } else {
          throw new Error(`Erro na API: ${response.status}`);
        }
      }

      const data = await response.json();
      setCommits(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCommits(false);
    }
  };

  useEffect(() => {
    fetchCommits(commitLimit);
  }, [commitLimit]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateMessage = (message, maxLength = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const scrollToSection = (section) => {
    if (section === "commits") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
        <title>Felipe Paraizo | Histórico de Commits</title>
        <meta
          name="description"
          content="Acompanhe em tempo real os últimos commits do meu site. Transparência e evolução contínua do meu portfolio."
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
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="github-badge">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.825 1.125.825 2.265 0 1.635-.015 2.955-.015 3.36 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub API</span>
              </div>
              <h1 className="hero-title">
                Últimos{" "}
                <span className="gradient-text">Commits do Repositório</span>
              </h1>
              <p className="hero-subtitle">
                Acompanhe em tempo real a evolução do código fonte do meu site.
                Transparência e open source em primeiro lugar.
              </p>
              <p className="api-credit">
                Dados fornecidos pela{" "}
                <a
                  href="https://docs.github.com/en/rest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API do GitHub
                </a>
              </p>

              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ marginRight: "4px", verticalAlign: "middle" }}
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.825 1.125.825 2.265 0 1.635-.015 2.955-.015 3.36 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Repositório
                  </span>
                  <a
                    href="https://github.com/felipeparaizoo/felipeparaizo.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    felipeparaizoo/felipeparaizo.com.br
                    <svg
                      className="external-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 2.75A.75.75 0 011.75 2h4.5a.75.75 0 010 1.5h-3.5v10.5h10.5v-3.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75zm13.4 1.9l-5.2 5.2a.75.75 0 01-1.06-1.06l5.2-5.2H9.75a.75.75 0 010-1.5h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.65z"
                      />
                    </svg>
                  </a>
                </div>
                <div className="stat-card">
                  <span className="stat-label">📅 Última Atualização</span>
                  <span className="stat-value">
                    {lastUpdate ? formatDate(lastUpdate) : "Carregando..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="commits-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Histórico de Commits</h2>
              <p className="section-subtitle">
                Cada commit representa uma melhoria, correção ou nova
                funcionalidade implementada no site.
              </p>
            </div>

            <div className="controls-card">
              <div className="controls-content">
                <div className="input-group">
                  <label htmlFor="commit-limit" className="input-label">
                    Número de commits:
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      id="commit-limit"
                      min="1"
                      max="100"
                      value={commitLimit}
                      onChange={(e) => setCommitLimit(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => fetchCommits(commitLimit)}
                    disabled={loadingCommits}
                    className="btn btn-primary"
                  >
                    {loadingCommits ? (
                      <>
                        <span className="spinner"></span>
                        Carregando...
                      </>
                    ) : (
                      <>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          />
                        </svg>
                        Atualizar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="error-card">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {loadingCommits ? (
              <div className="loading-commits">
                <div className="spinner-large"></div>
                <p>Buscando commits do repositório...</p>
              </div>
            ) : (
              <div className="commits-grid">
                {commits.length === 0 ? (
                  <div className="empty-state">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                    <h3>Nenhum commit encontrado</h3>
                    <p>Este repositório ainda não possui commits.</p>
                  </div>
                ) : (
                  commits.map((commit, index) => {
                    const commitData = commit.commit;
                    const author = commitData.author;
                    const committer = commitData.committer;
                    const sha = commit.sha.substring(0, 7);
                    const authorAvatar =
                      commit.author?.avatar_url ||
                      "https://github.githubassets.com/images/gravatars/gravatar-user-420.png";

                    return (
                      <div
                        key={commit.sha}
                        className={`commit-card ${
                          index === 0 ? "latest-commit" : ""
                        }`}
                      >
                        {index === 0 && (
                          <div className="latest-badge">
                            <span>🔔 Commit mais recente</span>
                          </div>
                        )}
                        <div className="commit-header">
                          <div className="commit-message">
                            <a
                              href={commit.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={commitData.message}
                            >
                              {truncateMessage(commitData.message)}
                            </a>
                          </div>
                          <div className="commit-sha">{sha}</div>
                        </div>

                        <div className="commit-body">
                          <div className="commit-meta">
                            <div className="author-info">
                              <Image
                                src={authorAvatar}
                                alt={author.name || "Avatar do autor"}
                                className="author-avatar"
                                width={32}
                                height={32}
                                unoptimized
                              />
                              <div className="author-details">
                                <span className="author-name">
                                  {author.name || "Autor desconhecido"}
                                </span>
                                {author.name !== committer.name && (
                                  <span className="committer-note">
                                    commited por {committer.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="commit-date">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M8 1a2 2 0 012 2v4h4a2 2 0 012 2v4a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2h4V3a2 2 0 012-2z" />
                              </svg>
                              {formatDate(author.date)}
                            </div>
                          </div>

                          {commitData.message.includes("\n\n") && (
                            <div className="commit-description">
                              {commitData.message.split("\n\n")[1]}
                            </div>
                          )}
                        </div>

                        <div className="commit-footer">
                          <a
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="commit-link"
                          >
                            Ver no GitHub
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </section>

        <section className="info-section">
          <div className="container">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">🔍</div>
                <h3>Transparência</h3>
                <p>
                  Todo o código deste site é público. Você pode acompanhar cada
                  alteração, correção e melhoria em tempo real.
                </p>
              </div>
              <div className="info-card">
                <div className="info-icon">🚀</div>
                <h3>Evolução Contínua</h3>
                <p>
                  Cada commit representa um passo na evolução do projeto.
                  Acompanhe o progresso e as novidades implementadas.
                </p>
              </div>
              <div className="info-card">
                <div className="info-icon">💡</div>
                <h3>Open Source</h3>
                <p>
                  Sinta-se à vontade para explorar, aprender e contribuir com o
                  projeto. O conhecimento é para todos.
                </p>
              </div>
            </div>
          </div>
        </section>
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

        .main-content {
          position: relative;
          z-index: 10;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 0;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .github-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          color: var(--light);
          font-size: 0.9rem;
        }

        .github-badge svg {
          fill: var(--accent-lime);
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          text-align: center;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            var(--accent-lime) 0%,
            var(--secondary-mint) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-light);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .api-credit a {
          color: var(--accent-lime);
          text-decoration: none;
          font-weight: 500;
        }

        .api-credit a:hover {
          text-decoration: underline;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .stat-card {
          background: rgba(10, 31, 24, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: var(--border-radius);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
        }

        .stat-label {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          width: 100%;
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 200;
          color: var(--light);
          text-align: center;
          width: 100%;
        }

        .repo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--accent-lime);
          text-decoration: none;
          transition: gap 0.3s;
          margin: 0 auto;
          text-align: center;
          word-break: break-word;
          font-size: 1.3rem;
        }

        .repo-link:hover {
          gap: 0.8rem;
          text-decoration: underline;
        }

        .external-icon {
          opacity: 0.7;
          flex-shrink: 0;
        }

        .commits-section {
          padding: 4rem 0;
          background: rgba(5, 20, 15, 0.5);
          backdrop-filter: blur(10px);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(
            135deg,
            var(--accent-lime) 0%,
            var(--secondary-mint) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--gray-light);
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .controls-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: var(--border-radius);
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .controls-content {
          display: flex;
          align-items: flex-end;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .input-group {
          flex: 1;
          min-width: 200px;
        }

        .input-label {
          display: block;
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        .input-wrapper {
          position: relative;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(206, 241, 123, 0.2);
          border-radius: 8px;
          color: var(--light);
          font-size: 1rem;
          transition: all 0.3s;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--accent-lime);
          box-shadow: 0 0 0 3px rgba(206, 241, 123, 0.1);
        }

        .button-group {
          display: flex;
          gap: 1rem;
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

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-card {
          background: rgba(203, 36, 49, 0.1);
          border: 1px solid rgba(203, 36, 49, 0.3);
          border-radius: var(--border-radius);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #ff8a8a;
          margin-bottom: 2rem;
          text-align: center;
        }

        .loading-commits {
          text-align: center;
          padding: 4rem;
          background: rgba(10, 31, 24, 0.3);
          border-radius: var(--border-radius);
          border: 1px solid rgba(206, 241, 123, 0.1);
        }

        .spinner-large {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(206, 241, 123, 0.1);
          border-top-color: var(--accent-lime);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .commits-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .commit-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: var(--border-radius);
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .commit-card:hover {
          transform: translateX(5px);
          border-color: rgba(206, 241, 123, 0.3);
          box-shadow:
            0 10px 30px rgba(8, 71, 52, 0.2),
            0 5px 15px rgba(206, 241, 123, 0.1);
        }

        .latest-commit {
          border: 1px solid var(--accent-lime);
          box-shadow: 0 0 30px rgba(206, 241, 123, 0.1);
        }

        .latest-badge {
          position: absolute;
          top: -12px;
          left: 2rem;
          background: linear-gradient(
            135deg,
            var(--accent-lime),
            var(--secondary-mint)
          );
          color: var(--primary-green-dark);
          padding: 0.25rem 1rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: var(--shadow);
        }

        .commit-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .commit-message {
          font-size: 1.25rem;
          font-weight: 600;
          flex: 1;
        }

        .commit-message a {
          color: var(--light);
          text-decoration: none;
          transition: color 0.2s;
        }

        .commit-message a:hover {
          color: var(--accent-lime);
        }

        .commit-sha {
          font-family: monospace;
          padding: 0.25rem 0.75rem;
          background: rgba(206, 241, 123, 0.1);
          border: 1px solid rgba(206, 241, 123, 0.2);
          border-radius: 6px;
          font-size: 0.9rem;
          color: var(--accent-lime);
        }

        .commit-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--accent-lime);
        }

        .author-details {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 500;
          color: var(--light);
        }

        .committer-note {
          font-size: 0.85rem;
          color: var(--gray);
        }

        .commit-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray);
          font-size: 0.95rem;
        }

        .commit-description {
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          color: var(--gray-light);
          font-size: 0.95rem;
          margin-top: 1rem;
          border-left: 3px solid var(--accent-lime);
        }

        .commit-footer {
          margin-top: 1.5rem;
          text-align: right;
        }

        .commit-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-lime);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: gap 0.3s;
        }

        .commit-link:hover {
          gap: 0.75rem;
          text-decoration: underline;
        }

        .empty-state {
          text-align: center;
          padding: 4rem;
          background: rgba(10, 31, 24, 0.3);
          border-radius: var(--border-radius);
          border: 1px solid rgba(206, 241, 123, 0.1);
        }

        .empty-state svg {
          color: var(--gray);
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: var(--light);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--gray);
        }

        .info-section {
          padding: 4rem 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .info-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: var(--border-radius);
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .info-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .info-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--light);
        }

        .info-card p {
          color: var(--gray);
          font-size: 0.95rem;
          line-height: 1.6;
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
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
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

        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 400px;
          }

          .stat-card {
            padding: 1.5rem;
            width: 100%;
          }

          .repo-link {
            font-size: 1rem;
            flex-wrap: wrap;
          }

          .controls-content {
            flex-direction: column;
            align-items: stretch;
          }

          .button-group {
            width: 100%;
          }

          .btn {
            width: 100%;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .commit-header {
            flex-direction: column;
          }

          .commit-meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .commit-card {
            padding: 1.25rem;
          }

          .commit-message {
            font-size: 1.1rem;
            word-break: break-word;
          }

          .commit-sha {
            align-self: flex-start;
          }

          .author-info {
            width: 100%;
          }

          .commit-date {
            width: 100%;
            justify-content: flex-start;
          }

          .commit-description {
            font-size: 0.9rem;
            padding: 0.875rem;
          }

          .latest-badge {
            left: 1rem;
            font-size: 0.75rem;
            padding: 0.2rem 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .commit-card {
            padding: 1rem;
          }

          .author-name {
            font-size: 0.95rem;
          }

          .committer-note {
            font-size: 0.8rem;
          }

          .commit-link {
            font-size: 0.9rem;
          }

          .info-card {
            padding: 1.5rem;
          }

          .info-card h3 {
            font-size: 1.1rem;
          }

          .info-card p {
            font-size: 0.9rem;
          }

          .stat-label svg {
            display: none;
          }
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
      `}</style>
    </div>
  );
}
