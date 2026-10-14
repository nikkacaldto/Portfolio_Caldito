import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import Awards from '@/components/Awards'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
