import * as fs from 'fs';
import * as path from 'path';

// Import data
import { STATES_DATA } from './src/data/states';
import { CULTURAL_CATEGORIES } from './src/data/categories';
import { MAHARASHTRA_CULTURAL_ITEMS } from './src/data/maharashtraCulturalItems';
import { NORTHEAST_CULTURAL_ITEMS } from './src/data/northeastCulturalItems';
import { MONUMENTS_DATA } from './src/data/monuments';
import { CULTURAL_FESTIVALS } from './src/data/festivals';
import { ALL_CULTURAL_ITEMS } from './src/data/culturalItems';

const states = Object.values(STATES_DATA);
const monuments = Object.values(MONUMENTS_DATA);
const categories = CULTURAL_CATEGORIES;
const festivals = CULTURAL_FESTIVALS;
const allItems = [...MAHARASHTRA_CULTURAL_ITEMS, ...NORTHEAST_CULTURAL_ITEMS, ...ALL_CULTURAL_ITEMS];

// Deduplicate items by ID
const uniqueItemsMap = new Map();
allItems.forEach(item => uniqueItemsMap.set(item.id, item));
const uniqueItems = Array.from(uniqueItemsMap.values());

const data = {
    states: states.map(s => ({
        id: s.id, code: s.code, name: s.name, native_name: s.nativeName,
        capital: s.capital, region: s.region, is_fully_developed: s.isFullyDeveloped,
        cultural_identity: s.culturalIdentity, short_description: s.shortDescription,
        historical_overview: s.historicalOverview, languages: s.languages,
        banner_image_url: s.bannerImage, item_count: s.itemCount,
        monument_count: s.monumentCount, highlighted_item_slug: s.highlightedItemSlug,
        latitude: s.coordinates?.lat, longitude: s.coordinates?.lng
    })),
    state_sub_regions: states.flatMap(s => (s.subRegions || []).map(sr => ({
        id: sr.id, state_id: s.id, name: sr.name, districts: sr.districts,
        description: sr.description, cultural_character: sr.culturalCharacter
    }))),
    categories: categories.map(c => ({
        id: c.id, label_key: c.labelKey, default_label: c.defaultLabel,
        icon_name: c.iconName, accent_color: c.accentColor, description: c.description
    })),
    cultural_items: uniqueItems.map(item => ({
        id: item.id, slug: item.id, title: item.name || item.title, state_id: item.stateId,
        category: item.category, short_description: item.shortDescription,
        description: item.description || item.detailedDescription, history: item.history,
        cultural_significance: item.culturalSignificance, location_name: item.location || item.origin,
        latitude: item.coordinates?.lat, longitude: item.coordinates?.lng,
        images: item.images || [], primary_image: item.primaryImage || item.imageUrl,
        tags: item.tags || [], recipe_info: item.recipeInfo || null, model_3d_id: item.model3dId || null
    })),
    festivals: festivals.map(fest => ({
        id: fest.id, name: fest.name, month_index: fest.monthIndex, date_or_season: fest.dateOrSeason,
        upcoming_date: fest.upcomingDate, day_or_tithi: fest.dayOrTithi, state: fest.state,
        state_id: fest.stateId, category: fest.category, image: fest.image,
        short_description: fest.shortDescription, cultural_significance: fest.culturalSignificance
    })),
    monuments: monuments.map(mon => ({
        id: mon.id, slug: mon.id, name: mon.name, state: mon.state, state_id: mon.stateId,
        region: mon.region, district_or_city: mon.districtOrCity, category: mon.category,
        short_description: mon.shortDescription, description: mon.description,
        detailed_history: mon.detailedHistory, cultural_importance: mon.culturalImportance,
        location_name: mon.locationName, year_built: mon.yearBuilt, architectural_style: mon.architecturalStyle,
        image: mon.image, banner_image: mon.bannerImage, latitude: mon.coordinates?.lat, longitude: mon.coordinates?.lng
    })),
    monument_hotspots: monuments.flatMap(mon => (mon.hotspots || []).map(hotspot => ({
        id: hotspot.id, monument_id: mon.id, title: hotspot.title, short_description: hotspot.shortDescription,
        detailed_text: hotspot.detailedText, position_x: hotspot.position?.[0], position_y: hotspot.position?.[1], position_z: hotspot.position?.[2],
        camera_position_x: hotspot.cameraPosition?.[0], camera_position_y: hotspot.cameraPosition?.[1], camera_position_z: hotspot.cameraPosition?.[2],
        camera_target_x: hotspot.cameraTarget?.[0], camera_target_y: hotspot.cameraTarget?.[1], camera_target_z: hotspot.cameraTarget?.[2],
        image_url: hotspot.imageUrl, architectural_note: hotspot.architecturalNote
    })))
};

const outputPath = path.resolve(process.cwd(), '../Backend/Database/seed_data.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log('Seed JSON written to', outputPath);
