import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectsSection } from './components/ProjectsSection'
import { StackSection } from './components/StackSection'
import { useCustomCursor } from './hooks/useCustomCursor'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

function App() {
  useCustomCursor()
  useRevealOnScroll()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
