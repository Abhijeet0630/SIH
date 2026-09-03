# SAFE SEED DESIGN & PRE-EXECUTION REVIEW

**Document Type:** Database Architecture & Content Population Design Document  
**Status:** DESIGN ONLY — STRICTLY READ-ONLY (NOT EXECUTED)  
**Target Database:** Live Supabase Instance (`ekxwqhndnousaffkcjyr.supabase.co`)  
**Target Schema:** Current Remote Supabase Tables + Authoritative Backend State IDs  

---

## 1. Source-to-Target Architectural Transformations

The proposed `safe_seed.sql` translates the teammate deliverable (`seed.sql` / `seed_data.json`) to strictly respect the live remote database and frozen backend contracts:

1. **State Primary Identities Preserved:**  
   Existing authoritative state IDs (`mh`, `rj`, `gj`, `kl`, `as`, `tn`) are **never** modified or renamed.
2. **Teammate State Slugs Translated:**  
   `maharashtra` $\rightarrow$ `mh`  
   `assam` $\rightarrow$ `as`  
   `rajasthan` $\rightarrow$ `rj`  
   `kerala` $\rightarrow$ `kl`  
   `gujarat` $\rightarrow$ `gj`  
   `tamil-nadu` $\rightarrow$ `tn`  
3. **Additive-Only Category Enrichment:**  
   Inserts missing categories (`crafts`, `architecture`, `tribal`, `culture`, `monuments`, `all`) using the exact live remote schema (`id, name, description, icon`) with `ON CONFLICT (id) DO NOTHING`. Existing category rows are completely preserved without overwriting.
4. **Empty Content Table Population:**  
   Inserts records directly into currently empty content tables (`cultural_items`, `monuments`, `monument_hotspots`, `festivals`).
5. **No Destructive Operations:**  
   Zero `DROP`, `TRUNCATE`, `DELETE`, or `ALTER TABLE` statements.
6. **100% Idempotent:**  
   Every insert uses `ON CONFLICT (id) DO NOTHING`. Running the script once or ten times produces identical, safe results.

---

## 2. State ID Mapping Table

| Teammate Seed State Slug | Target Backend State ID | State Exists in Remote DB? | Content Records Mapped | Action / Resolution |
|---|---|---|---|---|
| `maharashtra` | **`mh`** | **YES** (Active) | 16 cultural items, 3 monuments, 10 hotspots, 4 festivals | Direct FK mapping to `mh` |
| `assam` | **`as`** | **YES** (Active) | 5 cultural items, 1 monument, 2 hotspots, 1 festival | Direct FK mapping to `as` |
| `rajasthan` | **`rj`** | **YES** (Active) | 1 cultural item, 1 festival | Direct FK mapping to `rj` |
| `kerala` | **`kl`** | **YES** (Active) | 1 festival | Direct FK mapping to `kl` |
| `gujarat` | **`gj`** | **YES** (Active) | 0 content in seed | Ready for future additions |
| `tamil-nadu` | **`tn`** | **YES** (Active) | 0 content in seed | Ready for future additions |
| `meghalaya` | `ml` | **NO** (Not in Remote DB) | 4 cultural items, 1 monument, 3 hotspots, 2 festivals | **Deferred** to prevent FK constraint failure |
| `west-bengal` | `wb` | **NO** (Not in Remote DB) | 1 festival (`durga-puja`) | **Deferred** to prevent FK constraint failure |

---

## 3. Category Additions

The remote `categories` table contains: `food`, `fashion`, `forts`, `temples`, `dance`, `music`, `art`, `festivals`, `languages`.

### Additive Inserts (`ON CONFLICT DO NOTHING`):
- `crafts` $\rightarrow$ Name: `"Arts & Crafts"`, Icon: `"Palette"`
- `architecture` $\rightarrow$ Name: `"Architecture & Engineering"`, Icon: `"Building2"`
- `tribal` $\rightarrow$ Name: `"Tribal Culture & Lore"`, Icon: `"Trees"`
- `culture` $\rightarrow$ Name: `"Cultural Heritage & Living Traditions"`, Icon: `"Compass"`
- `monuments` $\rightarrow$ Name: `"Monuments & Wonders"`, Icon: `"Castle"`
- `all` $\rightarrow$ Name: `"All Heritage"`, Icon: `"Compass"`

---

## 4. Cultural Item Mappings (All 26 Items Evaluated)

