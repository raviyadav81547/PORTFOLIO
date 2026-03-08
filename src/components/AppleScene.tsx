import { useEffect, useRef } from "react";
import "./styles/AppleScene.css";

const AppleScene = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current!;
    const glow = glowRef.current!;
    const wrap = wrapRef.current!;

    let injected = false;
    let cleanup: (() => void) | null = null;

    const tryInject = () => {
      const charModel = document.querySelector(".character-model") as HTMLElement;
      if (!charModel) { setTimeout(tryInject, 500); return; }
      if (injected) return;
      injected = true;

      charModel.style.position = "relative";
      charModel.appendChild(wrap);

      const onScroll = () => {
        const rect = charModel.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - (rect.top / vh);
        const progress = Math.max(0, Math.min(1, raw));

        if (progress < 0.2) {
          const p = progress / 0.2;
          logo.style.transform = `translate(-50%, -50%) scale(${10 - p * 9})`;
          logo.style.opacity = String(p * p);
          logo.style.filter = `blur(${(1 - p) * 15}px) brightness(${3 - p * 2})`;
          glow.style.opacity = String(p * 0.8);
        } else if (progress < 0.5) {
          const p = (progress - 0.2) / 0.3;
          logo.style.transform = `translate(-50%, -50%) scale(${1 + (1-p)*0.5})`;
          logo.style.opacity = "1";
          logo.style.filter = `blur(0px) brightness(${1 + (1-p)})`;
          glow.style.opacity = String(0.8 - p * 0.5);
        } else {
          logo.style.transform = `translate(-50%, -50%) scale(0.9)`;
          logo.style.opacity = "1";
          logo.style.filter = "blur(0px) brightness(1)";
          glow.style.opacity = "0.2";
          logo.classList.add("logo-stuck");
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      // Run once on mount
      onScroll();
      cleanup = () => window.removeEventListener("scroll", onScroll);
    };

    // Wait for 3D model to load
    setTimeout(tryInject, 1500);
    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div className="apple-logo-container" ref={wrapRef}>
      <div className="apple-glow-burst" ref={glowRef} />
      <div className="apple-logo-svg" ref={logoRef}>
        <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.2c-52.2-77.2-96.3-196.7-96.3-311.4 0-218.7 143.4-334.3 284.1-334.3 73 0 133.8 48.3 179.3 48.3 44 0 112.7-51.4 195.5-51.4 31.2 0 108.2 2.6 168.2 81.9zm-224.3-76.9c-33.8-41.7-81.8-67.9-131.5-67.9-5.8 0-11.6.6-17.4 1.3 1.9-17.4 9.7-34.2 20.3-49.4 36.5-50.1 99.4-84.5 157.5-84.5 3.2 0 6.5.3 9.7.6-1.9 19.4-9.7 37.5-21 53.5-29.7 41.7-73.1 67.3-117.6 146.4z"/>
        </svg>
      </div>
    </div>
  );
};

export default AppleScene;
