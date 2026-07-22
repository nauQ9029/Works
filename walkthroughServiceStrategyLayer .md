# Implementation Walkthrough: Strategy Pattern for Service Types

I've successfully refactored the backend architecture to support multiple service variations—such as `FULL_HOUSE`, `SPECIFIC_ITEMS`, and `TRUCK_RENTAL`—by implementing a scalable Strategy Pattern.

## 1. Database Adjustments
We updated your [RequestTicket schema](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/models/RequestTicket.js):
- **Extended the Enum:** Handled `TRUCK_RENTAL` explicitly under `moveType`.
- **`rentalDetails` Field:** Added a sub-object for tracking truck sizes and duration when renting a truck.
- **Item Markers:** Added `isSpecialItem` and `requiresManualHandling` for `SPECIFIC_ITEMS` to properly leverage AI data in the future.

## 2. The Strategy Pattern Implementation
We've set up the strategy class architecture at `src/services/strategies/`:

- [BaseStrategy.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/strategies/BaseStrategy.js): Provides the abstract interface for validating logic, allowed state transitions, and custom state hooks.
- [FullHouseStrategy.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/strategies/fullHouse/FullHouseStrategy.js): Retains the strict requirement loops, like needing distinct pickup and delivery addresses.
- [ItemMovingStrategy.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/strategies/itemMoving/ItemMovingStrategy.js): Requires at least 1 item in the payload array while using similar address validations.
- [TruckRentalStrategy.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/strategies/truckRental/TruckRentalStrategy.js): Immediately skips to requiring `rentalDurationHours` and `truckType` instead of requiring surveying items. It also immediately opens a shortcut from `CREATED` -> `QUOTED`.
- [StrategyFactory.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/strategies/StrategyFactory.js): Safely resolves `req.body.moveType` strings to their corresponding strategy class instantiation.

## 3. Rewiring the Services
We replaced the global state-validation block in [requestTicketService.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/services/requestTicketService.js). Instead of a tight coupling:
```javascript
// BEFORE
if (!STATE_TRANSITIONS[ticket.status]?.includes(newStatus)) { ... }

// AFTER
const strategy = StrategyFactory.getStrategy(ticket.moveType);
const allowedTransitions = strategy.getAllowedTransitions(ticket.status);
if (!allowedTransitions.includes(newStatus)) { ... }
```
This dynamically scopes allowed transitions to the type of service booked.

We also wired [requestTicketController.js](file:///d:/Works/PJ/SP26/SEP490/HOMS_BE/src/controllers/requestTicketController.js) to accept `rentalDetails` and `items` correctly into the `createTicket` payload so that all strategies get the data they govern!

> [!TIP]
> **Next Steps:** On the frontend, you'll need the Booking page to dispatch appropriate `moveType` payloads. `TRUCK_RENTAL` should pass a `rentalDetails` array natively, whereas `SPECIFIC_ITEMS` should hook into your AI flow seamlessly! The backend now structurally supports all scenarios.
