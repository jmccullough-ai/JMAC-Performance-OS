README FIRST — ATHENA Production Release 1.0.0

This release is the new production foundation.

WHAT CHANGED:
- Release-based structure replaces milestone-only packaging.
- Age Group and Experience are combined into Athlete Level.
- Gender is added as a control.
- PRINT row 1 is editable from HOME.
- PRINT row 2 copies the key HOME control-panel selections.
- High/Low training logic is foundational from the start.

GITHUB STEPS:
1. Download ATHENA_Release_1_0_0.zip.
2. Open GitHub Desktop.
3. Select JMAC-Performance-OS.
4. Click Repository.
5. Click Show in Explorer.
6. Extract this ZIP directly into the JMAC-Performance-OS folder.
7. If Windows asks to merge folders, click Yes.
8. Return to GitHub Desktop.
9. In Summary, type:
   Release 1.0.0 Core Foundation
10. Click Commit to main.
11. Click Push origin.

APPS SCRIPT STEPS:
1. Open ATHENA Development Google Sheet first.
2. Click Extensions.
3. Click Apps Script.
4. Create these files:
   01_Core_Config.gs
   02_Menu.gs
   03_Sheet_Builder.gs
   04_Data_Seed.gs
   05_Print_Header.gs
   06_Health_Check.gs
   07_Release_1_0_0_Controller.gs
5. Copy each matching .txt file into the matching .gs file.
6. Save.
7. Run:
   ATHENA_installRelease100
8. Authorize if asked.
9. Reload the spreadsheet.
10. Confirm ATHENA Production menu appears.
11. Run TEST_CHECKLIST.txt before moving this to stable Production.
