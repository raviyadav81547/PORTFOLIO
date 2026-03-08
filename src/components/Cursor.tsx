import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLCanvasElement>(null);

  // FLUID BLOB CURSOR
  useEffect(() => {
    const canvas = blobRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const blobs: { x: number; y: number; tx: number; ty: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 6; i++) {
      blobs.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, tx: 0, ty: 0, r: 18 - i * 2, alpha: 0.06 - i * 0.008 });
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let isHover = false;

    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    document.querySelectorAll("a, button, .work-box").forEach(el => {
      el.addEventListener("mouseenter", () => { isHover = true; });
      el.addEventListener("mouseleave", () => { isHover = false; });
    });

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs[0].tx = mx;
      blobs[0].ty = my;
      for (let i = 1; i < blobs.length; i++) {
        blobs[i].tx = blobs[i - 1].x;
        blobs[i].ty = blobs[i - 1].y;
      }
      blobs.forEach((b, i) => {
        b.x += (b.tx - b.x) * (0.25 - i * 0.025);
        b.y += (b.ty - b.y) * (0.25 - i * 0.025);
        const r = isHover ? b.r * 2.5 : b.r;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, `rgba(196,129,255,${b.alpha * (isHover ? 1.8 : 1)})`);
        grad.addColorStop(1, "rgba(196,129,255,0)");
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ORIGINAL CURSOR LOGIC
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
      <canvas className="cursor-blob-canvas" ref={blobRef} />
      <div className="cursor-main" ref={cursorRef}></div>
      <div className="cursor-trail" ref={trailRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>
    </>
  );
};

export default Cursor;
