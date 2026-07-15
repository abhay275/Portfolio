import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Global UI
import {
  ScrollProgress,
  LoadingScreen,
  CommandPalette,
} from './components/UIComponents';
import Navbar from './components/Navbar';
import ParticleNetwork from './components/3d/ParticleNetwork';

// Sections
import TerminalIntro from './sections/TerminalIntro';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [phase, setPhase] = useState('loading'); // loading | terminal | main
  const [cmdOpen, setCmdOpen] = useState(false);

  // Loading → Terminal → Main
  const handleLoadingComplete = () => setPhase('terminal');
  const handleTerminalComplete = () => setPhase('main');

  // Command palette keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Always-on overlays */}
      <ScrollProgress />
      <ParticleNetwork />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {phase === 'terminal' && (
          <TerminalIntro key="terminal" onComplete={handleTerminalComplete} />
        )}

        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar onOpenPalette={() => setCmdOpen(true)} />

            <main style={{ position: 'relative', zIndex: 1 }}>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Certifications />
              <Stats />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
