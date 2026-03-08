import { PropsWithChildren, useEffect, useRef } from "react";
import "./styles/Landing.css";

const WORDS = ["AI Builder.", "Automation.", "GenAI Dev.", "Problem Solver."];

const Landing = ({ children }: PropsWithChildren) => {
  const typeRef = useRef<HTMLSpanElement>(null);
  const raviRef = useRef<HTMLDivElement>(null);
  const kumarRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // CINEMATIC ENTRY — neeche se utha ke aaye
  useEffect(() => {
    const ravi = raviRef.current;
    const kumar = kumarRef.current;
    const hello = helloRef.current;
    const tags = tagsRef.current;
    if (!ravi || !kumar || !hello || !tags) return;

    // Start hidden below
    [hello, ravi, kumar, tags].forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      el.style.transition = "none";
    });

    // Stagger reveal
    const delays = [200, 400, 600, 850];
    [hello, ravi, kumar, tags].forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      }, delays[i]);
    });
  }, []);

  // TYPEWRITER
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
    timeout = setTimeout(type, 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2 ref={helloRef} className="landing-hello">Hello! I'm</h2>
            <div className="landing-name-wrap">
              <div className="landing-name-mask">
                <div ref={raviRef} className="landing-name-ravi">RAVI</div>
              </div>
              <div className="landing-name-mask">
                <div ref={kumarRef} className="landing-name-kumar"><span>KUMAR</span></div>
              </div>
            </div>
            <div ref={tagsRef} className="typewriter-line">
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