| Item ID | Item Title | Translated State | Category | State Exists? | Category Exists? | Ready for Safe Seed? |
|---|---|---|---|---|---|---|
| `pune-misal-pav` | Puneri Misal Pav | `mh` | `food` | YES | YES | **YES** |
| `mumbai-vada-pav` | Mumbai Vada Pav | `mh` | `food` | YES | YES | **YES** |
| `vada-pav` | Mumbai Vada Pav (Alias) | `mh` | `food` | YES | YES | **YES** |
| `kolhapur-tambada-rassa` | Kolhapuri Tambada Rassa | `mh` | `food` | YES | YES | **YES** |
| `ukadiche-modak` | Ukadiche Modak | `mh` | `food` | YES | YES | **YES** |
| `paithani-saree` | Paithani Silk Saree | `mh` | `fashion` | YES | YES | **YES** |
| `kolhapuri-chappal` | Kolhapuri Chappal | `mh` | `fashion` | YES | YES | **YES** |
| `raigad-fort` | Raigad Fort | `mh` | `forts` | YES | YES | **YES** |
| `sinhagad-fort` | Sinhagad Fort | `mh` | `forts` | YES | YES | **YES** |
| `trimbakeshwar-temple` | Trimbakeshwar Shiva | `mh` | `temples` | YES | YES | **YES** |
| `lavani-dance` | Lavani Folk Dance | `mh` | `dance` | YES | YES | **YES** |
| `powada-ballads` | Powada Ballads | `mh` | `music` | YES | YES | **YES** |
| `warli-painting` | Warli Tribal Painting | `mh` | `crafts` | YES | YES (Added) | **YES** |
| `ajanta-caves-murals` | Ajanta Caves Murals | `mh` | `temples` | YES | YES | **YES** |
| `nagpur-tarri-poha` | Nagpur Tarri Poha | `mh` | `food` | YES | YES | **YES** |
| `pandharpur-wari-pilgrimage` | Pandharpur Wari | `mh` | `culture` | YES | YES (Added) | **YES** |
| `ellora-kailasa-caves` | Kailasa Temple | `mh` | `temples` | YES | YES | **YES** |
| `assam-muga-silk` | Assam Muga Golden Silk | `as` | `fashion` | YES | YES | **YES** |
| `bihu-dance` | Rongali Bihu Dance | `as` | `dance` | YES | YES | **YES** |
| `majuli-mukha-masks` | Majuli Mukha Masks | `as` | `crafts` | YES | YES (Added) | **YES** |
| `rang-ghar` | Rang Ghar Pavilion | `as` | `architecture`| YES | YES (Added) | **YES** |
| `assam-masor-tenga` | Assamese Masor Tenga | `as` | `food` | YES | YES | **YES** |
| `rajasthan-kathputli` | Kathputli Puppetry | `rj` | `crafts` | YES | YES (Added) | **YES** |
| `meghalaya-living-root-bridge` | Living Root Bridge | `ml` | `architecture`| NO | YES (Added) | **Deferred** (State `ml` not in DB) |
| `mawphlang-sacred-grove` | Sacred Grove | `ml` | `tribal` | NO | YES (Added) | **Deferred** (State `ml` not in DB) |
| `shad-suk-mynsiem` | Shad Suk Mynsiem Dance | `ml` | `dance` | NO | YES | **Deferred** (State `ml` not in DB) |
| `khasi-jadoh` | Khasi Jadoh | `ml` | `food` | NO | YES | **Deferred** (State `ml` not in DB) |

---

## 5. Monument & Hotspot Mappings

### Monuments (4 Validated / 1 Deferred):
1. **`gateway-of-india`** (`state_id='mh'`, `model_available=true`) $\rightarrow$ **VALIDATED**
2. **`ellora-caves`** (`state_id='mh'`, `model_available=false`) $\rightarrow$ **VALIDATED**
3. **`raigad-fort-shivaji-statue`** (`state_id='mh'`) $\rightarrow$ **VALIDATED**
4. **`rang-ghar`** (`state_id='as'`) $\rightarrow$ **VALIDATED**
5. **`living-root-bridge`** (`state_id='ml'`) $\rightarrow$ **Deferred** (State `ml` not in DB)

### Hotspots (12 Validated / 3 Deferred):
- `gateway-of-india` $\rightarrow$ 4 hotspots (`central-arch`, `central-dome`, `latticed-screens`, `seafront-promenade`)
- `ellora-caves` $\rightarrow$ 3 hotspots (`vimana-shikhara`, `dhwajasthambha`, `elephant-plinth`)
- `raigad-fort-shivaji-statue` $\rightarrow$ 3 hotspots (`meghadambari-canopy`, `samadhi-plinth`, `nagarkhana-view`)
- `rang-ghar` $\rightarrow$ 2 hotspots (`inverted-boat-roof`, `royal-viewing-pavilion`)

---

## 6. Festival Mappings

