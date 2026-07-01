README FIRST — Release 1.0.2 Installable Baseline

This release replaces Release 1.0.1.

Reason:
Release 1.0.1 failed because Apps Script does not support sheet.clearDataValidations().
Release 1.0.2 fixes that by clearing validations through the full sheet range.

GitHub steps:
1. Download ATHENA_Release_1_0_2_INSTALLABLE_BASELINE.zip.
2. Open GitHub Desktop.
3. Click Repository → Show in Explorer.
4. Extract this ZIP into your JMAC-Performance-OS folder.
5. Commit summary:
   Release 1.0.2 - Installable Baseline
6. Push origin.

Apps Script steps:
Replace the contents of these same 8 files:
ATHENA_01_Core_Config.gs
ATHENA_02_Menu.gs
ATHENA_03_Sheet_Builder.gs
ATHENA_04_Data_Seed.gs
ATHENA_05_Weekly_Schedule.gs
ATHENA_06_Print_Header.gs
ATHENA_07_Health_Check.gs
ATHENA_08_Controller.gs

Run:
ATHENA_installRelease102

If you accidentally run ATHENA_installRelease101 or ATHENA_installRelease100, both now forward to the 1.0.2 installer.
