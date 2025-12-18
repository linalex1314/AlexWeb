import React from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Tools } from './components/Tools';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CMS } from './components/CMS';

const MainContent: React.FC = () => {
    const { currentPage } = useContent();

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
            case 'about':
                return <Hero />;
            case 'skills':
                return <Skills />;
            case 'projects':
                return <Projects />;
            case 'tools':
                return <Tools />;
            case 'contact':
                return <Contact />;
            case 'cms':
                return <CMS />;
            default:
                return <Hero />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
            <Navbar />
            <main>
                {renderPage()}
            </main>
            {currentPage !== 'cms' && <Footer />}
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