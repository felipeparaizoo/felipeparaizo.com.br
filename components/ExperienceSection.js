import React from "react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Desenvolvedor Full Stack Pleno",
      company: "MagnoJet",
      duration: "Jul 2025 - Atualmente",
      description:
        "Atuo na MagnoJet desenvolvendo soluções robustas e inovadoras para o ERP da TOTVS (Protheus), com responsabilidades que incluem análise de desempenho, suporte aos usuários, evolução de funcionalidades e desenho/estruturação de APIs. " +
        "Como iniciativa complementar, desenvolvi uma plataforma em PHP (Laravel 12) para pré-postagens dos Correios, integrando-se via APIs oficiais para orquestrar a comunicação entre a aplicação e os serviços postais. " +
        "Além disso, estou desenvolvendo um aplicativo mobile em Flutter, focado em performance, usabilidade e arquitetura escalável, ampliando minha atuação no desenvolvimento multiplataforma. Minha atuação é orientada à otimização de processos, eficiência das integrações e excelência em suporte e entregas tecnológicas.",
      technologies: [
        "TOTVS Protheus",
        "Laravel 12",
        "Php",
        "Node.js",
        "Tailwind",
        "Flutter",
        "JavaScript",
        "MySQL",
        "SQLite",
        "PostegreSQL",
      ],
      type: "trabalho",
    },
    {
      title: "Análise e Desenvolvimento de Sistemas (ADS)",
      company: "PUCPR - Pontifícia Universidade Católica do Paraná",
      duration: "Jan 2025 - Jun 2027",
      description:
        "Atualmente, estou cursando Análise e Desenvolvimento de Sistemas na PUCPR (Pontifícia Universidade Católica do Paraná). Este curso tem sido fundamental para aprimorar meus conhecimentos em diversas áreas da programação, mantendo um foco constante na busca por excelência e no aprendizado contínuo.",
      technologies: ["Php", "MySQL", "Arduino", "Python", "Java", "JavaScript"],
      type: "educacao",
    },
    {
      title: "Desenvolvedor Back End Junior",
      company: "Pró-Varejo",
      duration: "Out 2024 - Jul 2025",
      description:
        "Atuei na Pró-Varejo colaborando tanto na manutenção quanto na criação de módulos, com destaque para o desenvolvimento do módulo CLT voltado para empréstimos consignados de trabalhadores. Nesse período, aprimorei minhas habilidades em lógica de programação, análise de dados e desenvolvimento web, utilizando principalmente PHP, JavaScript e Banco de dados.",
      technologies: ["Php", "JavaScript", "MySQL", "BootStrap"],
      type: "trabalho",
    },
    {
      title: "Técnico em Informática",
      company: "CEEP Seiji Hattanda",
      duration: "Jan 2020 - Dez 2024",
      description:
        "Minha formação técnica, desenvolvida ao longo de quatro anos no CEEP Seiji Hattanda, constituiu a fundação de minha trajetória profissional na área de tecnologia. Durante este período, consolidei conhecimentos práticos e teóricos essenciais, abrangendo: a arquitetura e manutenção de hardware e software, a gestão de redes, e uma introdução fundamental à programação. Foi esta iniciação à programação que catalisou o meu interesse e paixão pela área de desenvolvimento e suas diversas ramificações.",
      technologies: [
        "Hardware",
        "Software",
        "Html",
        "Css",
        "Php",
        "JavaScript",
        "Redes",
      ],
      type: "educacao",
    },
  ];

  const getTypeIcon = (type) => {
    if (type === "educacao") {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path d="M12 14v6" />
        </svg>
      );
    }
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  };

  const getTypeColor = (type) => {
    return type === "educacao" ? "var(--secondary-mint)" : "var(--accent-lime)";
  };

  const getTypeLabel = (type) => {
    return type === "educacao" ? "Educação" : "Experiência";
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Trajetória Profissional</h2>
        <p className="section-subtitle">
          Minha jornada de crescimento e aprendizado contínuo na tecnologia!
        </p>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${exp.type}`}>
              <div className="timeline-marker">
                <div
                  className="marker-icon"
                  style={{ backgroundColor: getTypeColor(exp.type) }}
                >
                  {getTypeIcon(exp.type)}
                </div>
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-badge">
                    <span style={{ backgroundColor: getTypeColor(exp.type) }}>
                      {getTypeLabel(exp.type)}
                    </span>
                  </div>
                  <div className="timeline-date">{exp.duration}</div>
                </div>

                <div className="timeline-card">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <h4 className="timeline-company">{exp.company}</h4>
                  <p className="timeline-description">{exp.description}</p>

                  <div className="timeline-technologies">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .experience {
          padding: 3rem 0;
          position: relative;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 3rem auto 0;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--accent-lime),
            var(--secondary-mint),
            transparent
          );
          opacity: 0.3;
        }

        .timeline-item {
          display: flex;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-marker {
          position: relative;
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .marker-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-green);
          box-shadow: 0 4px 15px rgba(206, 241, 123, 0.3);
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .timeline-item:hover .marker-icon {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(206, 241, 123, 0.4);
        }

        .timeline-line {
          flex: 1;
          width: 2px;
          background: linear-gradient(
            to bottom,
            var(--accent-lime),
            var(--secondary-mint)
          );
          opacity: 0.5;
          margin-top: 10px;
        }

        .timeline-item:last-child .timeline-line {
          display: none;
        }

        .timeline-content {
          flex: 1;
          padding-left: 2rem;
          padding-bottom: 2rem;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .timeline-badge span {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .timeline-date {
          font-size: 0.9rem;
          color: var(--secondary-mint);
          font-weight: 500;
          background: rgba(206, 237, 178, 0.1);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          border: 1px solid rgba(206, 237, 178, 0.2);
        }

        .timeline-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .timeline-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(
            to bottom,
            var(--accent-lime),
            var(--secondary-mint)
          );
          opacity: 0.8;
        }

        .timeline-item:hover .timeline-card {
          transform: translateX(10px);
          border-color: rgba(206, 241, 123, 0.3);
          box-shadow:
            0 10px 30px rgba(8, 71, 52, 0.3),
            0 5px 15px rgba(206, 241, 123, 0.1);
        }

        .timeline-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-lime);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .timeline-company {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--secondary-mint);
          margin-bottom: 1rem;
        }

        .timeline-description {
          color: var(--secondary-mint);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .timeline-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: rgba(206, 241, 123, 0.1);
          color: var(--accent-lime);
          padding: 0.4rem 0.9rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(206, 241, 123, 0.2);
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(206, 241, 123, 0.2);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .experience {
            padding: 3rem 0;
          }

          .timeline::before {
            left: 25px;
          }

          .timeline-marker {
            width: 50px;
          }

          .marker-icon {
            width: 40px;
            height: 40px;
          }

          .marker-icon svg {
            width: 16px;
            height: 16px;
          }

          .timeline-content {
            padding-left: 1.5rem;
          }

          .timeline-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .timeline-card {
            padding: 1.5rem;
          }

          .timeline-title {
            font-size: 1.2rem;
          }

          .timeline-company {
            font-size: 1rem;
          }

          .timeline-item:hover .timeline-card {
            transform: translateX(5px);
          }
        }

        @media (max-width: 480px) {
          .timeline::before {
            left: 20px;
          }

          .timeline-marker {
            width: 40px;
          }

          .marker-icon {
            width: 35px;
            height: 35px;
          }

          .timeline-content {
            padding-left: 1rem;
          }

          .timeline-card {
            padding: 1.25rem;
          }

          .timeline-title {
            font-size: 1.1rem;
          }

          .timeline-description {
            font-size: 0.9rem;
          }

          .tech-tag {
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
          }
        }

        .timeline-item {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .timeline-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .timeline-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .timeline-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .timeline-item:nth-child(4) {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
