import { useEffect } from "react";
import "./styles/Certifications.css";

const certs = [
  {
    name: "Google AI Essentials",
    issuer: "Google",
    year: "2024",
    color: "#4285F4",
    image: "/images/certs/cert_google.webp",
    link: "#",
  },
  {
    name: "Microsoft Azure AI",
    issuer: "Microsoft",
    year: "2024",
    color: "#00A4EF",
    image: "/images/certs/cert_microsoft.webp",
    link: "#",
  },
  {
    name: "Be10x AI Tools",
    issuer: "Be10x",
    year: "2024",
    color: "#FF6B35",
    image: "/images/certs/cert_be10x.webp",
    link: "#",
  },
  {
    name: "Outskill AI",
    issuer: "Outskill",
    year: "2024",
    color: "#00E676",
    image: "/images/certs/cert_outskill.webp",
    link: "#",
  },
  {
    name: "Apple Developer",
    issuer: "Apple",
    year: "2024",
    color: "#ffffff",
    image: "/images/certs/cert_apple.webp",
    link: "#",
  },
  {
    name: "GenAI Fundamentals",
    issuer: "Google Cloud",
    year: "2024",
    color: "#c481ff",
    image: "/images/certs/cert_genai.webp",
    link: "#",
  },
];

const Certifications = () => {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".cert-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("cert-visible");
            }, i * 100);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cert-section" id="certifications">
      <div className="cert-container section-container">
        <div className="cert-header reveal-up">
          <span className="cert-eyebrow">VERIFIED SKILLS</span>
          <h2>Certifi<span>cations</span></h2>
          <p className="cert-sub">Industry-recognized credentials in AI, Cloud & Automation</p>
        </div>

        <div className="cert-grid">
          {certs.map((cert, i) => (
            <a
              href={cert.link}
              target="_blank"
              className="cert-card"
              key={i}
              style={{ "--cert-color": cert.color } as React.CSSProperties}
            >
              <div className="cert-img-wrap">
                <img src={cert.image} alt={cert.name} className="cert-thumb" />
                <div className="cert-img-glow" />
              </div>
              <div className="cert-footer">
                <span className="cert-badge">✓ Verified</span>
                <span className="cert-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