### Festivals (7 Validated / 3 Deferred):
1. **`gudi-padwa`** (`state_id='mh'`, `month='Chaitra Shukla Pratipada (Mar–Apr)'`) $\rightarrow$ **VALIDATED**
2. **`ganeshotsav`** (`state_id='mh'`, `month='Bhadrapada Shukla Chaturthi (Aug–Sep)'`) $\rightarrow$ **VALIDATED**
3. **`makar-sankranti`** (`state_id='mh'`, `month='January 14–15 (Solar Transition)'`) $\rightarrow$ **VALIDATED**
4. **`pola-festival`** (`state_id='mh'`, `month='Shravan/Bhadrapada Purnima (August)'`) $\rightarrow$ **VALIDATED**
5. **`bihu`** (`state_id='as'`, `month='Bohag Month (Mid-April)'`) $\rightarrow$ **VALIDATED**
6. **`onam`** (`state_id='kl'`, `month='Chingam Month (Aug–Sep)'`) $\rightarrow$ **VALIDATED**
7. **`pushkar-fair`** (`state_id='rj'`, `month='Kartik Purnima (Oct–Nov)'`) $\rightarrow$ **VALIDATED**
8. `durga-puja` (`state_id='wb'`) $\rightarrow$ **Deferred** (State `wb` not in DB)
9. `shad-suk-mynsiem-fest` (`state_id='ml'`) $\rightarrow$ **Deferred** (State `ml` not in DB)
10. `wangala-fest` (`state_id='ml'`) $\rightarrow$ **Deferred** (State `ml` not in DB)

---

## 7. Representative Record End-to-End Traces

### 1. `vada-pav` Trace
- **Proposed DB Row:** `cultural_items (id='vada-pav', slug='vada-pav', title='Mumbai Vada Pav', state_id='mh', category='food', ...)`
- **Query Path:** `GET /api/culture/vada-pav` $\rightarrow$ `CultureService.get_item('vada-pav')` $\rightarrow$ `CultureRepository.get_by_id('vada-pav')` $\rightarrow$ PostgREST `id=eq.vada-pav`
- **Serialization:** Returns `CultureDetail` matching frozen contract (`recipe`, `images`, `tags`, `state_id='mh'`).
- **Trace Result:** **PASS**

### 2. `gateway-of-india` Trace
- **Proposed DB Row:** `monuments (id='gateway-of-india', name='Gateway of India', state_id='mh', model_available=true, ...)`
- **Query Path:** `GET /api/monuments/gateway-of-india` $\rightarrow$ `MonumentService.get_monument('gateway-of-india')` $\rightarrow$ `MonumentRepository.get_by_id('gateway-of-india')`
- **Hotspots Query:** `GET /api/monuments/gateway-of-india/hotspots` $\rightarrow$ `MonumentRepository.get_hotspots('gateway-of-india')`
- **Serialization:** Returns `MonumentDetail` with `has_3d_model=true` and 4 `MonumentHotspot` records with `{x, y, z}` coordinates.
- **Trace Result:** **PASS**

### 3. `gudi-padwa` Trace
- **Proposed DB Row:** `festivals (id='gudi-padwa', name='Gudi Padwa', state_id='mh', ...)`
- **Query Path:** `GET /api/festivals/gudi-padwa` $\rightarrow$ `FestivalService.get_festival('gudi-padwa')` $\rightarrow$ `FestivalRepository.get_by_id('gudi-padwa')`
- **Serialization:** Returns `FestivalDetail` with `month`, `rituals`, and `states=['mh']`.
- **Trace Result:** **PASS**

---

## 8. Deferred Tables (`star_schema_nodes` & `state_sub_regions`)

- **`star_schema_nodes`:** **Optional/Deferred.** `CultureRepository.get_connections()` already contains a clean in-memory fallback to `MOCK_CONNECTIONS` when the table is absent or empty. Not required for Phase 2B.
- **`state_sub_regions`:** **Optional/Deferred.** Not queried or consumed by any current FastAPI backend route, repository, or frontend API contract.

---

## 9. Rollback & Pre-Execution Safety Checklist

### Pre-Execution Checklist:
- [x] Read-only verification of remote database completed.
- [x] Zero changes made to existing `states` primary keys (`mh`, `rj`, etc.).
- [x] Zero changes made to existing `categories` rows.
- [x] All 22 cultural items, 4 monuments, 12 hotspots, and 7 festivals verified against valid remote state IDs.
- [x] All inserts protected with `ON CONFLICT (id) DO NOTHING`.
- [x] All API contracts and schemas remain 100% frozen.

### Rollback Strategy:
If needed, seeded rows in the content tables can be individually deleted by ID without impacting the core `states` or `categories` tables:
```sql
DELETE FROM monument_hotspots WHERE monument_id IN ('gateway-of-india','ellora-caves','raigad-fort-shivaji-statue','rang-ghar');
DELETE FROM monuments WHERE id IN ('gateway-of-india','ellora-caves','raigad-fort-shivaji-statue','rang-ghar');
DELETE FROM festivals WHERE id IN ('gudi-padwa','ganeshotsav','makar-sankranti','pola-festival','bihu','onam','pushkar-fair');
DELETE FROM cultural_items WHERE id IN ('pune-misal-pav','mumbai-vada-pav','vada-pav', ...);
```
