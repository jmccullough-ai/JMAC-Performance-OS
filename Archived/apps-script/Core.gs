/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Core.gs
 * Entry points for install and menu actions.
 */
function onOpen() {
  JMAC_onOpen();
}

function JMAC_onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('JMAC OS')
    .addItem('Install / Reset Sheets', 'JMAC_install')
    .addItem('Compose Program', 'composeProgram')
    .addItem('Seed Databases', 'JMAC_seedDatabases')
    .addToUi();
}

function JMAC_install() {
  JMAC_buildHomeSheet();
  JMAC_seedDatabases();
  JMAC_getOrCreateSheet_(JMAC.SHEETS.PRINT);
  JMAC_getOrCreateSheet_(JMAC.SHEETS.DASHBOARD);
  JMAC_getOrCreateSheet_(JMAC.SHEETS.VALIDATION);
  composeProgram();
  SpreadsheetApp.getActive().toast('JMAC OS ' + JMAC.VERSION + ' installed.', 'JMAC Performance OS', 5);
}
