import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const trail = trailRef.current!;
    const glow = glowRef.current!;
    const mousePos = { x: 0, y: 0 };
    const trailPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      gsap.to(cursor, { x: e.clientX - 6, y: e.clientY - 6, duration: 0.05 });
      gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
    });

    requestAnimationFrame(function loop() {
      if (!hover) {
        trailPos.x += (mousePos.x - trailPos.x) / 10;
        trailPos.y += (mousePos.y - trailPos.y) / 10;
        gsap.to(trail, { x: trailPos.x - 20, y: trailPos.y - 20, duration: 0.1 });
      }
      requestAnimationFrame(loop);
    });

    document.querySelectorAll("a, button, .work-box, .what-content, [data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        } else if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
          trail.classList.add("trail-disable");
        } else {
          cursor.classList.add("cursor-hover");
          trail.classList.add("trail-hover");
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons", "cursor-hover");
        trail.classList.remove("trail-disable", "trail-hover");
        hover = false;
      });
    });
  }, []);

  return (
    <>
      <div className="cursor-main" ref={cursorRef}></div>
      <div className="cursor-trail" ref={trailRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>
    </>
  );
};

export default Cursor;
