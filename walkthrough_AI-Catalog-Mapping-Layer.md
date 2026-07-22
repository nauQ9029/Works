# AI Catalog Mapping Layer — Walkthrough

## What Was Built

Implemented the **Mapping Layer** between AI output and the survey form, so dispatchers no longer see raw `190×90×30 cm / 0.513 m³` data. Instead, items are automatically normalized to business catalog options.

```
AI Analyzer → Raw Items → 🧠 catalogMappingService → Standardized Items → Survey Form
```

---

## Files Changed

| File | Change |
|---|---|
| [src/services/ai/catalogMappingService.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/services/ai/catalogMappingService.js) | **[NEW]** Mapping service |
| [src/pages/DispatcherPage/SurveyInput.jsx](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput.jsx) | Wired mapping in [handleAIAnalyzeComplete](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput.jsx#486-538), new table columns |
| [src/pages/DispatcherPage/SurveyInput.css](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput.css) | AI-mapped row highlight styles |
| [src/components/AIVisionAnalyzer/AIVisionAnalyzer.jsx](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/components/AIVisionAnalyzer/AIVisionAnalyzer.jsx) | Items preview shows catalog names + confidence |
| [src/components/AIVisionAnalyzer/AIVisionAnalyzer.css](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/components/AIVisionAnalyzer/AIVisionAnalyzer.css) | Catalog match tag + confidence badge styles |

---

## Mapping Logic

**Scoring formula** (lower = better match):

```
score = 0.7 × volumeDiff + 0.3 × weightDiff
volumeDiff = |ai.volume − preset.volume| / preset.volume
weightDiff = |ai.weight − preset.weight| / preset.weight
```

**Confidence** = `1 − score`, clamped to `[0, 1]`  
**Fallback** if `score > 1.5`: item treated as unmatched, shown as raw text

---

## UX Before vs After

### AIVisionAnalyzer Preview
| Before | After |
|---|---|
| `Giường đơn — 30kg \| 0.513m³` | `Giường đơn → Giường · 1.2m` · `88% phù hợp` |

Items with confidence < 60% show an ⚠️ warning.

### Survey Form Items List
| Before | After |
|---|---|
| `🤖 [AI] Giường đơn` with raw `0.513 / 30` | `Giường (1.2m)` with green highlight + `AI · 88% phù hợp` badge |
| No size control | Preset dropdown: `1m / 1.2m / 1.6m / 1.8m / 2m` |

AI-mapped rows have a **green left border** + light green background to distinguish them visually from manually entered items.

### Backend Payload
The `_source`, `_confidence`, `_aiRaw`, `_catalogName`, `_presetIndex` metadata fields are **never sent to the backend** — they are stripped in [handleSaveSurvey](file:///d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput.jsx#539-633) which only picks `name`, `itemType`, `actualVolume`, `actualWeight`, `condition`, `notes`.
