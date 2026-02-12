# Specification

## Summary
**Goal:** Replace the simulated sync with real offline-first order persistence and synchronization between local storage and the Motoko backend, completing the tailoring app’s existing order workflows without adding any voice-assistant features.

**Planned changes:**
- Implement real offline-first order CRUD where local storage remains the source of truth while offline (create/edit/delete persist locally).
- Add/verify complete backend order CRUD APIs in the single Motoko actor (create/list/get/update/delete) with admin-only authorization and durable persistence.
- Wire the frontend Orders list + Order editor to use backend APIs when online and authorized, merging backend data into local storage without duplicate records.
- Replace the simulated sync indicator/flow with a real sync process that runs automatically when transitioning from offline to online, reporting success and error states without data loss.

**User-visible outcome:** Admins can manage orders while offline, and when connectivity returns the app automatically syncs local changes to the backend, shows real sync success/error status, and orders remain consistent after refresh/restart while online.
