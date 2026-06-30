/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: RuleEngine.gs
 * Purpose: Builds block-level requirements before ATHENA selects exercises.
 */
function JMAC_buildSessionRules(controls, dayPlan) {
  var solution = JMAC_getPerformanceSolution(controls, dayPlan);
  return JMAC.BLOCKS.map(function (block) {
    return {
      day: dayPlan.day,
      theme: dayPlan.theme,
      blockKey: block.key,
      blockLabel: block.label,
      blockType: block.type,
      slots: block.slots,
      requiredPatterns: JMAC_getRequiredPatternsForBlock_(block, solution, dayPlan),
      ecosystemWeights: solution.ecosystemWeights,
      speedPriority: solution.speedPriority,
      injuryBias: solution.injuryBias,
      complexityCap: solution.complexityCap,
      stressTarget: solution.stressTarget
    };
  });
}

function JMAC_getRequiredPatternsForBlock_(block, solution, dayPlan) {
  if (block.key === 'PREP') return ['Mobility', 'Activation', 'Landing'];
  if (block.key === 'SPEED_POWER') return [solution.speedPriority, 'Jump', 'Med Ball', 'Elasticity'];
  if (block.key === 'ARMOR') return solution.injuryBias.concat(['Trunk']);

  var patterns = solution.primaryPatterns;
  var region = dayPlan.bodyRegion;
  if (block.key === 'A') {
    if (region === 'Upper') return ['Upper Push', 'Upper Pull'];
    if (region === 'Lower') return ['Squat', 'Hinge'];
    return ['Jump', 'Squat', 'Hinge'];
  }
  if (block.key === 'B') {
    if (region === 'Upper') return ['Upper Pull', 'Shoulder', 'Carry'];
    if (region === 'Lower') return ['Unilateral Knee', 'Posterior Chain'];
    return ['Upper Push', 'Upper Pull', 'Carry'];
  }
  if (block.key === 'C') return patterns.concat(['Trunk', 'Carry']);
  return patterns;
}

function JMAC_getExercisePool() {
  var rows = JMAC_readTable_(JMAC.SHEETS.EXERCISE_DB);
  if (!rows.length && typeof JMAC_seedExerciseDatabase === 'function') {
    JMAC_seedExerciseDatabase();
    rows = JMAC_readTable_(JMAC.SHEETS.EXERCISE_DB);
  }
  return rows;
}
