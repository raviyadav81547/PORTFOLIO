import { PropsWithChildren, useEffect, useRef } from "react";
import "./styles/Landing.css";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scramble(el: HTMLElement, finalText: string, duration = 1000) {
  let start: number | null = null;
  let frame: number;
  const len = finalText.length;

  const step = (ts: number) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const revealed = Math.floor(progress * len);
    let output = "";
    for (let i = 0; i < len; i++) {
      if (i < revealed) {
        output += finalText[i];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = output;
    if (progress < 1) frame = requestAnimationFrame(step);
    else el.textContent = finalText;
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

const WORDS = ["AI Builder.", "Automation.", "GenAI Dev.", "Problem Solver.", "RAVI KUMAR."];

const Landing = ({ children }: PropsWithChildren) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);

  // TEXT SCRAMBLE on hover
  useEffect(() => {
    const el = h1Ref.current;
    if (!el) return;
    let cancel: (() => void) | null = null;
    const onEnter = () => {
      if (cancel) cancel();
      cancel = scramble(el, "RAVI\nKUMAR", 800);
    };
    el.addEventListener("mouseenter", onEnter);
    return () => el.removeEventListener("mouseenter", onEnter);
  }, []);

  // TYPEWRITER + GLITCH loop
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    let glitchTimeout: ReturnType<typeof setTimeout>;

    const glitch = () => {
      const orig = el.textContent || "";
      let g = 0;
      const glitchLoop = () => {
        if (g++ > 6) { el.textContent = orig; el.classList.remove("glitch-active"); return; }
        el.textContent = orig.split("").map(c =>
          Math.random() > 0.7 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c
        ).join("");
        el.classList.add("glitch-active");
        glitchTimeout = setTimeout(glitchLoop, 50);
      };
      glitchLoop();
    };

    const type = () => {
      const word = WORDS[wordIdx];
      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(() => { glitch(); type(); }, 1800);
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
    return () => { clearTimeout(timeout); clearTimeout(glitchTimeout); };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1 ref={h1Ref} className="scramble-text">
              RAVI
              <br />
              <span>KUMAR</span>
            </h1>
            <div className="typewriter-line">
              <span ref={typeRef} className="typewriter-text"></span>
              <span className="typewriter-cursor">|</span>
            </div>
            <div className="landing-tags">
              <span className="tag">AI Systems</span>
              <span className="tag">Automation</span>
              <span className="tag">GenAI</span>
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
