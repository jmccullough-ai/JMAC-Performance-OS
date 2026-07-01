/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.2 — Sheet Builder
 */

function ATHENA_buildFoundationSheets_() {
  const ss = ATHENA_getSpreadsheet_();
  const sheetNames = ATHENA_requiredSheetNames_();

  sheetNames.forEach(function(name) {
    ATHENA_createOrClearSheet_(ss, name);
  });

  ATHENA_orderSheets_(ss, sheetNames);

  ATHENA_buildHomeSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.home));
  ATHENA_buildPrintSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.print));
  ATHENA_buildLookupSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.lookup));
  ATHENA_buildSportProfilesSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.sportProfiles));
  ATHENA_buildAthleteLevelsSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.athleteLevels));
  ATHENA_buildWeeklyScheduleSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.weeklySchedule));
  ATHENA_buildProgressionMapSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.progressionMap));
  ATHENA_buildExerciseMasterSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.exerciseMaster));
  ATHENA_buildProgramRulesSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.programRules));
  ATHENA_buildTemplatesSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.templates));
  ATHENA_buildHealthCheckSheet_(ss.getSheetByName(ATHENA_PRODUCTION.sheets.healthCheck));
}

function ATHENA_createOrClearSheet_(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  sheet.clear();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).clearDataValidations();
  sheet.clearConditionalFormatRules();
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);
  sheet.setHiddenGridlines(true);

  return sheet;
}

function ATHENA_orderSheets_(ss, names) {
  names.forEach(function(name, index) {
    const sheet = ss.getSheetByName(name);
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(index + 1);
  });
}

function ATHENA_baseFormat_(sheet) {
  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 100), Math.max(sheet.getMaxColumns(), 20))
    .setFontFamily(ATHENA_PRODUCTION.fonts.primary)
    .setFontSize(10)
    .setVerticalAlignment('middle');
}

function ATHENA_styleHeader_(range) {
  range
    .setBackground(ATHENA_PRODUCTION.colors.greyDark)
    .setFontColor(ATHENA_PRODUCTION.colors.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setWrap(true);
}

function ATHENA_title_(sheet, title, subtitle) {
  sheet.getRange('A1:H1').merge()
    .setValue(title)
    .setBackground(ATHENA_PRODUCTION.colors.purple)
    .setFontColor(ATHENA_PRODUCTION.colors.white)
    .setFontWeight('bold')
    .setFontSize(16)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:H2').merge()
    .setValue(subtitle)
    .setBackground(ATHENA_PRODUCTION.colors.black)
    .setFontColor(ATHENA_PRODUCTION.colors.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
}

function ATHENA_buildHomeSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  ATHENA_title_(sheet, 'JMAC Performance OS', 'ATHENA Production — Release 1.0.2 Verified Baseline');

  const controls = [
    ['Program Control', 'Selection', 'Notes'],
    ['Program Title', 'JMAC Performance OS', 'Editable. Used on PRINT row 1.'],
    ['Facility / Team', 'JMAC Performance', 'Editable. Used on PRINT row 1.'],
    ['Coach Name', 'Coach JMac', 'Editable. Used on PRINT row 1.'],
    ['Sport', '', 'Sport-specific demand profile.'],
    ['Gender', '', 'Mild bias for future volume, landing, and armor logic.'],
    ['Athlete Level', '', 'Combined age, training age, readiness, and complexity.'],
    ['Phase', '', 'Training phase.'],
    ['Primary Goal', '', 'Main program outcome.'],
    ['Print Header Text', 'JMAC PERFORMANCE OS', 'Editable. Main PRINT header.'],
    ['Training Days Count', '', 'Auto-calculated from weekly calendar.'],
    ['Schedule Pattern', '', 'Auto-calculated from weekly calendar.'],
    ['Status', 'Release 1.0.2 Installed', 'Foundation only. Workout generation begins later.']
  ];

  sheet.getRange(4, 1, controls.length, 3).setValues(controls);
  ATHENA_styleHeader_(sheet.getRange(4, 1, 1, 3));
  sheet.getRange(5, 1, controls.length - 1, 3).setBorder(true, true, true, true, true, true);

  const calendarStart = ATHENA_PRODUCTION.home.weeklyCalendarStartRow - 1;
  const calendar = [
    ['Weekly Training Calendar', 'Train?', 'Auto CNS Type', 'Auto Split Theme', 'Auto Speed/Power Theme', 'Auto Strength Theme', 'Notes'],
    ['Monday', true, '', '', '', '', ''],
    ['Tuesday', false, '', '', '', '', ''],
    ['Wednesday', true, '', '', '', '', ''],
    ['Thursday', false, '', '', '', '', ''],
    ['Friday', true, '', '', '', '', ''],
    ['Saturday', false, '', '', '', '', ''],
    ['Sunday', false, '', '', '', '', '']
  ];

  sheet.getRange(calendarStart, 1, calendar.length, calendar[0].length).setValues(calendar);
  ATHENA_styleHeader_(sheet.getRange(calendarStart, 1, 1, calendar[0].length));
  sheet.getRange(calendarStart + 1, 1, 7, calendar[0].length).setBorder(true, true, true, true, true, true);
  sheet.getRange(calendarStart + 1, 2, 7, 1).insertCheckboxes();

  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 230);
  sheet.setColumnWidth(6, 220);
  sheet.setColumnWidth(7, 260);
  sheet.setFrozenRows(4);
}

