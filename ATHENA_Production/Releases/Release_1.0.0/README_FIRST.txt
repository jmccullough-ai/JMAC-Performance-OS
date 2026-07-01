README FIRST — ATHENA Production Release 1.0.0 UPDATED

WHAT CHANGED:
- Removed Primary Ecosystem and Secondary Ecosystem.
- Added Monday-Sunday checkboxes on HOME.
- Training Days Count is calculated from checked days.
- Schedule Pattern changes based on spacing.
- WEEKLY_SCHEDULE determines CNS type and split theme foundation.

GITHUB STEPS:
1. Download ATHENA_Release_1_0_0_UPDATED.zip.
2. Open GitHub Desktop.
3. Select JMAC-Performance-OS.
4. Click Repository > Show in Explorer.
5. Extract this ZIP into the JMAC-Performance-OS folder.
6. Choose Yes to merge/replace.
7. Return to GitHub Desktop.
8. Summary: Release 1.0.0 - Core Foundation
9. Description: Updated Release 1.0.0 with weekly calendar, spacing-aware split logic, and no ecosystem controls.
10. Commit to main.
11. Push origin.

APPS SCRIPT STEPS:
Create/replace these Apps Script files and paste the matching .txt contents:
01_Core_Config.gs
02_Menu.gs
03_Sheet_Builder.gs
04_Data_Seed.gs
05_Weekly_Schedule.gs
06_Print_Header.gs
07_Health_Check.gs
08_Release_1_0_0_Controller.gs

Run: ATHENA_installRelease100
After changing checkboxes, run: ATHENA_refreshWeeklySchedule
