import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { IndiaMapExperience } from '../components/Map/IndiaMapExperience';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const ExploreIndia: React.FC = () => (
  <div className="explore-page min-h-screen bg-parchment-50 pb-16 sm:pb-20 w-full overflow-hidden">
    {/* Breadcrumb Hierarchy */}
    <Breadcrumbs 
      items={[
        { label: 'Explore India', isCurrent: true }
      ]} 
    />

    <div className="texture-warp py-8 sm:py-12 border-b border-parchment-200 bg-white/75 backdrop-blur-xs">
      <div className="site-container space-y-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-parchment-700 hover:text-category-temples transition-colors px-3 py-1 rounded-full bg-white border border-parchment-200 shadow-heritage-xs w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 
          <span>Home</span>
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-category-temples/10 text-category-temples text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Geographic Atlas</span>
          </div>

          <h1 className="page-title text-parchment-950">
            India is the <em className="font-normal italic text-category-temples">starting canvas.</em>
          </h1>

          <p className="body-text text-parchment-600 max-w-3xl mt-2 leading-relaxed">
            Select any state boundary to zoom into its verified living archives. Explore <strong>Maharashtra</strong> as the primary core hub, alongside Northeast demonstration hubs in <strong>Assam</strong> and <strong>Meghalaya</strong>.
          </p>
        </div>
      </div>
    </div>

    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-10">
      <IndiaMapExperience />
    </div>
  </div>
);
