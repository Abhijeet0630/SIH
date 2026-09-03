import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  UtensilsCrossed, 
  ChevronRight, 
  ExternalLink,
  Layers,
  FileCheck2,
  Landmark
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { getCulturalItemBySlug } from '../data/culturalItems';
import { getStateById } from '../data/states';
import { monumentService } from '../services/monumentService';
import { MonumentData } from '../types/monument';

import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const CulturalItemDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const item = slug ? getCulturalItemBySlug(slug) : undefined;
  const state = item ? getStateById(item.stateId) : undefined;

  const [monumentData, setMonumentData] = useState<MonumentData | null>(null);

  useEffect(() => {
    if (item?.model3DId) {
      monumentService.getMonumentById(item.model3DId).then((data) => {
        setMonumentData(data);
      });
    } else {
      setMonumentData(null);
    }
  }, [item?.model3DId]);

  const [activeStarNodeId, setActiveStarNodeId] = useState<string | null>(
    item?.starSchemaNodes?.[0]?.id || null
  );

  if (!item) {
    return (
      <div className="site-container py-20 sm:py-28 text-center space-y-4">
        <h1 className="page-title text-parchment-900">Cultural Item Not Found</h1>
        <p className="body-text text-parchment-600">The requested heritage item could not be retrieved from the archives.</p>
        <Link to="/explore" className="inline-flex items-center gap-2 text-category-temples font-semibold">
          Return to National Explorer <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const activeNode = item.starSchemaNodes.find((n) => n.id === activeStarNodeId) || item.starSchemaNodes[0];

  return (
    <div className="min-h-screen pb-20 space-y-8 sm:space-y-12 w-full overflow-hidden">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Explore India', path: '/explore' },
          { label: state?.name || item.stateId, path: `/state/${item.stateId}` },
          { label: item.location.district ? `${item.location.district}` : 'District', path: `/state/${item.stateId}` },
          { label: item.title, isCurrent: true }
        ]} 
      />

      <div className="site-container space-y-10 sm:space-y-12">
        
        {/* Main Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Primary Visual Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-72 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-heritage-lg border border-parchment-200 bg-parchment-200">
              <img
                src={item.primaryImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-parchment-900 shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.location.name}, {item.location.district}, {item.location.state}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                  {item.title}
                </h1>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-parchment-100 border border-parchment-200 text-xs font-medium text-parchment-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Core Cultural Information Overview */}
          <div className="lg:col-span-5 space-y-5 bg-white border border-parchment-200 rounded-3xl p-5 sm:p-7 shadow-heritage-md">
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-category-temples tracking-wider block">
                {t('itemDetail.origin')}
              </span>
              <p className="text-sm font-semibold text-parchment-900">
                {item.location.name} ({item.location.district} District, {item.location.state})
              </p>
            </div>

            <div className="space-y-2 pt-3.5 border-t border-parchment-100">
              <span className="text-[11px] uppercase font-bold text-category-temples tracking-wider block">
                {t('itemDetail.significance')}
              </span>
              <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                {item.culturalSignificance}
              </p>
            </div>

            <div className="space-y-2 pt-3.5 border-t border-parchment-100">
              <span className="text-[11px] uppercase font-bold text-category-temples tracking-wider block">
                {t('itemDetail.history')}
              </span>
              <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
                {item.history}
              </p>
            </div>

            {/* 3D Monument Experience Integration */}
            {item.model3DId && (
              <div className="pt-3">
                {monumentData?.modelAvailable ? (
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-category-temples font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-category-temples" />
                        <span>{t('monuments3D.experienceAvailable') || '3D Experience Available'}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {t('monuments3D.interactive3D') || 'Interactive 3D'}
                      </span>
                    </div>
                    <p className="text-xs text-parchment-700 leading-relaxed">
                      {t('monuments3D.interactiveDescription') || 'Explore this architectural marvel in real-time 3D with realistic lighting, spatial orbit, and structural hotspots.'}
                    </p>
                    <Link
                      to={`/monument/${item.model3DId}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-category-temples hover:bg-amber-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Landmark className="w-4 h-4" />
                      <span>{t('monuments3D.exploreIn3D') || 'Explore in 3D'} →</span>
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-parchment-100 border border-parchment-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-parchment-700 font-mono flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-category-temples" />
                        <span>{t('monuments3D.archivalSurvey') || '3D Archival Survey'}</span>
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-parchment-200 text-parchment-700">
                        {t('monuments3D.inCuration') || 'In Curation'}
                      </span>
                    </div>
                    <p className="text-xs text-parchment-600 leading-relaxed">
                      {t('monuments3D.curationDescription') || 'Photogrammetric scan and 3D mesh under preparation for the national cultural repository.'}
                    </p>
                    <Link
                      to={`/monument/${item.model3DId}`}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-parchment-50 border border-parchment-300 text-parchment-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{t('monuments3D.viewSchematics') || 'View 3D Architectural Schematics'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* STAR SCHEMA / KNOWLEDGE GRAPH SECTION */}
        {item.starSchemaNodes && item.starSchemaNodes.length > 0 && (
          <section className="bg-white border border-parchment-200 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-heritage-md space-y-6 sm:space-y-8 texture-parchment">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-category-temples/10 text-category-temples text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('itemDetail.starSchemaTitle')}</span>
              </div>
              <h2 className="section-title text-parchment-950">
                Connected Heritage Ecosystem
              </h2>
              <p className="body-text text-parchment-600">
                {t('itemDetail.starSchemaSubtitle')}
              </p>
            </div>

            {/* Interactive Star Schema Visual Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Star Nodes List */}
              <div className="lg:col-span-6 space-y-2.5">
                {item.starSchemaNodes.map((node) => {
                  const isSelected = (activeNode?.id || item.starSchemaNodes[0].id) === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveStarNodeId(node.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-category-temples/10 border-category-temples shadow-sm text-parchment-950'
                          : 'bg-white hover:bg-parchment-50 border-parchment-200 text-parchment-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl text-[10px] sm:text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-category-temples text-white' : 'bg-parchment-100 text-parchment-600'
                      }`}>
                        {node.type.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif font-bold text-sm leading-tight text-parchment-900">
                          {node.label}
                        </h3>
                        <p className="text-xs text-parchment-600 mt-0.5 line-clamp-1">
                          {node.shortDescription}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Central Focused Node Display Panel */}
              <div className="lg:col-span-6 p-5 sm:p-7 rounded-3xl bg-parchment-50 border border-parchment-200 shadow-inner space-y-3.5">
                <div className="flex items-center justify-between border-b border-parchment-200 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-category-temples">
                    Node: {activeNode?.type}
                  </span>
                  <span className="text-[11px] font-mono text-parchment-400">
                    Connected to {item.title}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-parchment-950">
                  {activeNode?.label}
                </h3>
                <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                  {activeNode?.detailedContent}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FOOD RECIPE SECTION (IF CATEGORY IS FOOD) */}
        {item.category === 'food' && item.recipeInfo && (
          <section id="recipe" className="bg-gradient-to-br from-amber-50 to-orange-50 border border-category-food/20 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-heritage-md space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-category-food/20 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-category-food text-xs font-bold uppercase tracking-wider">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{t('itemDetail.recipeTitle')}</span>
                </div>
                <h2 className="section-title text-parchment-950">
                  Traditional Culinary Preparation
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {item.recipeInfo.prepTime && (
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-category-food/20 text-category-food font-medium">
                    Prep: {item.recipeInfo.prepTime}
                  </span>
                )}
                {item.recipeInfo.cookTime && (
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-category-food/20 text-category-food font-medium">
                    Cook: {item.recipeInfo.cookTime}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm sm:text-base text-parchment-900">
                  {t('itemDetail.ingredients')}:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-parchment-700">
                  {item.recipeInfo.ingredientsSummary.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-category-food mt-1.5 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-white/85 border border-category-food/20 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-parchment-900">
                    Culinary Ethos:
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
                    {item.recipeInfo.culturalContext}
                  </p>
                </div>

                <div className="pt-3">
                  <a
                    href={item.recipeInfo.recipeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-category-food text-white font-semibold text-xs sm:text-sm hover:bg-orange-700 transition-colors shadow-sm"
                  >
                    <span>{t('itemDetail.exploreRecipe')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] text-parchment-500 block mt-1.5 font-mono">
                    Source: {item.recipeInfo.verifiedSourceName}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED CULTURAL TRADITIONS */}
        {item.relatedItemSlugs && item.relatedItemSlugs.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="section-title text-parchment-950">
                Connected Traditions in the Archive
              </h2>
              <span className="text-xs text-parchment-500">
                Interlinked Cultural Network
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {item.relatedItemSlugs
                .map(s => getCulturalItemBySlug(s))
                .filter((r): r is NonNullable<typeof r> => Boolean(r))
                .map(rel => (
                  <Link
                    key={rel.id}
                    to={`/item/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-parchment-200 hover:border-category-temples shadow-heritage-xs hover:shadow-heritage-md transition-all hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                        <img 
                          src={rel.primaryImage} 
                          alt={rel.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                          {rel.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-1.5">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-parchment-900 group-hover:text-category-temples transition-colors leading-tight">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-parchment-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-category-temples shrink-0" />
                          <span>{rel.location.name}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="pt-2 border-t border-parchment-100 flex items-center justify-between text-xs font-semibold text-category-temples">
                        <span>Explore Connected Story</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* VERIFIED CITATIONS & SOURCES */}
        {item.sources && item.sources.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-parchment-100/70 border border-parchment-200 space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-parchment-600 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>{t('itemDetail.sources')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-parchment-700">
              {item.sources.map((src, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-parchment-200">
                  <span className="font-semibold block text-parchment-900">{src.title}</span>
                  <span className="text-[11px] text-parchment-500">{src.publisher} • Verified {src.verifiedDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