function ATHENA_buildPrintSheet_(sheet) {
  ATHENA_baseFormat_(sheet);

  sheet.getRange('A1:H1').merge()
    .setValue('JMAC PERFORMANCE OS')
    .setBackground(ATHENA_PRODUCTION.colors.purple)
    .setFontColor(ATHENA_PRODUCTION.colors.white)
    .setFontWeight('bold')
    .setFontSize(18)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:H2').merge()
    .setValue('Sport | Gender | Athlete Level | Phase | Goal | Training Days | Pattern')
    .setBackground(ATHENA_PRODUCTION.colors.black)
    .setFontColor(ATHENA_PRODUCTION.colors.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setWrap(true);

  const rows = [
    ['Section', 'Status', 'Notes'],
    ['Print Header', 'Editable from HOME', 'Use HOME Print Header Text.'],
    ['Program Identity Row', 'Auto-filled from HOME', 'Use Refresh Print Header after changes.'],
    ['Workout Output', 'Not built yet', 'Workout generation begins in a later release.']
  ];

  sheet.getRange(4, 1, rows.length, 3).setValues(rows);
  ATHENA_styleHeader_(sheet.getRange(4, 1, 1, 3));
  sheet.getRange(5, 1, rows.length - 1, 3).setBorder(true, true, true, true, true, true);
  sheet.setColumnWidths(1, 8, 120);
  sheet.setRowHeight(1, 34);
  sheet.setRowHeight(2, 42);
}

function ATHENA_buildLookupSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Category', 'Value', 'Sort_Order', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildSportProfilesSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Sport', 'Primary_Demands', 'Secondary_Demands', 'Common_Injury_Bias', 'Speed_Bias', 'Strength_Bias', 'Power_Bias', 'Armor_Bias', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildAthleteLevelsSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Level_ID', 'Athlete_Level', 'Typical_Profile', 'Training_Readiness', 'Sprint_Progression', 'Plyo_Progression', 'Sled_Progression', 'Band_Jump_Progression', 'Depth_Drop_Progression', 'Olympic_Progression', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildWeeklyScheduleSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Day', 'Training_Status', 'CNS_Type', 'Split_Theme', 'Speed_Power_Theme', 'Strength_Theme', 'Previous_Day_Training', 'Next_Day_Training', 'Spacing_Label', 'Notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildProgressionMapSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Family', 'Level_1', 'Level_2', 'Level_3', 'Level_4', 'Level_5', 'Level_6', 'Notes', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildExerciseMasterSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Exercise_ID', 'Exercise_Name', 'Category', 'Pattern', 'Plane', 'Progression_Family', 'Min_Athlete_Level', 'Max_Athlete_Level', 'Primary_Quality', 'Secondary_Quality', 'Equipment', 'CNS_Level', 'Complexity', 'High_Low_Type', 'Gender_Bias', 'Coach_Tag', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildProgramRulesSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Rule_ID', 'Rule_Type', 'Rule_Name', 'Rule_Value', 'Notes', 'Active'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildTemplatesSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  const headers = ['Saved_At', 'Program_Title', 'Facility_Team', 'Coach_Name', 'Sport', 'Gender', 'Athlete_Level', 'Phase', 'Primary_Goal', 'Training_Days', 'Schedule_Pattern'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
}

function ATHENA_buildHealthCheckSheet_(sheet) {
  ATHENA_baseFormat_(sheet);
  ATHENA_title_(sheet, 'ATHENA Production Health Check', 'Release 1.0.2 Validation');

  const headers = ['Check', 'Status', 'Details'];
  sheet.getRange(4, 1, 1, headers.length).setValues([headers]);
  ATHENA_styleHeader_(sheet.getRange(4, 1, 1, headers.length));
  sheet.setFrozenRows(4);
}
