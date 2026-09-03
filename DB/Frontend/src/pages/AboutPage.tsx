import React from 'react';
import { Compass, Sparkles, Shield, Layers, BookOpen } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-parchment-50 pb-16">
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'About the Initiative', isCurrent: true }
        ]} 
      />

      <div className="site-container py-8 sm:py-12 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-category-temples/10 text-category-temples text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Smart India Hackathon 2026 · Digital Heritage Initiative</span>
        </div>
        <h1 className="page-title text-parchment-950">
          AI-Powered Digital Preservation & Interactive Exploration of Indian Cultural Heritage
        </h1>
        <p className="body-text text-parchment-600 max-w-2xl mx-auto">
          An open digital repository and interactive cultural atlas created to preserve, celebrate, and make accessible India’s tangible and intangible living heritage across generations and languages.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-parchment-200 shadow-heritage-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-category-temples/10 text-category-temples">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-lg text-parchment-900">Map-First Geographic Hierarchy</h2>
          <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
            Exploration begins with the whole of India, guiding visitors naturally into state-level regional cartography (starting with <strong>Maharashtra</strong> as primary state and <strong>Assam</strong> and <strong>Meghalaya</strong> as Northeast demonstration hubs).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-parchment-200 shadow-heritage-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-category-forts/10 text-category-forts">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-lg text-parchment-900">Verified Archaeological Grounding</h2>
          <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
            Every cultural icon, historical date, textile weave, and traditional recipe is documented with authentic source attribution from the Archaeological Survey of India (ASI) and UNESCO dossiers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-parchment-200 shadow-heritage-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-category-dance/10 text-category-dance">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-lg text-parchment-900">Interconnected Star Schema</h2>
          <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
            Knowledge graphs connect material origins, historical patronage, living performance traditions, and seasonal festivals across diverse regional geographies.
          </p>
        </div>
      </div>

      {/* Innovation & Scalability Architecture */}
      <div className="p-6 sm:p-8 rounded-3xl bg-parchment-100 border border-parchment-200 space-y-4">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-parchment-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-category-temples" />
          <span>Interactive Frontend Architecture</span>
        </h2>
        <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed max-w-3xl">
          Built as a modern, high-performance React + TypeScript application with client-side localization (English, Hindi, Marathi), accessibility compliance (WCAG 2.1 AA screen-reader semantics and high-contrast modes), and responsive 3D / procedural spatial renderings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white border border-parchment-200 text-xs text-parchment-700 space-y-1">
            <strong className="block text-parchment-900 font-serif">Scale-Ready Taxonomy</strong>
            <p>12+ distinct cultural categories spanning culinary, textile, dance, music, tribal, and architectural heritage.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-parchment-200 text-xs text-parchment-700 space-y-1">
            <strong className="block text-parchment-900 font-serif">AI Cultural Companion</strong>
            <p>Context-aware dialogue guide simulated with deep links to state and monument explorations.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-parchment-200 text-xs text-parchment-700 space-y-1">
            <strong className="block text-parchment-900 font-serif">Dynamic Cultural Calendar</strong>
            <p>Interactive timeline tracking seasonal harvest rituals and celebrations across India.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


