/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.2 — Print Header
 */

function ATHENA_refreshPrintHeader() {
  const ss = ATHENA_getSpreadsheet_();
  const home = ss.getSheetByName(ATHENA_PRODUCTION.sheets.home);
  const print = ss.getSheetByName(ATHENA_PRODUCTION.sheets.print);

  if (!home || !print) return;

  const h = ATHENA_PRODUCTION.home;

  const programTitle = home.getRange(h.programTitle).getValue();
  const team = home.getRange(h.facilityTeam).getValue();
  const coach = home.getRange(h.coachName).getValue();
  const sport = home.getRange(h.sport).getValue();
  const gender = home.getRange(h.gender).getValue();
  const level = home.getRange(h.athleteLevel).getValue();
  const phase = home.getRange(h.phase).getValue();
  const goal = home.getRange(h.primaryGoal).getValue();
  const headerText = home.getRange(h.printHeader).getValue() || programTitle || 'JMAC PERFORMANCE OS';
  const trainingDays = home.getRange(h.trainingDayCount).getValue();
  const schedulePattern = home.getRange(h.schedulePattern).getValue();

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
}
