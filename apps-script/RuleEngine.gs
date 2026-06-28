/**
 * JMAC Performance OS — RuleEngine.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_buildDayRules_(controls, splitDay) {
  const solution = JMAC_getPerformanceSolution_(controls, splitDay);
  const metric = splitDay.emphasis === 'Blend' ? controls.trainingMetric : splitDay.emphasis;
  const ecosystems = [controls.primaryEcosystem, controls.secondaryEcosystem, 'Armor'];

  return {
    day: splitDay.day,
    theme: splitDay.theme,
    body: splitDay.body,
    metric: metric,
    primaryEcosystem: controls.primaryEcosystem,
    secondaryEcosystem: controls.secondaryEcosystem,
    ecosystems: ecosystems,
    injuryBias: solution.injuryBias || '',
    stressTarget: Number(solution.stressTarget || 60),
    movementQuota: solution.movementQuota || '',
    blocks: JMAC_SESSION_BLOCK_RULES_(controls, splitDay, metric)
  };
}

function JMAC_SESSION_BLOCK_RULES_(controls, splitDay, metric) {
  const body = splitDay.body;
  return [
    { block: 'Prep', count: 2, ecosystem: 'Velocity', metric: metric, body: 'Any', cnsMax: 3 },
    { block: 'SpeedPower', count: 2, ecosystem: controls.primaryEcosystem, metric: metric, body: body, cnsMax: 5 },
    { block: 'StrengthA', count: 2, ecosystem: controls.secondaryEcosystem, metric: metric, body: body, cnsMax: 4 },
    { block: 'StrengthB', count: 2, ecosystem: 'Forge', metric: metric, body: body, cnsMax: 4 },
    { block: 'StrengthC', count: 2, ecosystem: controls.secondaryEcosystem, metric: metric, body: body, cnsMax: 3 },
    { block: 'Armor', count: 2, ecosystem: 'Armor', metric: 'Armor', body: 'Any', cnsMax: 2 }
  ];
}

function JMAC_getPerformanceSolution_(controls, splitDay) {
  const rows = JMAC_tableObjects_(JMAC.SHEETS.SOLUTIONS);
  const scored = rows.map(r => {
    let score = 0;
    if (JMAC_inList_(r.sport, controls.sport)) score += 20;
    if (JMAC_inList_(r.ageGroup, controls.ageGroup)) score += 10;
    if (JMAC_inList_(r.phase, controls.phase)) score += 10;
    if (JMAC_inList_(r.metric, controls.trainingMetric) || JMAC_inList_(r.metric, splitDay.emphasis)) score += 10;
    if (JMAC_inList_(r.ecosystem, controls.primaryEcosystem)) score += 10;
    return { row: r, score: score };
  }).sort((a,b) => b.score - a.score);
  return scored.length ? scored[0].row : { stressTarget: 60, injuryBias: '', movementQuota: '' };
}
