import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-parchment-100 border-t border-parchment-200 text-parchment-800 texture-sandstone pt-12 sm:pt-16 pb-10 mt-16 sm:mt-20 w-full overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-10 border-b border-parchment-300/60">
          
          {/* Col 1: Initiative Statement */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-category-temples to-category-food flex items-center justify-center text-white shadow-heritage-sm shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-category-temples block">
                  Student Innovation Initiative
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-parchment-950">
                  India Cultural Heritage Experience
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-parchment-600 max-w-md leading-relaxed">
              Showcasing the rich cultural heritage and living traditions of India through interactive digital cartography, Sahyadri fort architectures, 3D monument reconstructions, and connected knowledge graphs.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-parchment-500 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-parchment-200 text-category-temples font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Hackathon Prototype
              </span>
              <span>•</span>
              <span>Maharashtra Core Focus</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-parchment-950">
              Exploration Hubs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-parchment-600">
              <li>
                <Link to="/" className="hover:text-category-temples transition-colors">
                  {t('nav.home') || 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-category-temples transition-colors">
                  {t('nav.exploreIndia') || 'National Spatial Map'}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-category-temples transition-colors">
                  Cultural Layers (12 Lenses)
                </Link>
              </li>
              <li>
                <Link to="/state/maharashtra" className="hover:text-category-temples transition-colors">
                  Maharashtra Spatial Atlas
                </Link>
              </li>
              <li>
                <Link to="/state/assam" className="hover:text-category-temples transition-colors">
                  Assam Spatial Atlas
                </Link>
              </li>
              <li>
                <Link to="/state/meghalaya" className="hover:text-category-temples transition-colors">
                  Meghalaya Spatial Atlas
                </Link>
              </li>
              <li>
                <Link to="/festivals" className="hover:text-category-temples transition-colors">
                  {t('nav.festivals') || 'Cultural Calendar'}
                </Link>
              </li>
              <li>
                <Link to="/monument/gateway-of-india" className="hover:text-category-temples transition-colors">
                  3D Monument Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-category-temples transition-colors">
                  About Initiative
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Archival Integrity */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-parchment-950">
              Data & Ethics
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-parchment-600">
              <li>Archaeological Survey of India</li>
              <li>Ministry of Textiles Heritage</li>
              <li>UNESCO World Heritage Records</li>
              <li>Geographical Indications Registry</li>
              <li>Non-Destructive Local Schema</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-500 gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>Built with devotion to India’s diverse cultural fabric</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-category-temples font-medium">Student Innovation</span>
          </div>
          <div>
            <span>Repository: </span>
            <a 
              href="https://github.com/Abhijeet0630/Reboot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-parchment-700 hover:text-category-temples underline font-mono"
            >
              Abhijeet0630/Reboot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
