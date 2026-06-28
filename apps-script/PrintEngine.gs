/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: PrintEngine.gs
 * Purpose: One-page athlete card writer, stacked by day.
 */
function JMAC_writeProgramToPrint(program) {
  var sh = JMAC_clearSheet_(JMAC_getOrCreateSheet_(JMAC.SHEETS.PRINT));
  sh.setHiddenGridlines(true);
  var row = 1;
  sh.getRange(row, 1, 1, 8).merge().setValue('JMAC PERFORMANCE OS').setFontSize(18).setFontWeight('bold').setHorizontalAlignment('center').setBackground('#111827').setFontColor('#ffffff');
  row++;
  sh.getRange(row, 1, 1, 8).merge().setValue(JMAC_buildSubtitle_(program)).setHorizontalAlignment('center').setFontStyle('italic');
  row += 2;

  (program.days || []).forEach(function (day) {
    sh.getRange(row, 1, 1, 8).merge().setValue('DAY ' + day.day + ' — ' + day.theme).setFontWeight('bold').setBackground('#4c1d95').setFontColor('#ffffff');
    row++;
    sh.getRange(row, 1, 1, 8).setValues([['Block', 'Slot', 'Exercise', 'Sets / Reps', 'Week 1', 'Week 2', 'Week 3', 'Week 4']]).setFontWeight('bold').setBackground('#e5e7eb');
    row++;
    day.blocks.forEach(function (block) {
      block.exercises.forEach(function (ex) {
        sh.getRange(row, 1, 1, 8).setValues([[block.label, ex.slot, ex.exercise, ex.setsReps, '', '', '', '']]);
        row++;
      });
    });
    row++;
  });

  var lastRow = Math.max(row - 1, 1);
  sh.getRange(1, 1, lastRow, 8).setBorder(true, true, true, true, true, true, '#d1d5db', SpreadsheetApp.BorderStyle.SOLID);
  sh.setColumnWidths(1, 1, 110);
  sh.setColumnWidths(2, 1, 55);
  sh.setColumnWidths(3, 1, 230);
  sh.setColumnWidths(4, 1, 95);
  sh.setColumnWidths(5, 4, 85);
  sh.getRange(1, 1, lastRow, 8).setVerticalAlignment('middle').setWrap(false);
  for (var r = 1; r <= lastRow; r++) sh.setRowHeight(r, 24);
  sh.setFrozenRows(0);
  return sh;
}

function JMAC_buildSubtitle_(program) {
  var c = program.controls || {};
  return [c.sport, c.ageGroup, c.experience, c.phase, c.trainingDays + ' days', c.trainingMetric, c.primaryEcosystem + ' + ' + c.secondaryEcosystem].join(' | ');
}
