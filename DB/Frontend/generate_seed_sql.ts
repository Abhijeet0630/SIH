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

function escapeSql(str: string | null | undefined): string {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'boolean') return str ? 'TRUE' : 'FALSE';
    if (typeof str === 'number') return str.toString();
    if (typeof str === 'object') {
        const jsonStr = JSON.stringify(str);
        return `'${jsonStr.replace(/'/g, "''")}'`;
    }
    return `'${String(str).replace(/'/g, "''")}'`;
}

function pgArray(arr: any[] | null | undefined): string {
    if (!arr || arr.length === 0) return 'NULL';
    const elements = arr.map(el => `"${String(el).replace(/"/g, '\\"')}"`).join(',');
    return `'{${elements}}'`;
}

let sql = `-- ==========================================
-- AUTO-GENERATED SEED DATA for Supabase
-- ==========================================

`;

const states = Object.values(STATES_DATA);
const monuments = Object.values(MONUMENTS_DATA);
const categories = CULTURAL_CATEGORIES;
const festivals = CULTURAL_FESTIVALS;
const allItems = [...MAHARASHTRA_CULTURAL_ITEMS, ...NORTHEAST_CULTURAL_ITEMS, ...ALL_CULTURAL_ITEMS];

// Deduplicate items by ID
const uniqueItemsMap = new Map();
allItems.forEach(item => uniqueItemsMap.set(item.id, item));
const uniqueItems = Array.from(uniqueItemsMap.values());

// States
sql += `-- STATES\n`;
states.forEach(state => {
    sql += `INSERT INTO states (id, code, name, native_name, capital, region, is_fully_developed, cultural_identity, short_description, historical_overview, languages, banner_image_url, item_count, monument_count, highlighted_item_slug, latitude, longitude) VALUES (
        ${escapeSql(state.id)}, ${escapeSql(state.code)}, ${escapeSql(state.name)}, ${escapeSql(state.nativeName)}, ${escapeSql(state.capital)}, ${escapeSql(state.region)}, ${escapeSql(state.isFullyDeveloped)}, ${escapeSql(state.culturalIdentity)}, ${escapeSql(state.shortDescription)}, ${escapeSql(state.historicalOverview)}, ${pgArray(state.languages)}, ${escapeSql(state.bannerImage)}, ${escapeSql(state.itemCount)}, ${escapeSql(state.monumentCount)}, ${escapeSql(state.highlightedItemSlug)}, ${escapeSql(state.coordinates?.lat)}, ${escapeSql(state.coordinates?.lng)}
    ) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, code=EXCLUDED.code, native_name=EXCLUDED.native_name, capital=EXCLUDED.capital, region=EXCLUDED.region, cultural_identity=EXCLUDED.cultural_identity, short_description=EXCLUDED.short_description, languages=EXCLUDED.languages, banner_image_url=EXCLUDED.banner_image_url, latitude=EXCLUDED.latitude, longitude=EXCLUDED.longitude;\n`;
    
    if (state.subRegions) {
        state.subRegions.forEach(sr => {
            sql += `INSERT INTO state_sub_regions (id, state_id, name, districts, description, cultural_character) VALUES (
                ${escapeSql(sr.id)}, ${escapeSql(state.id)}, ${escapeSql(sr.name)}, ${pgArray(sr.districts)}, ${escapeSql(sr.description)}, ${escapeSql(sr.culturalCharacter)}
            ) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, cultural_character=EXCLUDED.cultural_character;\n`;
        });
    }
});
sql += `\n`;

// Categories
sql += `-- CATEGORIES\n`;
categories.forEach(cat => {
    sql += `INSERT INTO categories (id, label_key, default_label, icon_name, accent_color, description) VALUES (
        ${escapeSql(cat.id)}, ${escapeSql(cat.labelKey)}, ${escapeSql(cat.defaultLabel)}, ${escapeSql(cat.iconName)}, ${escapeSql(cat.accentColor)}, ${escapeSql(cat.description)}
    ) ON CONFLICT (id) DO UPDATE SET default_label=EXCLUDED.default_label, icon_name=EXCLUDED.icon_name, accent_color=EXCLUDED.accent_color, description=EXCLUDED.description;\n`;
});
sql += `\n`;

