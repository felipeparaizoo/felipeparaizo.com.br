import React from "react";

const AboutSection = () => {
  const skillsData = [
    {
      title: "Frontend",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "BootStrap",
      ],
    },
    {
      title: "Backend & Dados",
      tags: [
        "PHP",
        "Laravel 12",
        "Node.js",
        "Python",
        "Java",
        "C#",
        ".NET Core",
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "MariaDB",
        "API REST",
        "JWT",
        "MVC",
      ],
    },
    {
      title: "DevOps & Infraestrutura",
      tags: ["Docker", "Git", "GitHub", "AWS", "Linux", "CI/CD"],
    },
    {
      title: "Mobile",
      tags: ["Flutter", "Dart", "Firebase", "Xcode", "Android Studio"],
    },
    {
      title: "Ferramentas & Testes",
      tags: ["Postman", "Insomnia", "Composer", "Jest", "PHPUnit"],
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Sobre Mim</h2>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <p>
                Desenvolvedor Full Stack e Mobile com sólida experiência na
                arquitetura e desenvolvimento de aplicações web e mobile
                escaláveis, performáticas e orientadas a negócio.
              </p>
              <p>
                Atuo de ponta a ponta no ciclo de desenvolvimento — da definição
                técnica da solução à implementação e evolução contínua —
                utilizando PHP (Laravel), Node.js, React, Next.js, Flutter e
                Dart.
              </p>
              <p>
                Possuo forte atuação na construção e integração de APIs REST,
                modelagem de sistemas, integrações entre plataformas e
                otimização de performance, sempre aplicando boas práticas,
                princípios de arquitetura limpa e organização estrutural do
                código.
              </p>
              <p>
                Atualmente, também atuo com suporte técnico e customizações no
                ERP TOTVS Protheus, realizando integrações, ajustes e melhorias
                operacionais que impactam diretamente a eficiência dos processos
                internos.
              </p>
              <p>
                Utilizo Linux como sistema operacional principal, com domínio do
                ambiente de desenvolvimento e servidores, garantindo maior
                controle sobre infraestrutura, deploy e estabilidade das
                aplicações.
              </p>
              <p>
                Estou em constante evolução técnica, ampliando minha atuação no
                ecossistema .NET e C#, além de desenvolver continuamente minha
                comunicação em inglês para atuar em projetos com contexto
                internacional.
              </p>
            </div>

            <div className="about-details">
              <div className="detail-item">
                <div className="detail-label">Nome:</div>
                <div className="detail-value">Felipe Paraizo de Oliveira</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Localização:</div>
                <div className="detail-value">Ibaiti, Brasil</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Disponibilidade:</div>
                <div className="detail-value availability">
                  <span className="status-dot"></span>
                  Aberto a Propostas
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Email:</div>
                <div className="detail-value">fparaizo3@gmail.com</div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="skills-grid">
              {skillsData.map((category) => (
                <div key={category.title} className="skill-category">
                  <h3 className="skill-title">{category.title}</h3>
                  <div className="skills-list">
                    {category.tags.map((tag) => (
                      <span key={tag} className="skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary-blue: #3b82f6;
          --primary-blue-light: #60a5fa;
          --text-primary: #e5e7eb;
          --text-secondary: #9ca3af;
          --background: #1f2937;
          --success: #10b981;
        }

        .about {
          padding: 5rem 0;
          background: var(--background);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 3rem;
          position: relative;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-blue-light)
          );
          border-radius: 2px;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: start;
        }

        .about-intro p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.7;
          text-align: justify;
        }

        .about-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
          padding: 2rem;
          background: rgba(4, 24, 1, 0.51);
          border: 1px solid rgba(4, 24, 1, 0.51);
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-label {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .detail-value {
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 500;
        }

        .availability {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--success) !important;
          font-weight: 600;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
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

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 2rem;
          padding: 2rem;
          background: rgba(4, 24, 1, 0.51);
          border: 1px solid rgba(4, 24, 1, 0.51);
          border-radius: 12px;
          height: fit-content;
        }

        .skill-title {
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .skill-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-blue-light)
          );
          border-radius: 1px;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background: rgba(108, 245, 149, 0.15);
          border: 1px solid rgba(108, 245, 149, 0.12);
          color: var(--primary-blue-light);
          padding: 0.5rem 0.9rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: default;
        }

        .skill-tag:hover {
          transform: translateY(-1px);
          background: rgba(108, 245, 149, 0.29);
          box-shadow: 0 2px 8px rgba(108, 245, 149, 0.25);
        }

        @media (max-width: 1024px) {
          .about-content {
            gap: 3rem;
            grid-template-columns: 1fr;
          }

          .about-visual {
            order: -1;
          }

          .about-details {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
            padding: 1.5rem;
            margin: 2rem 0;
          }

          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 1.5rem;
            gap: 1.75rem 1rem;
          }

          .skill-tag {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .about-details {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem 1rem;
          }

          .skill-tag {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
