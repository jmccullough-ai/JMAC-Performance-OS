README FIRST — Release 1.0.1 Verified Baseline

This is the release to install into ATHENA Development.

GitHub steps:
1. Open GitHub Desktop.
2. Repository → Show in Explorer.
3. Extract this ZIP into JMAC-Performance-OS.
4. Commit summary:
   Release 1.0.1 - Verified Baseline
5. Push origin.

Apps Script steps:
Create/replace these 8 files:
ATHENA_01_Core_Config.gs
ATHENA_02_Menu.gs
ATHENA_03_Sheet_Builder.gs
ATHENA_04_Data_Seed.gs
ATHENA_05_Weekly_Schedule.gs
ATHENA_06_Print_Header.gs
ATHENA_07_Health_Check.gs
ATHENA_08_Controller.gs

Copy each file from INSTALL_ME into the matching Apps Script file.

Run:
ATHENA_installRelease101

Then reload the Google Sheet and confirm the ATHENA Production menu appears.
