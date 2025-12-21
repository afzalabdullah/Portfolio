import React, { useEffect, useState } from "react";

const MouseBackgroundEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="mouse-glow"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: mousePos.x,
          top: mousePos.y,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.6 : 0,
          transition: "opacity 0.5s ease",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};

export default MouseBackgroundEffect;