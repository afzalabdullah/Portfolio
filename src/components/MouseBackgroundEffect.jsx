import React, { useEffect, useRef, useState } from "react";

const MouseBackgroundEffect = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const delayedPos = useRef({ x: 0, y: 0 });
  const glowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId;

    const animate = () => {
      const lerpFactor = 0.15;

      delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * lerpFactor;
      delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * lerpFactor;

      if (glowRef.current) {
        // subtle scaling based on distance from center
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;

        glowRef.current.style.transform = `translate3d(${delayedPos.current.x}px, ${delayedPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
          willChange: "transform",
        }}
      >
        {/* Core Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle, var(--mouse-glow-primary) 0%, transparent 50%)",
            opacity: 0.7,
            filter: "blur(25px)",
          }}
        />

        {/* Neon Atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            background: "radial-gradient(circle, var(--mouse-glow-secondary) 0%, transparent 60%)",
            opacity: 0.4,
            filter: "blur(50px)",
          }}
        />

        {/* Accent Flicker */}
        <div
          style={{
            position: "absolute",
            inset: "10%",
            background: "radial-gradient(circle, var(--mouse-glow-accent) 0%, transparent 70%)",
            opacity: 0.45,
            filter: "blur(35px)",
          }}
        />
      </div>
    </div>
  );
};

export default MouseBackgroundEffect;
