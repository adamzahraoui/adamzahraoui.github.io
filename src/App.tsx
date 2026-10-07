import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { KnowledgeSharing } from './components/KnowledgeSharing'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { TerminalSection } from './components/TerminalSection'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <KnowledgeSharing />
        <Skills />
        <Projects />
        <TerminalSection />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
