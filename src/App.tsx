import { useCustomCursor } from './hooks/useCustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useCustomCursor()

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-text">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
