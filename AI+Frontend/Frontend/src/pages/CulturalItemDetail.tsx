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
  Loader2
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { getCulturalItemBySlug } from '../data/culturalItems';
import { getStateById } from '../data/states';
import { api, ApiCultureDetail, ApiConnectionNode } from '../services/api';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const CulturalItemDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const fallbackItem = slug ? getCulturalItemBySlug(slug) : undefined;
  
  const [liveItem, setLiveItem] = useState<ApiCultureDetail | null>(null);
  const [connections, setConnections] = useState<ApiConnectionNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      api.getCulturalItem(slug),
      api.getCulturalConnections(slug),
    ]).then(([itemRes, connRes]) => {
      if (!isMounted) return;
      if (itemRes.success && itemRes.data) {
        setLiveItem(itemRes.data);
        // Automatically register discovery in Cultural Passport
        api.recordDiscovery(itemRes.data.type, itemRes.data.id).catch(() => {});
      } else if (!fallbackItem) {
        setError(itemRes.error?.message || 'Cultural item not found in the archives.');
      }
      if (connRes.success && connRes.data?.connections) {
        setConnections(connRes.data.connections);
      }
      setLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const itemTitle = liveItem?.name || fallbackItem?.title || '';
  const itemType = liveItem?.type || fallbackItem?.category || '';
  const itemStateId = liveItem?.state_id || fallbackItem?.stateId || '';
  const state = getStateById(itemStateId);
  const itemImage = liveItem?.image_url || fallbackItem?.primaryImage || '';
  const itemShortDesc = liveItem?.short_description || fallbackItem?.shortDescription || '';
  const itemDesc = liveItem?.description || fallbackItem?.description || '';
  const itemHistory = liveItem?.history || fallbackItem?.history || '';
  const itemSignificance = liveItem?.cultural_significance || fallbackItem?.culturalSignificance || '';
  const itemTags = liveItem?.tags || fallbackItem?.tags || [];
  const itemRecipe = liveItem?.recipe || fallbackItem?.recipeInfo;
  const originName = liveItem?.origin || fallbackItem?.location.name || '';
  const districtName = liveItem?.region || fallbackItem?.location.district || '';

  const starNodes = connections.length > 0 
    ? connections.map(c => ({ id: c.id, type: c.type, label: c.name, shortDescription: `Relationship: ${c.relationship}` }))
    : (fallbackItem?.starSchemaNodes || []);

  const [activeStarNodeId, setActiveStarNodeId] = useState<string | null>(null);

  if (loading && !liveItem && !fallbackItem) {
    return (
      <div className="site-container py-28 text-center space-y-4 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-category-temples animate-spin" />
        <p className="body-text text-parchment-600">Retrieving cultural archives...</p>
      </div>
    );
  }

  if (error && !liveItem && !fallbackItem) {
    return (
      <div className="site-container py-20 sm:py-28 text-center space-y-4">
        <h1 className="page-title text-parchment-900">Cultural Item Not Found</h1>
        <p className="body-text text-parchment-600">{error}</p>
        <Link to="/explore" className="inline-flex items-center gap-2 text-category-temples font-semibold">
          Return to National Explorer <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const activeNode = starNodes.find((n) => n.id === activeStarNodeId) || starNodes[0];

  const recipePrepTime = itemRecipe && 'prepTime' in itemRecipe ? itemRecipe.prepTime : (itemRecipe && 'preparation_time' in itemRecipe ? itemRecipe.preparation_time : '');
  const recipeDifficulty = itemRecipe && 'difficulty' in itemRecipe ? itemRecipe.difficulty : (itemRecipe && 'cookTime' in itemRecipe ? itemRecipe.cookTime : '');
  const recipeIngredients: string[] = itemRecipe && 'ingredients' in itemRecipe && Array.isArray(itemRecipe.ingredients)
    ? itemRecipe.ingredients
    : (itemRecipe && 'ingredientsSummary' in itemRecipe && Array.isArray(itemRecipe.ingredientsSummary) ? itemRecipe.ingredientsSummary : []);
  const recipeUrl = itemRecipe && 'recipeUrl' in itemRecipe ? itemRecipe.recipeUrl : (itemRecipe && 'recipe_url' in itemRecipe ? itemRecipe.recipe_url : '');
  const recipeContext = itemRecipe && 'culturalContext' in itemRecipe ? itemRecipe.culturalContext : itemShortDesc;

  return (
    <div className="min-h-screen pb-20 space-y-8 sm:space-y-12 w-full overflow-hidden">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Explore India', path: '/explore' },
          { label: state?.name || itemStateId, path: `/state/${itemStateId}` },
          { label: districtName ? `${districtName}` : 'District', path: `/state/${itemStateId}` },
          { label: itemTitle, isCurrent: true }
        ]} 
      />

      <div className="site-container space-y-10 sm:space-y-12">
        
        {/* Main Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Primary Visual Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-72 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-heritage-lg border border-parchment-200 bg-parchment-200">
              <img
                src={itemImage}
                alt={itemTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-parchment-900 shadow-sm">
                  {itemType}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{originName || 'Origin'}, {districtName || 'District'}, {state?.name || itemStateId}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                  {itemTitle}
                </h1>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {itemTags.map((tag) => (
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
                {originName || state?.name} ({districtName ? `${districtName} District, ` : ''}{state?.name || itemStateId})
              </p>
            </div>

            <div className="space-y-2 pt-3.5 border-t border-parchment-100">
              <span className="text-[11px] uppercase font-bold text-category-temples tracking-wider block">
                {t('itemDetail.significance')}
              </span>
              <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                {itemSignificance || itemShortDesc || itemDesc}
              </p>
            </div>

            <div className="space-y-2 pt-3.5 border-t border-parchment-100">
              <span className="text-[11px] uppercase font-bold text-category-temples tracking-wider block">
                {t('itemDetail.history')}
              </span>
              <p className="text-xs sm:text-sm text-parchment-600 leading-relaxed">
                {itemHistory || itemDesc}
              </p>
            </div>

            {/* If 3D Model Available */}
            {fallbackItem?.model3DId && (
              <div className="pt-3">
                <Link
                  to={`/monument/${fallbackItem.model3DId}`}
                  className="w-full py-3 px-4 rounded-xl bg-parchment-900 hover:bg-category-temples text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch 3D Monument Virtual Tour</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* STAR SCHEMA / KNOWLEDGE GRAPH SECTION */}
        {starNodes && starNodes.length > 0 && (
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
                {starNodes.map((node) => {
                  const isSelected = (activeNode?.id || starNodes[0].id) === node.id;
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
                    Connected to {itemTitle}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-parchment-950">
                  {activeNode?.label}
                </h3>
                <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                  {activeNode?.shortDescription || `${activeNode?.label} is culturally connected with ${itemTitle}.`}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FOOD RECIPE SECTION (IF CATEGORY IS FOOD) */}
        {itemType === 'food' && (recipeIngredients.length > 0 || recipeUrl) && (
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
                {recipePrepTime && (
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-category-food/20 text-category-food font-medium">
                    Prep: {recipePrepTime}
                  </span>
                )}
                {recipeDifficulty && (
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-category-food/20 text-category-food font-medium">
                    Difficulty: {recipeDifficulty}
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
                  {recipeIngredients.map((ing: string, idx: number) => (
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
                    {recipeContext}
                  </p>
                </div>

                <div className="pt-3">
                  {recipeUrl && (
                    <a
                      href={recipeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-category-food text-white font-semibold text-xs sm:text-sm hover:bg-orange-700 transition-colors shadow-sm"
                    >
                      <span>{t('itemDetail.exploreRecipe')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED CULTURAL TRADITIONS */}
        {fallbackItem?.relatedItemSlugs && fallbackItem.relatedItemSlugs.length > 0 && (
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
              {fallbackItem.relatedItemSlugs.map((slug) => {
                const relItem = getCulturalItemBySlug(slug);
                if (!relItem) return null;
                return (
                  <Link
                    key={relItem.id}
                    to={`/culture/${relItem.slug}`}
                    className="group bg-white rounded-2xl border border-parchment-200 overflow-hidden shadow-heritage-sm hover:shadow-heritage-md transition-all flex flex-col"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={relItem.primaryImage}
                        alt={relItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-parchment-900">
                        {relItem.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-parchment-500 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>{relItem.location.name}, {relItem.location.district}</span>
                        </div>
                        <h3 className="font-serif font-bold text-sm sm:text-base text-parchment-900 group-hover:text-category-temples transition-colors">
                          {relItem.title}
                        </h3>
                        <p className="text-xs text-parchment-600 line-clamp-2 mt-1">
                          {relItem.shortDescription}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-category-temples">
                        <span>{t('common.explore')}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* VERIFIED CITATIONS & SOURCES */}
        {fallbackItem?.sources && fallbackItem.sources.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-parchment-100/70 border border-parchment-200 space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-parchment-600 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>{t('itemDetail.sources')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-parchment-700">
              {fallbackItem.sources.map((src, idx) => (
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
