/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Repair.gs
 * Purpose: Basic auto-repair pass. Alpha.2 prioritizes no empty blocks.
 */
function JMAC_repairProgram(program, validation) {
  var fallback = {
    slot: 'RX',
    exercise: 'Coach Selected Replacement',
    pattern: 'General',
    setsReps: '2-3 x 6-8',
    notes: 'Auto-repair fallback. Add more database rows for stronger selection.'
  };
  (program.days || []).forEach(function (day) {
    (day.blocks || []).forEach(function (block) {
      if (!block.exercises || !block.exercises.length) block.exercises = [fallback];
    });
  });
  program.repaired = true;
  return program;
}
