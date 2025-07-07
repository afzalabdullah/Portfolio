import { useEffect, useRef, useState } from "react"

const MouseBackgroundEffect = ({ theme }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x, y) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 0,
      maxLife: Math.random() * 80 + 40,
      type: Math.floor(Math.random() * 3),
      size: Math.random() * 4 + 4, // Larger particles
    })

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          particle.vx += dx * 0.0002
          particle.vy += dy * 0.0002
        }

        return particle.life < particle.maxLife
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        const alpha = 1 - particle.life / particle.maxLife

        ctx.save()
        ctx.globalAlpha = alpha * 0.8

        if (particle.type === 0) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = theme === "light" 
            ? `hsla(200, 70%, 50%, ${alpha})` 
            : `hsla(260, 80%, 60%, ${alpha})`
          ctx.shadowBlur = 10
          // ctx.shadowColor = theme === "light" ? "#60a5fa" : "#a78bfa"
          ctx.fill()
        } else if (particle.type === 1) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y - particle.size)
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size)
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size)
          ctx.closePath()
          ctx.fillStyle = theme === "light" 
            ? `hsla(160, 60%, 45%, ${alpha})` 
            : `hsla(300, 70%, 55%, ${alpha})`
          ctx.shadowBlur = 8
          // ctx.shadowColor = theme === "light" ? "#34d399" : "#d8b4fe"
          ctx.fill()
        } else {
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.life * 0.08)
          ctx.fillStyle = theme === "light" 
            ? `hsla(280, 65%, 50%, ${alpha})` 
            : `hsla(220, 75%, 60%, ${alpha})`
          ctx.shadowBlur = 12
          // ctx.shadowColor = theme === "light" ? "#a78bfa" : "#60a5fa"
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2)
          ctx.restore()
        }

        ctx.restore()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      if (Math.random() < 0.4 && particlesRef.current.length < 150) {
        particlesRef.current.push(
          createParticle(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30),
        )
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleResize = () => {
      resizeCanvas()
    }

    resizeCanvas()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <div
        className="cursor-glow"
        style={{
          left: mouseRef.current.x,
          top: mouseRef.current.y,
          position: "fixed",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 60%)"
              : "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: -1,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

export default MouseBackgroundEffect