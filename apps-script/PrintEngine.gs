/**
 * JMAC Performance OS — PrintEngine.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_writePrint_(program) {
  const sh = JMAC_resetSheet_(JMAC.SHEETS.PRINT);
  sh.setHiddenGridlines(true);
  const c = program.controls;
  sh.getRange('A1:H1').merge().setValue('JMAC PERFORMANCE OS — ATHLETE CARD').setFontWeight('bold').setFontSize(16);
  sh.getRange('A2:H2').merge().setValue([c.sport, c.ageGroup, c.phase, c.trainingMetric, c.primaryEcosystem + '/' + c.secondaryEcosystem, 'Week ' + c.week].join('  •  '));

  let row = 4;
  program.days.forEach(day => {
    sh.getRange(row,1,1,8).merge().setValue('DAY ' + day.day + ' — ' + day.theme + ' / ' + day.metric).setFontWeight('bold').setBackground('#222222').setFontColor('#ffffff');
    row++;
    sh.getRange(row,1,1,8).setValues([['Block','A1','A2','Sets','Reps','Rest','Wk 1–4 Load/Notes','Coach']]).setFontWeight('bold').setBackground('#eeeeee');
    row++;
    day.blocks.forEach(block => {
      const a = block.exercises[0] || {};
      const b = block.exercises[1] || {};
      sh.getRange(row,1,1,8).setValues([[block.block, a.exercise || '', b.exercise || '', (a.prescription && a.prescription.sets) || a.sets || '', (a.prescription && a.prescription.reps) || a.reps || '', (a.prescription && a.prescription.rest) || a.rest || '', '', a.coachCue || '']]);
      row++;
    });
    row++;
  });

  sh.getDataRange().setVerticalAlignment('middle').setWrap(false).setBorder(true,true,true,true,true,true,'#d9d9d9',SpreadsheetApp.BorderStyle.SOLID);
  sh.setColumnWidths(1, 1, 95);
  sh.setColumnWidths(2, 2, 180);
  sh.setColumnWidths(4, 3, 65);
  sh.setColumnWidth(7, 150);
  sh.setColumnWidth(8, 120);
  sh.setRowHeights(1, Math.max(1, sh.getLastRow()), 24);
}
