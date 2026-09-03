import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CulturalProvider } from './context/CulturalContext';
import { Layout } from './components/Layout/Layout';

// Pages
import { Home } from './pages/Home';
import { ExploreIndia } from './pages/ExploreIndia';
import { StateExplore } from './pages/StateExplore';
import { CulturalItemDetail } from './pages/CulturalItemDetail';
import { MonumentExperience } from './pages/MonumentExperience';
import { FestivalsPage } from './pages/FestivalsPage';
import { AboutPage } from './pages/AboutPage';
import { CategoryExplore } from './pages/CategoryExplore';

export function App() {
  return (
    <LanguageProvider>
      <CulturalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreIndia />} />
            <Route path="/state/:stateId" element={<StateExplore />} />
            <Route path="/explore/:stateId" element={<StateExplore />} />
            <Route path="/categories" element={<CategoryExplore />} />
            <Route path="/category/:categoryId" element={<CategoryExplore />} />
            <Route path="/item/:slug" element={<CulturalItemDetail />} />
            <Route path="/culture/:slug" element={<CulturalItemDetail />} />
            <Route path="/monument/:monumentId" element={<MonumentExperience />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </CulturalProvider>
    </LanguageProvider>
  );
}

export default App;
