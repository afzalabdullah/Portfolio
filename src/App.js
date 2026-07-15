import { useEffect, useState } from "react"
import axios from "axios"
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
import AdminPanel from "./components/AdminPanel"

const App = () => {
  const [theme, setTheme] = useState("light")
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)

  const fetchPortfolioData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/portfolio")
      setPortfolioData(response.data)
      setError(null)
    } catch (err) {
      console.error("Failed to load portfolio data:", err)
      setError("Failed to load portfolio data. Please make sure database is initialized.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
    fetchPortfolioData()
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme)
    // Save theme preference to localStorage
    localStorage.setItem("portfolio-theme", theme)
    // Dispatch event for components that might not be using props
    window.dispatchEvent(new Event("themechange"))
  }, [theme])

  // Key combination listener (Ctrl + Shift + A) to open admin panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault()
        setShowAdmin((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  if (loading) {
    return (
      <div className="portfolio-loading">
        <div className="portfolio-loading__spinner"></div>
        <p>Loading Abdullah's Portfolio...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="portfolio-error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchPortfolioData} className="button">Retry</button>
      </div>
    )
  }

  const { hero, about, skills, qualification, projects, contact, aiChat } = portfolioData || {}

  return (
    <div className="app-container">
      <MouseBackgroundEffect theme={theme} />
      <Header 
        isHidden={isCVModalOpen} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onAdminClick={() => setShowAdmin(true)}
      />
      <main className="main">
        <Home hero={hero} />
        <About 
          about={about} 
          isCVModalOpen={isCVModalOpen} 
          setIsCVModalOpen={setIsCVModalOpen} 
        />
        <Skills skillsData={skills} />
        <Qualification qualificationData={qualification} />
        <Work projectsData={projects} />
        <Contact contactData={contact} />
      </main>
      <Footer onAdminClick={() => setShowAdmin(true)} />
      <Scrollup hidden={isCVModalOpen} />
      <AIChat chatData={aiChat} hidden={isCVModalOpen} />

      {showAdmin && (
        <AdminPanel 
          data={portfolioData} 
          onClose={() => setShowAdmin(false)} 
          onSave={fetchPortfolioData}
        />
      )}
    </div>
  )
}

export default App