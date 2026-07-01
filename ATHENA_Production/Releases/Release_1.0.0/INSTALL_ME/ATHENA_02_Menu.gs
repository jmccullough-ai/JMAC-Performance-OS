/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.0 — Menu
 *
 * This is the only allowed onOpen().
 */

function onOpen() {
  ATHENA_buildMenu_();
}

function ATHENA_buildMenu_() {
  SpreadsheetApp.getUi()
    .createMenu(ATHENA_PRODUCTION.menuName)
    .addItem('Install Release 1.0.0', 'ATHENA_installRelease100')
    .addItem('Refresh Weekly Schedule', 'ATHENA_refreshWeeklySchedule')
    .addItem('Refresh Print Header', 'ATHENA_refreshPrintHeader')
    .addItem('Run Health Check', 'ATHENA_runHealthCheck')
    .addSeparator()
    .addItem('Go to HOME', 'ATHENA_goToHome')
    .addItem('Go to PRINT', 'ATHENA_goToPrint')
    .addToUi();
}

function ATHENA_goToHome() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.home);
}

function ATHENA_goToPrint() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.print);
}

function ATHENA_goToSheet_(sheetName) {
  const ss = ATHENA_getSpreadsheet_();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    ATHENA_toast_('Sheet not found: ' + sheetName);
    return;
  }
  ss.setActiveSheet(sheet);
}
