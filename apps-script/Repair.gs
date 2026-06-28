/**
 * JMAC Performance OS — Repair.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_repairProgram_(program, validation) {
  const fallback = JMAC_tableObjects_(JMAC.SHEETS.EXERCISES);
  program.days.forEach(day => {
    JMAC.SESSION_BLOCKS.forEach(blockName => {
      let block = day.blocks.find(b => b.block === blockName);
      if (!block) {
        block = { block: blockName, exercises: [] };
        day.blocks.push(block);
      }
      if (!block.exercises || block.exercises.length < 1) {
        const ex = fallback.find(e => String(e.block) === blockName) || fallback[0];
        if (ex) block.exercises = [ex];
      }
    });
  });
  JMAC_log_('WARN', 'Program repaired', validation);
  return program;
}
