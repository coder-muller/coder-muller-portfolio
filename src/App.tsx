import { LocaleProvider } from './i18n/LocaleProvider'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import StackMarquee from './components/StackMarquee'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LocaleFade from './components/LocaleFade'

export default function App() {
  useSmoothScroll()

  return (
    <LocaleProvider>
      <Nav />
      <LocaleFade>
        <main id="content">
          <Hero />
          <About />
          <Projects />
          <Services />
          <StackMarquee />
          <Contact />
        </main>
        <Footer />
      </LocaleFade>
    </LocaleProvider>
  )
}
