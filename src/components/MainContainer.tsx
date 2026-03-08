import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import AppleScene from "./AppleScene";
import Career from "./Career";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import MegaEffects from "./MegaEffects";
import Navbar from "./Navbar";
import ParticleField from "./ParticleField";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isDesktopView]);

  // SCROLL PROGRESS BAR
  useEffect(() => {
    const bar = document.createElement("div");
    bar.className = "scroll-indicator";
    bar.style.width = "0%";
    document.body.appendChild(bar);

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, []);

  // SCROLL REVEAL
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 3D CARD TILT
  useEffect(() => {
    const addTilt = () => {
      document.querySelectorAll<HTMLElement>(".work-box").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
    };
    const t = setTimeout(addTilt, 1000);
    return () => clearTimeout(t);
  }, []);

  // PARALLAX on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Parallax on hero text
      const intro = document.querySelector<HTMLElement>(".landing-intro");
      if (intro) {
        intro.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
      // Subtle section parallax
      document.querySelectorAll<HTMLElement>(".parallax-slow").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY) * 0.04;
        el.style.transform = `translateY(${-offset * 0.3}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FLOATING PARTICLES
  useEffect(() => {
    const particles = ["particle-1", "particle-2", "particle-3"].map((cls) => {
      const el = document.createElement("div");
      el.className = `particle ${cls}`;
      document.body.appendChild(el);
      return el;
    });
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <div className="container-main">
      <ParticleField />
      <MegaEffects />
      <AppleScene />
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Certifications />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
