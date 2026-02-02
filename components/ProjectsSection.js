import React from "react";
import Image from "next/image";

const ProjectsSection = () => {
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    if (typeof url === "object") return null;

    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([^&?%]{11})(?:[?&][^\s]*)*$/;
    const match = url.match(regExp);
    return match && match[1]
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0`
      : null;
  };

  const isLocalVideo = (url) => {
    if (!url || typeof url === "object") return false;
    return (
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")
    );
  };

  const projects = [
    {
      title: "Pré-Postagem MagnoJet",
      description:
        "Esta plataforma foi desenvolvida para a empresa <a href='https://www.magnojet.com.br' class='description-link' target='_blank' rel='noopener noreferrer'>MagnoJet</a> e tem como objetivo realizar a pré-postagem através das APIs oficiais dos <a href='https://www.correios.com.br' class='description-link' target='_blank' rel='noopener noreferrer'>Correios</a>, oferecendo um fluxo simples, seguro e eficiente para geração de PLPs, etiquetas e integração logística.",
      image: "/videos/magnojet.mp4",
      technologies: [
        "Laravel 12",
        "Php",
        "MySQL",
        "Composer",
        "Tailwind CSS",
        "Node.js",
      ],
      githubUrl: "https://github.com/Fparaiz0/prepostagem_magnojet",
      featured: true,
    },
    {
      title: "felipeparaizo.com.br",
      description:
        "Este projeto esta sendo desenvolvido com o objetivo de criar um clone da plataforma <a href='https://www.tabnews.com.br' class='description-link' target='_blank' rel='noopener noreferrer'>TabNews</a>, uma rede social voltada para tecnologia e programação. Além de replicar as funcionalidades dessa plataforma, o projeto também tem como principal objetivo ser um portfólio pessoal.",
      image: "/videos/felipeparaizo.mp4",
      technologies: [
        "JavaScript",
        "Next.js",
        "Node.js",
        "React",
        "PostgreSQL",
        "CI/CD",
        "Jest",
      ],
      githubUrl: "https://github.com/Fparaiz0/felipeparaizo.com.br",
      featured: true,
    },
  ];

  const appProject = {
    title: "App MagnoJet",
    description:
      "Aplicativo mobile desenvolvido em Flutter com funcionalidades avançadas de geolocalização, notificações push e integração com APIs REST. Interface moderna e responsiva seguindo as melhores práticas de UX/UI para mobile.",
    image: {
      type: "app",
      video: "/videos/app_magnojet.mp4",
    },
    technologies: [
      "Flutter",
      "Dart",
      "PostgreSQL",
      "RESTful APIs",
      "Geolocalização",
      "Push Notifications",
      "Calculos de vazões",
      "Seleção de pontas de pulverização",
    ],
    githubUrl: "https://github.com/Fparaiz0/meu-app-mobile",
    featured: true,
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projetos Destacados</h2>
        <p className="section-subtitle">
          Soluções inovadoras desenvolvidas com as melhores tecnologias do
          mercado
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const youtubeEmbedUrl = getYouTubeEmbedUrl(project.image);
            const isVideoFile = isLocalVideo(project.image);
            const isVideoContent = youtubeEmbedUrl || isVideoFile;

            return (
              <div
                key={index}
                className={`project-card ${project.featured ? "featured" : ""}`}
              >
                <div className="project-media-container">
                  {youtubeEmbedUrl ? (
                    <div className="video-wrapper">
                      <iframe
                        src={youtubeEmbedUrl}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="project-video"
                      ></iframe>
                    </div>
                  ) : isVideoFile ? (
                    <div className="video-wrapper">
                      <video
                        src={project.image}
                        title={project.title}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="project-video"
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  )}

                  {!isVideoContent && (
                    <div className="project-overlay">
                      <div className="project-links">
                        <a
                          href={project.githubUrl}
                          className="project-link github"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver código no GitHub"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}

                  {project.featured && (
                    <div className="featured-badge">
                      <span>⭐ Destaque</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <p
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></p>
                  </div>

                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.githubUrl}
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Código</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="app-project-section">
          <div className="app-project-horizontal">
            <div className="app-project-container">
              <div className="app-mockup-side">
                <div className="iphone-17-pro-max">
                  <div className="iphone-frame">
                    <div className="dynamic-island">
                      <div className="island-camera"></div>
                      <div className="island-sensors"></div>
                    </div>

                    <div className="iphone-screen">
                      <video
                        src={appProject.image.video}
                        title={appProject.title}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="app-video"
                        poster={appProject.image.poster}
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>

                    <div className="volume-buttons">
                      <div className="volume-up"></div>
                      <div className="volume-down"></div>
                    </div>
                    <div className="power-button"></div>
                  </div>
                </div>
              </div>

              <div className="app-content-side">
                <div className="app-project-content">
                  <div className="app-project-header">
                    <div className="app-header-badge">
                      <span className="app-badge-icon">📱</span>
                      <span className="app-badge-text">MOBILE APP</span>
                    </div>
                    <h3 className="app-project-title">{appProject.title}</h3>
                    <p
                      className="app-project-description"
                      dangerouslySetInnerHTML={{
                        __html: appProject.description,
                      }}
                    ></p>
                  </div>

                  <div className="app-project-technologies">
                    {appProject.technologies.map((tech, idx) => (
                      <span key={idx} className="app-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="app-project-actions">
                    <a
                      href={appProject.githubUrl}
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Código Fonte</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>

                    {appProject.appStore && (
                      <a
                        href={appProject.appStore}
                        className="btn btn-app-store"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>App Store</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M12 2L9 7H4L6 12H9L12 7H15L18 12H21L19 7H14L12 2Z" />
                        </svg>
                      </a>
                    )}

                    {appProject.playStore && (
                      <a
                        href={appProject.playStore}
                        className="btn btn-play-store"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Play Store</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M3 20V4L21 12L3 20Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .projects {
          padding: 3rem 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .project-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          height: fit-content;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: rgba(206, 241, 123, 0.3);
          box-shadow:
            0 15px 30px rgba(8, 71, 52, 0.3),
            0 8px 20px rgba(206, 241, 123, 0.1);
        }

        .project-card.featured {
          border-color: rgba(206, 241, 123, 0.4);
          box-shadow:
            0 20px 40px rgba(8, 71, 52, 0.4),
            0 12px 25px rgba(206, 241, 123, 0.15);
        }

        .project-media-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .project-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.05);
        }

        .video-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .project-video,
        .video-wrapper iframe {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 71, 52, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-lime);
          color: var(--primary-green);
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .project-link:hover {
          transform: scale(1.1);
          background: transparent;
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        .featured-badge {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          background: linear-gradient(
            135deg,
            var(--accent-lime),
            var(--secondary-mint)
          );
          color: var(--primary-green);
          padding: 0.4rem 0.8rem;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(206, 241, 123, 0.3);
          z-index: 10;
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-header {
          margin-bottom: 1.25rem;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--accent-lime);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .project-card.featured .project-title {
          background: linear-gradient(
            135deg,
            var(--accent-lime),
            var(--secondary-mint)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .project-description {
          color: var(--secondary-mint);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0;
        }

        .project-description :global(.description-link),
        .project-description :global(.description-link:link),
        .project-description :global(.description-link:visited),
        .project-description :global(.description-link:active),
        .project-description :global(.description-link:focus) {
          color: var(--accent-lime);
          text-decoration: none;
        }

        :global(.description-link:hover) {
          color: var(--accent-lime);
          text-decoration: underline;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          background: rgba(206, 241, 123, 0.1);
          color: var(--accent-lime);
          padding: 0.35rem 0.75rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(206, 241, 123, 0.2);
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(206, 241, 123, 0.2);
          transform: translateY(-1px);
        }

        .project-actions {
          display: flex;
          gap: 1rem;
        }

        .project-actions .btn {
          flex: 1;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .app-project-section {
          max-width: 1200px;
          margin: 4rem auto 0;
          padding: 0 1rem;
        }

        .app-section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-lime);
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .app-section-subtitle {
          color: var(--secondary-mint);
          text-align: center;
          margin-bottom: 2.5rem;
          font-size: 1rem;
        }

        .app-project-horizontal {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.2);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(8, 71, 52, 0.4),
            0 8px 30px rgba(206, 241, 123, 0.15);
        }

        .app-project-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .app-mockup-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #0a1f18 0%, #083734 100%);
          position: relative;
          overflow: hidden;
        }

        .iphone-17-pro-max {
          perspective: 1000px;
        }

        .iphone-frame {
          width: 320px;
          height: 650px;
          background: #1a1a1a;
          border-radius: 48px;
          position: relative;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 0 30px rgba(0, 0, 0, 0.9);
          border: 14px solid #000;
          overflow: hidden;
          transform: rotateY(-5deg);
          transition: transform 0.5s ease;
        }

        .app-project-horizontal:hover .iphone-frame {
          transform: rotateY(0deg);
        }

        .dynamic-island {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 36px;
          background: #000;
          border-radius: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
        }

        .island-camera {
          width: 12px;
          height: 12px;
          background: #333;
          border-radius: 50%;
          border: 2px solid #444;
        }

        .island-sensors {
          width: 40px;
          height: 6px;
          background: #222;
          border-radius: 3px;
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 34px;
          overflow: hidden;
          position: relative;
        }

        .app-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .volume-buttons {
          position: absolute;
          left: -6px;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .volume-up,
        .volume-down {
          width: 6px;
          height: 45px;
          background: #333;
          border-radius: 3px;
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }

        .power-button {
          position: absolute;
          right: -6px;
          top: 160px;
          width: 6px;
          height: 65px;
          background: #333;
          border-radius: 3px;
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }

        .app-content-side {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .app-project-content {
          max-width: 500px;
        }

        .app-project-header {
          margin-bottom: 2rem;
        }

        .app-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .app-badge-icon {
          font-size: 1rem;
        }

        .app-project-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-lime);
          margin-bottom: 1rem;
          line-height: 1.2;
          background: linear-gradient(
            135deg,
            var(--accent-lime),
            var(--secondary-mint)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .app-project-description {
          color: var(--secondary-mint);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .app-project-description :global(.description-link) {
          color: var(--accent-lime);
          text-decoration: none;
        }

        .app-project-description :global(.description-link:hover) {
          text-decoration: underline;
        }

        .app-project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .app-tech-tag {
          background: rgba(206, 241, 123, 0.15);
          color: var(--accent-lime);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(206, 241, 123, 0.3);
          transition: all 0.3s ease;
        }

        .app-tech-tag:hover {
          background: rgba(206, 241, 123, 0.25);
          transform: translateY(-2px);
        }

        .app-project-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .app-project-actions .btn {
          padding: 1rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          min-width: 140px;
        }

        .btn-secondary {
          background: rgba(206, 241, 123, 0.1);
          color: var(--accent-lime);
          border: 1px solid rgba(206, 241, 123, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(206, 241, 123, 0.2);
          transform: translateY(-2px);
        }

        .btn-app-store {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          border: 1px solid #666;
        }

        .btn-play-store {
          background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
          color: white;
          border: 1px solid #4285f4;
        }

        .btn-app-store:hover,
        .btn-play-store:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.5rem;
          }

          .app-project-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .app-mockup-side {
            padding: 1.5rem;
            min-height: 500px;
          }

          .iphone-frame {
            width: 280px;
            height: 570px;
          }

          .app-content-side {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .projects {
            padding: 3rem 0;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
            padding: 0 1rem;
          }

          .project-content {
            padding: 1.25rem;
          }

          .project-actions {
            flex-direction: column;
          }

          .project-actions .btn {
            width: 100%;
          }

          .app-project-section {
            margin-top: 3rem;
            padding: 0 0.5rem;
          }

          .iphone-frame {
            width: 240px;
            height: 490px;
            border-radius: 40px;
            border-width: 10px;
          }

          .dynamic-island {
            width: 100px;
            height: 30px;
          }

          .app-project-title {
            font-size: 1.5rem;
          }

          .app-project-actions {
            flex-direction: column;
          }

          .app-project-actions .btn {
            width: 100%;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .projects-grid {
            gap: 1rem;
          }

          .project-content {
            padding: 1rem;
          }

          .project-title {
            font-size: 1.2rem;
          }

          .featured-badge {
            top: 0.6rem;
            right: 0.6rem;
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }

          .app-project-horizontal {
            border-radius: 16px;
          }

          .app-mockup-side {
            min-height: 450px;
          }

          .iphone-frame {
            width: 220px;
            height: 450px;
            border-radius: 36px;
            border-width: 8px;
          }

          .app-content-side {
            padding: 1.5rem;
          }

          .app-project-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