// Cultural Items
sql += `-- CULTURAL ITEMS\n`;
uniqueItems.forEach(item => {
    const stateId = item.stateId;
    sql += `INSERT INTO cultural_items (id, slug, title, state_id, category, short_description, description, history, cultural_significance, location_name, latitude, longitude, images, primary_image, tags, recipe_info, model_3d_id) VALUES (
        ${escapeSql(item.id)}, ${escapeSql(item.id)}, ${escapeSql(item.name || item.title)}, ${escapeSql(stateId)}, ${escapeSql(item.category)}, ${escapeSql(item.shortDescription)}, ${escapeSql(item.description || item.detailedDescription)}, ${escapeSql(item.history)}, ${escapeSql(item.culturalSignificance)}, ${escapeSql(item.location || item.origin)}, ${escapeSql(item.coordinates?.lat)}, ${escapeSql(item.coordinates?.lng)}, ${escapeSql(item.images)}, ${escapeSql(item.primaryImage || item.imageUrl)}, ${pgArray(item.tags)}, ${escapeSql(item.recipeInfo)}, ${escapeSql(item.model3dId)}
    ) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, short_description=EXCLUDED.short_description, description=EXCLUDED.description, history=EXCLUDED.history, cultural_significance=EXCLUDED.cultural_significance, location_name=EXCLUDED.location_name;\n`;
    
    // Check if there are star nodes (connections) for star_schema_nodes table
    if (item.connections) {
        // connections is mostly what the API builds, wait, does the frontend dataset have star nodes?
    }
});
sql += `\n`;

// Festivals
sql += `-- FESTIVALS\n`;
festivals.forEach(fest => {
    sql += `INSERT INTO festivals (id, name, month_index, date_or_season, upcoming_date, day_or_tithi, state, state_id, category, image, short_description, cultural_significance) VALUES (
        ${escapeSql(fest.id)}, ${escapeSql(fest.name)}, ${escapeSql(fest.monthIndex)}, ${escapeSql(fest.dateOrSeason)}, ${escapeSql(fest.upcomingDate)}, ${escapeSql(fest.dayOrTithi)}, ${escapeSql(fest.state)}, ${escapeSql(fest.stateId)}, ${escapeSql(fest.category)}, ${escapeSql(fest.image)}, ${escapeSql(fest.shortDescription)}, ${escapeSql(fest.culturalSignificance)}
    ) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, date_or_season=EXCLUDED.date_or_season, upcoming_date=EXCLUDED.upcoming_date, state=EXCLUDED.state, short_description=EXCLUDED.short_description;\n`;
});
sql += `\n`;

// Monuments
sql += `-- MONUMENTS\n`;
monuments.forEach(mon => {
    sql += `INSERT INTO monuments (id, slug, name, state, state_id, region, district_or_city, category, short_description, description, detailed_history, cultural_importance, location_name, year_built, architectural_style, image, banner_image, latitude, longitude) VALUES (
        ${escapeSql(mon.id)}, ${escapeSql(mon.id)}, ${escapeSql(mon.name)}, ${escapeSql(mon.state)}, ${escapeSql(mon.stateId)}, ${escapeSql(mon.region)}, ${escapeSql(mon.districtOrCity)}, ${escapeSql(mon.category)}, ${escapeSql(mon.shortDescription)}, ${escapeSql(mon.description)}, ${escapeSql(mon.detailedHistory)}, ${escapeSql(mon.culturalImportance)}, ${escapeSql(mon.locationName)}, ${escapeSql(mon.yearBuilt)}, ${escapeSql(mon.architecturalStyle)}, ${escapeSql(mon.image)}, ${escapeSql(mon.bannerImage)}, ${escapeSql(mon.coordinates?.lat)}, ${escapeSql(mon.coordinates?.lng)}
    ) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_description=EXCLUDED.short_description, description=EXCLUDED.description, detailed_history=EXCLUDED.detailed_history, image=EXCLUDED.image;\n`;

    if (mon.hotspots) {
        mon.hotspots.forEach(hotspot => {
            sql += `INSERT INTO monument_hotspots (id, monument_id, title, short_description, detailed_text, position_x, position_y, position_z, camera_position_x, camera_position_y, camera_position_z, camera_target_x, camera_target_y, camera_target_z, image_url, architectural_note) VALUES (
                ${escapeSql(hotspot.id)}, ${escapeSql(mon.id)}, ${escapeSql(hotspot.title)}, ${escapeSql(hotspot.shortDescription)}, ${escapeSql(hotspot.detailedText)}, ${escapeSql(hotspot.position?.[0])}, ${escapeSql(hotspot.position?.[1])}, ${escapeSql(hotspot.position?.[2])}, ${escapeSql(hotspot.cameraPosition?.[0])}, ${escapeSql(hotspot.cameraPosition?.[1])}, ${escapeSql(hotspot.cameraPosition?.[2])}, ${escapeSql(hotspot.cameraTarget?.[0])}, ${escapeSql(hotspot.cameraTarget?.[1])}, ${escapeSql(hotspot.cameraTarget?.[2])}, ${escapeSql(hotspot.imageUrl)}, ${escapeSql(hotspot.architecturalNote)}
            ) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, short_description=EXCLUDED.short_description;\n`;
        });
    }
});

const outputPath = path.resolve(process.cwd(), '../Backend/Database/seed.sql');
fs.writeFileSync(outputPath, sql);
console.log('Seed SQL written to', outputPath);
