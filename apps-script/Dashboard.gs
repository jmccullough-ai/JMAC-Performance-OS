/**
 * JMAC Performance OS — Dashboard.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_buildDashboard() {
  const sh = JMAC_resetSheet_(JMAC.SHEETS.DASHBOARD);
  sh.setHiddenGridlines(true);
  sh.getRange('A1:F1').merge().setValue('JMAC PERFORMANCE OS — COACH DASHBOARD').setFontSize(16).setFontWeight('bold');
  sh.getRange('A3:B8').setValues([
    ['Version', JMAC.VERSION],
    ['Status', 'Installed'],
    ['Last Compose', ''],
    ['Training Days', ''],
    ['Weekly Stress', ''],
    ['Validation Issues', '']
  ]);
  sh.getRange('A3:A8').setFontWeight('bold');
  sh.autoResizeColumns(1, 6);
}

function JMAC_writeDashboard_(program, validation) {
  const sh = JMAC_sheet_(JMAC.SHEETS.DASHBOARD);
  if (sh.getLastRow() < 1) JMAC_buildDashboard();
  sh.getRange('B5').setValue(new Date());
  sh.getRange('B6').setValue(program.days.length);
  sh.getRange('B7').setValue(program.weeklyStress ? program.weeklyStress.total : '');
  sh.getRange('B8').setValue(validation.issues.length);
  let row = 10;
  sh.getRange(row,1,1,4).setValues([['Day','Theme','Metric','Stress']]).setFontWeight('bold');
  row++;
  if (program.weeklyStress && program.weeklyStress.byDay.length) {
    const rows = program.weeklyStress.byDay.map(d => [d.day, d.theme, program.days[d.day - 1].metric, d.stress]);
    sh.getRange(row,1,rows.length,4).setValues(rows);
  }
  sh.autoResizeColumns(1, 6);
}
