import { useEffect, useRef } from "react";
import "./styles/Certifications.css";

const certs = [
  {
    name: "Google AI Essentials",
    issuer: "Google",
    year: "2024",
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    color: "#4285F4",
    link: "#",
  },
  {
    name: "Microsoft Azure AI",
    issuer: "Microsoft",
    year: "2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    color: "#00A4EF",
    link: "#",
  },
  {
    name: "Be10x AI Tools",
    issuer: "Be10x",
    year: "2024",
    logo: "",
    color: "#FF6B35",
    link: "#",
  },
  {
    name: "Prompt Engineering",
    issuer: "DeepLearning.AI",
    year: "2024",
    logo: "",
    color: "#c481ff",
    link: "#",
  },
  {
    name: "GenAI Fundamentals",
    issuer: "Google Cloud",
    year: "2024",
    logo: "",
    color: "#34A853",
    link: "#",
  },
  {
    name: "AI Automation Pro",
    issuer: "Coursera",
    year: "2023",
    logo: "",
    color: "#0056D2",
    link: "#",
  },
];

const Certifications = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".cert-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("cert-visible");
            }, i * 80);
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

        <div className="cert-grid" ref={trackRef}>
          {certs.map((cert, i) => (
            <a
              href={cert.link}
              target="_blank"
              className="cert-card"
              key={i}
              style={{ "--cert-color": cert.color } as React.CSSProperties}
            >
              <div className="cert-glow" />
              <div className="cert-top">
                {cert.logo ? (
                  <img src={cert.logo} alt={cert.issuer} className="cert-logo" />
                ) : (
                  <div className="cert-logo-placeholder" style={{ background: cert.color + "22", color: cert.color }}>
                    {cert.issuer.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="cert-year">{cert.year}</span>
              </div>
              <div className="cert-body">
                <h4 className="cert-name">{cert.name}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
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
