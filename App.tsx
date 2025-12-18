import React from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CMS } from './components/CMS';

const MainContent: React.FC = () => {
    const { currentPage } = useContent();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
            <Navbar />
            
            {currentPage === 'home' ? (
                <>
                    <main>
                        <Hero />
                        <Skills />
                        <Projects />
                        <Contact />
                    </main>
                    <Footer />
                </>
            ) : (
                <main>
                    <CMS />
                </main>
            )}
        </div>
    );
}

const App: React.FC = () => {
  return (
    <ContentProvider>
      <MainContent />
    </ContentProvider>
  );
};

export default App;