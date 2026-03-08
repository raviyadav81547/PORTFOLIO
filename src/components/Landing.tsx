import { PropsWithChildren, useEffect, useRef } from "react";
import "./styles/Landing.css";

const WORDS = ["AI Builder.", "Automation.", "GenAI Dev.", "Problem Solver."];

const Landing = ({ children }: PropsWithChildren) => {
  const typeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    let wordIdx = 0, charIdx = 0, deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = WORDS[wordIdx];
      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        el.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % WORDS.length;
          timeout = setTimeout(type, 300);
          return;
        }
        timeout = setTimeout(type, 40);
      }
    };
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              RAVI
              <br />
              <span>KUMAR</span>
            </h1>
            <div className="typewriter-line">
              <span ref={typeRef} className="typewriter-text"></span>
              <span className="typewriter-cursor">|</span>
            </div>
          </div>
          <div className="landing-info">
            <h3>An AI</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Automation</div>
              <div className="landing-h2-2">Builder</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Builder</div>
              <div className="landing-h2-info-1">Automation</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
