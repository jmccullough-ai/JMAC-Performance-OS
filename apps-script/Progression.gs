/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Progression.gs
 */
function JMAC_applyProgressionToBlock(block, controls, dayPlan) {
  var prescription = JMAC_getPrescription_(block.type, controls, dayPlan);
  block.exercises = (block.exercises || []).map(function (ex, index) {
    return {
      slot: block.key + (index + 1),
      exercise: ex.Exercise || 'TBD',
      pattern: ex.Pattern || '',
      setsReps: prescription,
      notes: ex.Notes || ''
    };
  });
  return block;
}

function JMAC_getPrescription_(blockType, controls, dayPlan) {
  var exp = JMAC.EXPERIENCE_LEVEL[controls.experience] || 2;
  var phase = JMAC_norm_(controls.phase);
  if (blockType === 'prep') return '2 x 6-8 each';
  if (blockType === 'speed_power') return exp >= 3 ? '4-6 x 2-4' : '3-4 x 2-4';
  if (blockType === 'armor') return '2-3 x 8-12';
  if (phase.indexOf('inseason') >= 0) return '2-3 x 4-6';
  if (exp >= 3) return '3-4 x 4-6';
  return '3 x 6-8';
}
