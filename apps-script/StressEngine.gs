/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: StressEngine.gs
 */
function JMAC_calculateWeeklyStress(program) {
  var totals = { total: 0, byDay: [] };
  (program.days || []).forEach(function (day) {
    var dayStress = 0;
    (day.blocks || []).forEach(function (block) {
      var base = block.type === 'speed_power' ? 3 : block.type === 'strength' ? 2 : 1;
      dayStress += base * (block.exercises || []).length;
    });
    totals.byDay.push({ day: day.day, theme: day.theme, stress: dayStress });
    totals.total += dayStress;
  });
  return totals;
}
