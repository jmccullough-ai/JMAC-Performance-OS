/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.0 — Print Header
 */

function ATHENA_refreshPrintHeader() {
  const ss = ATHENA_getSpreadsheet_();
  const home = ss.getSheetByName(ATHENA_PRODUCTION.sheets.home);
  const print = ss.getSheetByName(ATHENA_PRODUCTION.sheets.print);

  if (!home || !print) return;

  const programTitle = home.getRange('B5').getValue();
  const team = home.getRange('B6').getValue();
  const coach = home.getRange('B7').getValue();
  const sport = home.getRange('B8').getValue();
  const gender = home.getRange('B9').getValue();
  const level = home.getRange('B10').getValue();
  const phase = home.getRange('B11').getValue();
  const goal = home.getRange('B12').getValue();
  const headerText = home.getRange('B13').getValue() || programTitle || 'JMAC PERFORMANCE OS';
  const trainingDays = home.getRange('B15').getValue();
  const schedulePattern = home.getRange('B16').getValue();

  print.getRange('A1:H1').setValue(headerText + ' — ' + team + ' — ' + coach);
  print.getRange('A2:H2').setValue(
    'Sport: ' + sport +
    ' | Gender: ' + gender +
    ' | Level: ' + level +
    ' | Phase: ' + phase +
    ' | Goal: ' + goal +
    ' | Training Days: ' + trainingDays +
    ' | Pattern: ' + schedulePattern
  );

  ATHENA_toast_('Print header refreshed from HOME controls.');
}
