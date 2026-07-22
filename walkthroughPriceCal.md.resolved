# Pricing System Refactor – Walkthrough

All modules verified to load successfully (`node -e "require(...)"` — no errors).

---

## What Changed

### Bug Fix
[PriceList.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/models/PriceList.js) had `laborCost: laborPricingSchema` — referencing an undefined variable. Fixed to `staffPricingSchema`. **This was a crash bug.**

---

## Files Modified (7 total)

### Models
| File | Change |
|------|--------|
| [PriceList.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/models/PriceList.js) | Crash bug fixed; added `transportTiers[]` (tiered transport), `itemServiceRates` (TV/fridge/etc.) |
| [SurveyData.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/models/SurveyData.js) | Added `estimatedHours` field; added `itemType` enum to `items[]` |
| [PricingData.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/models/PricingData.js) | Updated `breakdown` to match formula; `discountAmount` moved before tax; added `priceListSnapshot` |

### Services
| File | Change |
|------|--------|
| [pricingCalculationService.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/pricingCalculationService.js) | Full rewrite — real formula, all rates from DB |
| [pricingService.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/pricingService.js) | Rewritten as clean proxy — loads SurveyData + PriceList from DB |
| [surveyService.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/surveyService.js) | Fixed [createPricingData](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/pricingCalculationService.js#175-209) call to pass `priceList` argument |

### Controllers
| File | Change |
|------|--------|
| [invoiceController.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/controllers/invoiceController.js) | [calculatePrice](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/pricingService.js#26-88) handler: now accepts `surveyDataId` + `priceListId` |

---

## New Pricing Formula

```
TOTAL = BaseTransportFee   ← tiered (e.g. 500k for 0-5km, 700k for 5-10km)
      + VehicleFee         ← basePriceForFirstXKm + (extraKm × pricePerNextKm)
      + LaborFee           ← staffCount × hourlyRate × estimatedHours
      + ServiceFee         ← per-item type (TV:50k, FRIDGE:100k, BED:150k...) + packing + assembling
      + DistanceSurcharge  ← optional extra per km
      + CarryFee           ← carry meters beyond free distance
      + FloorFee           ← per-floor (stair or elevator rate)
      + InsuranceFee       ← declaredValue × insuranceRate
      + ManagementFee      ← subtotal × managementFeeRate
      ─────────────────────────────────
      - PromotionDiscount  ← BEFORE TAX ✅
      + Tax                ← (subtotal - discount) × taxRate
      = TOTAL PRICE (rounded to nearest 1,000 VNĐ)
```

---

## Updated API Endpoint

**`POST /api/invoices/:invoiceId/calculate-price`**

Old body (removed):
```json
{ "estimatedDistance": 10, "totalWeight": 500, "totalVolume": 3, "staffCount": 3, ... }
```

New body:
```json
{
  "surveyDataId": "<ObjectId of completed SurveyData>",
  "priceListId": "<ObjectId of PriceList>",   ← optional, falls back to active PriceList
  "promotionId": "<ObjectId of Promotion>"    ← optional
}
```

---

## How to Test (Postman)

### 1. Seed a PriceList
`POST /api/price-lists`
```json
{
  "code": "STD-2026",
  "name": "Bảng giá 2026",
  "isActive": true,
  "taxRate": 0.1,
  "transportTiers": [
    { "fromKm": 0,  "toKm": 5,    "flatFee": 500000,  "pricePerKmBeyond": 0 },
    { "fromKm": 5,  "toKm": 10,   "flatFee": 700000,  "pricePerKmBeyond": 0 },
    { "fromKm": 10, "toKm": 20,   "flatFee": 1000000, "pricePerKmBeyond": 0 },
    { "fromKm": 20, "toKm": null, "flatFee": 1000000, "pricePerKmBeyond": 20000 }
  ],
  "vehiclePricing": [
    { "vehicleType": "500KG",  "basePriceForFirstXKm": 500000,  "limitKm": 5, "pricePerNextKm": 8000,  "pricePerHour": 80000,  "pricePerDay": 600000 },
    { "vehicleType": "1TON",   "basePriceForFirstXKm": 700000,  "limitKm": 5, "pricePerNextKm": 12000, "pricePerHour": 100000, "pricePerDay": 800000 },
    { "vehicleType": "1.5TON", "basePriceForFirstXKm": 900000,  "limitKm": 5, "pricePerNextKm": 15000, "pricePerHour": 120000, "pricePerDay": 1000000 },
    { "vehicleType": "2TON",   "basePriceForFirstXKm": 1200000, "limitKm": 5, "pricePerNextKm": 20000, "pricePerHour": 150000, "pricePerDay": 1200000 }
  ],
  "laborCost": { "basePricePerPerson": 0, "pricePerHourPerPerson": 80000 },
  "movingSurcharge": { "freeCarryDistance": 15, "pricePerExtraMeter": 2000, "stairSurchargePerFloor": 50000, "elevatorSurcharge": 20000 },
  "additionalServices": { "packingFee": 200000, "assemblingFee": 300000, "insuranceRate": 0.01, "managementFeeRate": 0.05 },
  "itemServiceRates": { "TV": 50000, "FRIDGE": 100000, "BED": 150000, "SOFA": 80000, "WARDROBE": 100000, "AC": 80000, "WASHING_MACHINE": 80000, "OTHER": 30000 },
  "basePrice": { "minimumCharge": 500000 }
}
```

### 2. Complete a SurveyData (with new fields)
Include `estimatedHours` and `itemType` on items:
```json
{
  "suggestedVehicle": "1TON",
  "suggestedStaffCount": 3,
  "estimatedHours": 4,
  "distanceKm": 12,
  "floors": 2,
  "hasElevator": false,
  "needsPacking": true,
  "insuranceRequired": true,
  "declaredValue": 50000000,
  "items": [
    { "name": "Tủ lạnh", "itemType": "FRIDGE", "actualWeight": 80, "actualVolume": 0.5 },
    { "name": "TV 55 inch", "itemType": "TV",   "actualWeight": 20, "actualVolume": 0.2 },
    { "name": "Giường đôi", "itemType": "BED",  "actualWeight": 60, "actualVolume": 1.0 }
  ]
}
```

### 3. Call pricing endpoint
```
POST /api/invoices/:invoiceId/calculate-price
{ "surveyDataId": "...", "priceListId": "..." }
```

**Expected breakdown result (example for 12km, 3 staff, 4 hours):**
| Component | Calculation | Amount |
|-----------|------------|--------|
| Base transport | tier 10-20km flat | 1,000,000 |
| Vehicle (1TON) | 700k + (12-5)×12k | 784,000 |
| Labor | 3 × 80k × 4h | 960,000 |
| Service | fridge+TV+bed + packing | 530,000 |
| Floor | 2 × 50k (stair) | 100,000 |
| Insurance | 50M × 1% | 500,000 |
| Management | subtotal × 5% | ~194,000 |
| **Tax** | (subtotal) × 10% | ~407,000 |
| **TOTAL** | | **~4,475,000** |
