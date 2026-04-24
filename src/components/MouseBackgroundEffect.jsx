import React, { useEffect, useRef } from "react";

const MouseBackgroundEffect = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const addParticle = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const color = isDark 
        ? `hsla(${30 + Math.random() * 20}, 90%, 60%, ${0.3 + Math.random() * 0.3})` 
        : `hsla(${30 + Math.random() * 20}, 80%, 45%, ${0.15 + Math.random() * 0.15})`;

      particles.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        size: 4 + Math.random() * 8,
        color: color,
      });
    };

    let lastTime = 0;
    const animate = (time) => {
      if (!ctx || !canvas) return;
      if (time - lastTime > 30) {
        addParticle();
        lastTime = time;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life > 0) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
};

export default MouseBackgroundEffect;