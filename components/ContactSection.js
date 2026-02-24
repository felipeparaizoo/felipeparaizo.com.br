import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Enviando...");

    try {
      const response = await fetch("/api/v1/send/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ " + data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });

        console.log("Email enviado com ID:", data.messageId);
      } else {
        throw new Error(data.error || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro no frontend:", error);
      setStatus("❌ " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: "fparaizo3@gmail.com",
      link: "mailto:fparaizo3@gmail.com",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(192, 233, 79, 0.51)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.162-3.495-8.411" />
        </svg>
      ),
      label: "WhatsApp",
      value: "+55 (43) 99681-9813",
      link: "https://wa.me/5543996819813",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Localização",
      value: "Ibaiti, Paraná - Brasil",
      link: "https://maps.google.com/?q=Ibaiti,Paraná,Brasil",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/felipeparaizo/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Fparaiz0",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/felipeparaizoo/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.068 1.645.068 4.854 0 3.203-.01 3.584-.068 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.854.07s-3.583-.012-4.849-.07c-3.254-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.068 4.854-.068zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.201-6.78 2.618-6.981 6.981-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.073 4.948.201 4.358 2.618 6.78 6.981 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.201 6.782-2.618 6.981-6.981.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.981-6.981-1.28-.059-1.688-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Vamos Trabalhar Juntos?</h2>
        <p className="section-subtitle">
          Estou disponível para novos projetos e oportunidades. Entre em contato
          e vamos conversar!
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Entre em Contato</h3>
              <p className="info-description">
                Estou sempre aberto a discutir novas oportunidades, parcerias e
                projetos interessantes. Se você tem uma ideia em mente ou
                precisa de um desenvolvedor para sua equipe, ficarei feliz em
                conversar!
              </p>

              <div className="contact-details">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="contact-item"
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-text">
                      <span className="contact-label">{item.label}</span>
                      <span className="contact-value">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="social-section">
                <h4>Minhas Redes</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-card">
              <h3>Envie uma Mensagem</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Seu Nome *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Seu Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Assunto *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Qual é o assunto da sua mensagem?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Sua Mensagem *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Descreva seu projeto, dúvida ou proposta..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22,2 15,22 11,13 2,9" />
                      </svg>
                      Enviar Mensagem
                    </>
                  )}
                </button>

                {status && (
                  <div
                    className={`form-status ${status.includes("❌") ? "error" : "success"}`}
                  >
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          padding: 1rem 0;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
          margin-top: 3rem;
        }

        .info-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          height: fit-content;
        }

        .info-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-lime);
          margin-bottom: 1rem;
        }

        .info-description {
          color: var(--secondary-mint);
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .contact-item:hover {
          background: rgba(206, 241, 123, 0.05);
          border-color: rgba(206, 241, 123, 0.2);
          transform: translateX(5px);
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(206, 241, 123, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-lime);
          flex-shrink: 0;
        }

        .contact-text {
          display: flex;
          flex-direction: column;
        }

        .contact-label {
          font-size: 0.9rem;
          color: var(--gray-light);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .contact-value {
          font-size: 1rem;
          color: var(--secondary-mint);
          font-weight: 600;
        }

        .social-section h4 {
          font-size: 1.1rem;
          color: var(--accent-lime);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(206, 241, 123, 0.1);
          color: var(--accent-lime);
          text-decoration: none;
          border-radius: 10px;
          border: 1px solid rgba(206, 241, 123, 0.2);
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .social-link:hover {
          background: rgba(206, 241, 123, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(206, 241, 123, 0.2);
        }

        .form-card {
          background: rgba(10, 31, 24, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 241, 123, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
        }

        .form-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-lime);
          margin-bottom: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: var(--secondary-mint);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid rgba(206, 237, 178, 0.2);
          background: rgba(5, 20, 15, 0.5);
          color: var(--light);
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--gray);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-lime);
          box-shadow: 0 0 0 3px rgba(206, 241, 123, 0.1);
          background: rgba(5, 20, 15, 0.7);
        }

        .submit-btn {
          width: 100%;
          padding: 1.25rem 2rem;
          background: linear-gradient(
            135deg,
            var(--primary-green),
            var(--primary-green-dark)
          );
          color: var(--light);
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          cursor: pointer;
          margin-top: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(8, 71, 52, 0.4);
          background: linear-gradient(
            135deg,
            var(--primary-green-light),
            var(--primary-green)
          );
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.submitting {
          background: var(--gray-dark);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .form-status {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          font-weight: 500;
        }

        .form-status.success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .form-status.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 1024px) {
          .contact-content {
            gap: 3rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        @media (max-width: 768px) {
          .contact {
            padding: 3rem 0;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-top: 2rem;
          }

          .info-card,
          .form-card {
            padding: 2rem;
          }

          .social-links {
            flex-direction: column;
          }

          .social-link {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .info-card,
          .form-card {
            padding: 1.5rem;
          }

          .contact-item {
            padding: 0.875rem;
          }

          .contact-icon {
            width: 45px;
            height: 45px;
          }

          .submit-btn {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
