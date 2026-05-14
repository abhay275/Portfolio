import { useState, useEffect } from 'react';
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
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [phase, setPhase] = useState('loading'); // loading | terminal | main
  const [isDark, setIsDark] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Loading → Terminal → Main
  const handleLoadingComplete = () => setPhase('terminal');
  const handleTerminalComplete = () => setPhase('main');

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(d => {
      const next = !d;
      document.documentElement.classList.toggle('light', !next);
      return next;
    });
  };

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
            <Navbar
              isDark={isDark}
              toggleTheme={toggleTheme}
              onOpenPalette={() => setCmdOpen(true)}
            />

            <main style={{ position: 'relative', zIndex: 1 }}>
              <Hero />
              <About />
              <TechStack />
              <Projects />
              <Experience />
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
