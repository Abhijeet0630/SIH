import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-parchment-100/90 border-b border-parchment-200/80 py-2.5 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="site-container flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-parchment-600">
        <Link 
          to="/" 
          className="hover:text-category-temples transition-colors flex items-center gap-1 text-parchment-700"
          title="Return to Home"
        >
          <HomeIcon className="w-3.5 h-3.5" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1 || item.isCurrent;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-parchment-400 shrink-0" />
              {isLast || !item.path ? (
                <span 
                  aria-current={isLast ? 'page' : undefined}
                  className="text-parchment-950 font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-category-temples transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
