/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.2 — Health Check
 */

function ATHENA_runHealthCheck() {
  const ss = ATHENA_getSpreadsheet_();
  const health = ss.getSheetByName(ATHENA_PRODUCTION.sheets.healthCheck) || ss.insertSheet(ATHENA_PRODUCTION.sheets.healthCheck);
  const results = [];

  ATHENA_requiredSheetNames_().forEach(function(name) {
    const exists = ss.getSheetByName(name) !== null;
    results.push(['Required sheet exists: ' + name, exists ? 'PASS' : 'FAIL', exists ? 'Found' : 'Missing']);
  });

  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.lookup, ['Category', 'Value', 'Sort_Order', 'Active']));
  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.weeklySchedule, ['Day', 'Training_Status', 'CNS_Type', 'Split_Theme', 'Speed_Power_Theme', 'Strength_Theme', 'Previous_Day_Training', 'Next_Day_Training', 'Spacing_Label', 'Notes']));
  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.athleteLevels, ['Level_ID', 'Athlete_Level', 'Typical_Profile', 'Training_Readiness', 'Sprint_Progression', 'Plyo_Progression', 'Sled_Progression', 'Band_Jump_Progression', 'Depth_Drop_Progression', 'Olympic_Progression', 'Active']));
  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.progressionMap, ['Family', 'Level_1', 'Level_2', 'Level_3', 'Level_4', 'Level_5', 'Level_6', 'Notes', 'Active']));
  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.exerciseMaster, ['Exercise_ID', 'Exercise_Name', 'Category', 'Pattern', 'Plane', 'Progression_Family', 'Min_Athlete_Level', 'Max_Athlete_Level', 'Primary_Quality', 'Secondary_Quality', 'Equipment', 'CNS_Level', 'Complexity', 'High_Low_Type', 'Gender_Bias', 'Coach_Tag', 'Active']));
  results.push(ATHENA_checkHeader_(ss, ATHENA_PRODUCTION.sheets.templates, ['Saved_At', 'Program_Title', 'Facility_Team', 'Coach_Name', 'Sport', 'Gender', 'Athlete_Level', 'Phase', 'Primary_Goal', 'Training_Days', 'Schedule_Pattern']));

  results.push(ATHENA_checkHomeValue_(ss, 'Sport', ATHENA_PRODUCTION.home.sport));
  results.push(ATHENA_checkHomeValue_(ss, 'Gender', ATHENA_PRODUCTION.home.gender));
  results.push(ATHENA_checkHomeValue_(ss, 'Athlete Level', ATHENA_PRODUCTION.home.athleteLevel));
  results.push(ATHENA_checkHomeValue_(ss, 'Phase', ATHENA_PRODUCTION.home.phase));
  results.push(ATHENA_checkHomeValue_(ss, 'Primary Goal', ATHENA_PRODUCTION.home.primaryGoal));

  health.clear();
  ATHENA_buildHealthCheckSheet_(health);
  health.getRange(5, 1, results.length, 3).setValues(results).setBorder(true, true, true, true, true, true);

  results.forEach(function(row, index) {
    health.getRange(5 + index, 2).setBackground(row[1] === 'PASS' ? ATHENA_PRODUCTION.colors.green : ATHENA_PRODUCTION.colors.red);
  });

  const pass = results.filter(function(row) { return row[1] === 'PASS'; }).length;
  const fail = results.filter(function(row) { return row[1] === 'FAIL'; }).length;

  health.getRange('A2:H2').setValue('PASS: ' + pass + ' | FAIL: ' + fail + ' | Version: ' + ATHENA_PRODUCTION.version);
  ATHENA_toast_('Health Check Complete — PASS: ' + pass + ' FAIL: ' + fail);
}

function ATHENA_checkHeader_(ss, sheetName, expected) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return ['Header check: ' + sheetName, 'FAIL', 'Sheet missing'];

  const actual = sheet.getRange(1, 1, 1, expected.length).getValues()[0];
  const ok = expected.every(function(header, index) {
    return actual[index] === header;
  });

  return ['Header check: ' + sheetName, ok ? 'PASS' : 'FAIL', ok ? 'Headers match' : 'Expected: ' + expected.join(', ')];
}

function ATHENA_checkHomeValue_(ss, label, cell) {
  const home = ss.getSheetByName(ATHENA_PRODUCTION.sheets.home);
  if (!home) return ['HOME control value: ' + label, 'FAIL', 'HOME missing'];

  const value = home.getRange(cell).getValue();
  return ['HOME control value: ' + label, value ? 'PASS' : 'FAIL', value ? String(value) : 'Blank'];
}
