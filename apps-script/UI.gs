/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: UI.gs
 */
function JMAC_buildHomeSheet() {
  var sh = JMAC_clearSheet_(JMAC_getOrCreateSheet_(JMAC.SHEETS.HOME));
  sh.setHiddenGridlines(true);
  sh.getRange('A1:D1').merge().setValue('JMAC PERFORMANCE OS').setFontSize(20).setFontWeight('bold').setBackground('#111827').setFontColor('#ffffff').setHorizontalAlignment('center');
  sh.getRange('A2:D2').merge().setValue('Program Controls').setFontStyle('italic').setHorizontalAlignment('center');

  var rows = [
    ['Sport', 'sport'],
    ['Age Group', 'ageGroup'],
    ['Experience', 'experience'],
    ['Goal', 'goal'],
    ['Phase', 'phase'],
    ['Training Days', 'trainingDays'],
    ['Training Metric', 'trainingMetric'],
    ['Primary Ecosystem', 'primaryEcosystem'],
    ['Secondary Ecosystem', 'secondaryEcosystem'],
    ['Desired Outcome', 'desiredOutcome']
  ];
  rows.forEach(function (r, i) {
    var row = 5 + i;
    sh.getRange(row, 1).setValue(r[0]).setFontWeight('bold');
    sh.getRange(row, 2).setValue(JMAC.DEFAULT_CONTROLS[r[1]]);
  });
  JMAC_applyHomeValidations_(sh);
  sh.getRange('D5').setValue('Actions').setFontWeight('bold').setBackground('#4c1d95').setFontColor('#ffffff');
  sh.getRange('D6').setValue('Use JMAC OS menu → Compose Program');
  sh.setColumnWidths(1, 1, 170);
  sh.setColumnWidths(2, 1, 220);
  sh.setColumnWidths(3, 1, 35);
  sh.setColumnWidths(4, 1, 280);
  sh.getRange('A5:B14').setBorder(true, true, true, true, true, true, '#d1d5db', SpreadsheetApp.BorderStyle.SOLID);
  return sh;
}

function JMAC_applyHomeValidations_(sh) {
  var lists = {
    B5: ['Football', 'Basketball', 'Soccer', 'Baseball', 'Track', 'Volleyball', 'Wrestling', 'General'],
    B6: ['Youth', 'Middle School', 'High School', 'College', 'Adult'],
    B7: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
    B8: ['Speed + Strength', 'Power', 'Armor', 'Return to Play', 'General Performance'],
    B9: ['Offseason', 'Preseason', 'Inseason', 'Postseason'],
    B10: ['1', '2', '3', '4'],
    B11: ['Acceleration', 'Max Velocity', 'Change of Direction', 'Elasticity', 'Strength', 'Power'],
    B12: ['Velocity', 'Forge', 'Power', 'Armor'],
    B13: ['Velocity', 'Forge', 'Power', 'Armor']
  };
  Object.keys(lists).forEach(function (cell) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(lists[cell], true).setAllowInvalid(false).build();
    sh.getRange(cell).setDataValidation(rule);
  });
}
