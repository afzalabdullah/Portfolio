import { useEffect, useState } from "react"
import "./App.css"
import MouseBackgroundEffect from "./components/MouseBackgroundEffect"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Skills from "./components/skills/Skills"
import Qualification from "./components/qualification/Qualification"
import Contact from "./components/Contact/Contact"
import Footer from "./components/footer/Footer"
import Scrollup from "./components/scrollup/Scrollup"
import Work from "./components/work/Work"
import AIChat from "./components/aichat/AIChat"

const App = () => {
  const [theme, setTheme] = useState("light")
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme)
    // Save theme preference to localStorage
    localStorage.setItem("portfolio-theme", theme)
    // Dispatch event for components that might not be using props (like curtain wipe)
    window.dispatchEvent(new Event("themechange"));
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <div className="app-container">
      <MouseBackgroundEffect theme={theme} />
      <Header isHidden={isCVModalOpen} theme={theme} toggleTheme={toggleTheme} />
      <main className="main">
        <Home />
        <About isCVModalOpen={isCVModalOpen} setIsCVModalOpen={setIsCVModalOpen} />
        <Skills />
        <Qualification />
        <Work />
        <Contact />
      </main>
      <Footer />
      <Scrollup />
      <AIChat />
    </div>
  )
}

export default App