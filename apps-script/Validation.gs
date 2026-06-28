/**
 * JMAC Performance OS — Validation.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_validateProgram_(program) {
  const issues = [];
  if (!program.days || program.days.length < 1) issues.push({ type: 'NO_DAYS', severity: 'ERROR' });
  program.days.forEach(day => {
    JMAC.SESSION_BLOCKS.forEach(blockName => {
      const block = day.blocks.find(b => b.block === blockName);
      if (!block) issues.push({ type: 'MISSING_BLOCK', severity: 'ERROR', day: day.day, block: blockName });
      else if (!block.exercises || block.exercises.length < 1) issues.push({ type: 'EMPTY_BLOCK', severity: 'WARN', day: day.day, block: blockName });
    });
    const armor = day.blocks.find(b => b.block === 'Armor');
    if (!armor || armor.exercises.length < 1) issues.push({ type: 'MISSING_ARMOR', severity: 'ERROR', day: day.day });
  });
  return { valid: issues.filter(i => i.severity === 'ERROR').length === 0, issues: issues };
}
