/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Validation.gs
 */
function JMAC_validateProgram(program) {
  var issues = [];
  if (!program.days || !program.days.length) issues.push({ severity: 'error', message: 'No training days generated.' });
  (program.days || []).forEach(function (day) {
    if (!day.blocks || day.blocks.length !== JMAC.BLOCKS.length) issues.push({ severity: 'error', message: 'Day ' + day.day + ' has missing blocks.' });
    var names = {};
    (day.blocks || []).forEach(function (block) {
      if (!block.exercises || block.exercises.length < 1) issues.push({ severity: 'error', message: 'Day ' + day.day + ' ' + block.label + ' has no exercises.' });
      if (block.type === 'speed_power' && block.key !== 'SPEED_POWER') issues.push({ severity: 'warning', message: 'Speed/power block ordering issue on Day ' + day.day + '.' });
      (block.exercises || []).forEach(function (ex) {
        var key = JMAC_norm_(ex.exercise);
        if (names[key]) issues.push({ severity: 'warning', message: 'Duplicate exercise on Day ' + day.day + ': ' + ex.exercise });
        names[key] = true;
      });
    });
  });
  return {
    isValid: !issues.some(function (i) { return i.severity === 'error'; }),
    issueCount: issues.length,
    issues: issues
  };
}

function JMAC_writeValidationReport(validation) {
  var rows = (validation.issues || []).map(function (i) { return { Severity: i.severity, Message: i.message }; });
  if (!rows.length) rows = [{ Severity: 'ok', Message: 'No validation issues.' }];
  JMAC_writeTable_(JMAC.SHEETS.VALIDATION, rows);
}
