README FIRST — ATHENA Production Release 1.0.0

This is the clean production baseline.

This release intentionally does NOT include:
- AppsScript_Modules folder
- .txt install modules
- duplicate module numbers
- old controller files
- old print header files
- old health check files

Folder meaning:
INSTALL_ME = copy these .gs files into Google Apps Script.
DOCUMENTATION = keep these files in GitHub only.

Before extracting:
Delete the old Release_1.0.0 folder from your local GitHub repo if it contains duplicate files.

GitHub steps:
1. Open GitHub Desktop.
2. Click Repository.
3. Click Show in Explorer.
4. Go to:
   JMAC-Performance-OS / ATHENA_Production / Releases
5. Delete the old folder:
   Release_1.0.0
6. Extract this ZIP directly into:
   JMAC-Performance-OS
7. Open:
   ATHENA_Production / Releases / Release_1.0.0
8. Confirm it contains only:
   DOCUMENTATION
   INSTALL_ME
9. Open INSTALL_ME.
10. Confirm it contains exactly 8 .gs files.
11. Return to GitHub Desktop.
12. Commit with summary:
   Release 1.0.0 - Production Baseline
13. Push origin.

Apps Script steps:
Create these exact files:
1. ATHENA_01_Core_Config.gs
2. ATHENA_02_Menu.gs
3. ATHENA_03_Sheet_Builder.gs
4. ATHENA_04_Data_Seed.gs
5. ATHENA_05_Weekly_Schedule.gs
6. ATHENA_06_Print_Header.gs
7. ATHENA_07_Health_Check.gs
8. ATHENA_08_Controller.gs

Copy each matching .gs file from INSTALL_ME into Apps Script.

Run:
ATHENA_installRelease100
