import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Rounded, opaque page body that scrolls up over the pinned hero and
            docks against the navbar. */}
        <div className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-sand shadow-[0_-24px_60px_-30px_rgba(31,52,43,0.35)]">
          <Services />
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
