/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Dashboard.gs
 */
function JMAC_writeDashboard(program) {
  var sh = JMAC_clearSheet_(JMAC_getOrCreateSheet_(JMAC.SHEETS.DASHBOARD));
  sh.setHiddenGridlines(true);
  sh.getRange('A1:F1').merge().setValue('Coach Dashboard').setFontSize(18).setFontWeight('bold').setBackground('#111827').setFontColor('#ffffff').setHorizontalAlignment('center');
  sh.getRange('A3:B8').setValues([
    ['Version', program.version],
    ['Generated', program.generatedAt],
    ['Days', program.days.length],
    ['Validation', program.validation.isValid ? 'PASS' : 'CHECK'],
    ['Issues', program.validation.issueCount],
    ['Weekly Stress', program.weeklyStress.total]
  ]);
  sh.getRange('A3:A8').setFontWeight('bold');
  var row = 10;
  sh.getRange(row, 1, 1, 4).setValues([['Day', 'Theme', 'Focus', 'Stress']]).setFontWeight('bold').setBackground('#e5e7eb');
  row++;
  (program.weeklyStress.byDay || []).forEach(function (d) {
    sh.getRange(row, 1, 1, 4).setValues([[d.day, d.theme, JMAC_classifyTheme_(d.theme), d.stress]]);
    row++;
  });
  sh.autoResizeColumns(1, 6);
}
