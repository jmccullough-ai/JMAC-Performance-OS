/**
 * JMAC Performance OS — StressEngine.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_calculateWeeklyStress_(program) {
  let total = 0;
  const byDay = [];
  program.days.forEach(day => {
    let dayStress = 0;
    day.blocks.forEach(block => {
      block.exercises.forEach(ex => {
        dayStress += Number(ex.cns || 1) * Number((ex.prescription && ex.prescription.sets) || ex.sets || 1);
      });
    });
    byDay.push({ day: day.day, theme: day.theme, stress: dayStress });
    total += dayStress;
  });
  return { total: total, byDay: byDay };
}
