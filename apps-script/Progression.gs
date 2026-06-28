/**
 * JMAC Performance OS — Progression.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_applyProgressions_(program) {
  const week = Number(program.controls.week || 1);
  program.days.forEach(day => {
    day.blocks.forEach(block => {
      block.exercises.forEach(ex => {
        const baseSets = Number(ex.sets || 2);
        let sets = baseSets;
        if (week >= 3 && block.block.indexOf('Strength') === 0) sets = baseSets + 1;
        if (week % 4 === 0) sets = Math.max(1, baseSets - 1);
        ex.prescription = {
          sets: sets,
          reps: ex.reps || '5',
          rest: ex.rest || '60s'
        };
      });
    });
  });
  return program;
}
