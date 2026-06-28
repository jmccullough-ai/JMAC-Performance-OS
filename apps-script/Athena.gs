/**
 * JMAC Performance OS — Athena.gs
 * Version: v3.0.0-alpha.1
 */

function ATHENA_selectExercises_(controls, dayRules, blockRule, usedIds) {
  const db = JMAC_tableObjects_(JMAC.SHEETS.EXERCISES);
  const candidates = db
    .filter(ex => JMAC_exerciseAllowed_(ex, controls, dayRules, blockRule, usedIds))
    .map(ex => ({ exercise: ex, score: ATHENA_score_(ex, controls, dayRules, blockRule) }))
    .sort((a,b) => b.score - a.score);

  const selected = [];
  const patterns = {};
  for (let i = 0; i < candidates.length && selected.length < blockRule.count; i++) {
    const ex = candidates[i].exercise;
    const pattern = String(ex.pattern || 'Any');
    if (patterns[pattern] && selected.length === 1) continue;
    selected.push(ex);
    patterns[pattern] = true;
    usedIds[ex.id] = true;
  }
  return selected;
}

function JMAC_exerciseAllowed_(ex, controls, dayRules, blockRule, usedIds) {
  if (usedIds[ex.id]) return false;
  if (String(ex.block) !== blockRule.block) return false;
  if (!JMAC_inList_(ex.sport, controls.sport) && !JMAC_inList_(ex.sport, 'Any')) return false;
  if (!JMAC_inList_(ex.phase, controls.phase) && !JMAC_inList_(ex.phase, 'Any')) return false;
  if (!JMAC_inList_(ex.experience, controls.experience) && !JMAC_inList_(ex.experience, 'Any')) return false;
  if (Number(ex.cns || 0) > Number(blockRule.cnsMax || 5)) return false;
  const ageNum = JMAC_ageNumber_(controls.ageGroup);
  if (Number(ex.ageMin || 0) > ageNum) return false;
  if (Number(ex.ageMax || 99) < ageNum) return false;
  if (blockRule.body !== 'Any' && !JMAC_exerciseFitsBody_(ex, blockRule.body)) return false;
  return true;
}

function ATHENA_score_(ex, controls, dayRules, blockRule) {
  let score = 0;
  if (JMAC_inList_(ex.ecosystem, blockRule.ecosystem)) score += 35;
  if (JMAC_inList_(ex.metric, blockRule.metric)) score += 25;
  if (JMAC_inList_(ex.metric, controls.trainingMetric)) score += 10;
  if (JMAC_inList_(ex.sport, controls.sport)) score += 15;
  if (JMAC_inList_(ex.phase, controls.phase)) score += 10;
  if (JMAC_inList_(ex.experience, controls.experience)) score += 8;
  if (String(ex.tags || '').toLowerCase().indexOf(String(dayRules.injuryBias || '').toLowerCase()) !== -1) score += 8;
  score -= Number(ex.complexity || 0);
  return score;
}

function JMAC_ageNumber_(ageGroup) {
  const ag = String(ageGroup || '').toLowerCase();
  if (ag.indexOf('youth') !== -1 || ag.indexOf('11') !== -1) return 12;
  if (ag.indexOf('ms') !== -1 || ag.indexOf('middle') !== -1) return 14;
  if (ag.indexOf('hs') !== -1 || ag.indexOf('high') !== -1) return 17;
  if (ag.indexOf('college') !== -1) return 21;
  return 17;
}

function JMAC_exerciseFitsBody_(ex, body) {
  const pattern = String(ex.pattern || '').toLowerCase();
  if (body === 'Total') return true;
  if (body === 'Lower') return /(squat|hinge|lunge|jump|sprint|hamstring|calf|adductor|landing|carry)/.test(pattern + ' ' + ex.tags);
  if (body === 'Upper') return /(push|pull|throw|row|press|shoulder|rotator|scap|carry)/.test(pattern + ' ' + ex.tags);
  return true;
}
