/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.1.0 — Menu
 *
 * This is the only allowed onOpen().
 */

function onOpen() {
  ATHENA_buildMenu_();
}

function ATHENA_buildMenu_() {
  SpreadsheetApp.getUi()
    .createMenu(ATHENA_PRODUCTION.menuName)

    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('Program')
        .addItem('Build Program', 'ATHENA_buildProgram')
        .addItem('Refresh Weekly Schedule', 'ATHENA_refreshWeeklySchedule')
        .addItem('Refresh Print Header', 'ATHENA_refreshPrintHeader')
    )

    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('Print')
        .addItem('Go to Print View', 'ATHENA_goToPrint')
        .addItem('Refresh Print View', 'ATHENA_refreshPrintHeader')
    )


    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('Coach DNA')
        .addItem('Go to Coach Philosophy', 'ATHENA_goToCoachPhilosophy')
        .addItem('Go to Coach DNA', 'ATHENA_goToCoachDna')
        .addItem('Go to Movement Families', 'ATHENA_goToMovementFamilies')
    )

    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('Templates')
        .addItem('Save Current Setup as Template', 'ATHENA_saveCurrentSetupAsTemplate')
        .addItem('Go to Templates', 'ATHENA_goToTemplates')
    )

    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('System')
        .addItem('Install / Reinstall Release 1.1.0', 'ATHENA_installRelease110')
        .addItem('Run Health Check', 'ATHENA_runHealthCheck')
        .addItem('Go to HOME', 'ATHENA_goToHome')
    )

    .addToUi();
}

function ATHENA_goToHome() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.home);
}

function ATHENA_goToPrint() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.print);
}

function ATHENA_goToTemplates() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.templates);
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

function ATHENA_buildProgram() {
  ATHENA_refreshWeeklySchedule();
  ATHENA_refreshPrintHeader();
  ATHENA_toast_('Program foundation refreshed. Workout generation begins in a future release.');
}

function ATHENA_saveCurrentSetupAsTemplate() {
  const ss = ATHENA_getSpreadsheet_();
  const home = ss.getSheetByName(ATHENA_PRODUCTION.sheets.home);
  const templates = ss.getSheetByName(ATHENA_PRODUCTION.sheets.templates);

  if (!home || !templates) {
    ATHENA_toast_('HOME or TEMPLATES sheet missing.');
    return;
  }

  const nextRow = Math.max(templates.getLastRow() + 1, 2);
  const values = [
    new Date(),
    home.getRange(ATHENA_PRODUCTION.home.programTitle).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.facilityTeam).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.coachName).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.sport).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.gender).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.athleteLevel).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.phase).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.primaryGoal).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.trainingDayCount).getValue(),
    home.getRange(ATHENA_PRODUCTION.home.schedulePattern).getValue()
  ];

  templates.getRange(nextRow, 1, 1, values.length).setValues([values]);
  ATHENA_toast_('Current setup saved to TEMPLATES.');
}

function ATHENA_goToCoachPhilosophy() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.coachPhilosophy);
}

function ATHENA_goToCoachDna() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.coachDna);
}

function ATHENA_goToMovementFamilies() {
  ATHENA_goToSheet_(ATHENA_PRODUCTION.sheets.movementFamilies);
}
