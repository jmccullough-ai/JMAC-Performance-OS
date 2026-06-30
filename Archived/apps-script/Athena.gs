/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Athena.gs
 * Purpose: ATHENA exercise scoring and selection engine.
 */
function JMAC_selectExercisesForBlock(rule, context) {
  var pool = context.exercisePool || [];
  var selected = [];
  for (var i = 0; i < rule.slots; i++) {
    var pick = JMAC_pickBestExercise_(pool, rule, context, selected);
    if (pick) {
      selected.push(pick);
      context.usedExerciseNames[JMAC_norm_(pick.Exercise)] = true;
      context.usedPatterns[JMAC_norm_(pick.Pattern)] = (context.usedPatterns[JMAC_norm_(pick.Pattern)] || 0) + 1;
    }
  }
  return selected;
}

function JMAC_pickBestExercise_(pool, rule, context, selectedInBlock) {
  var scored = pool.map(function (ex) {
    return { exercise: ex, score: JMAC_scoreExercise_(ex, rule, context, selectedInBlock) };
  }).filter(function (item) { return item.score > -999; });

  scored.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return String(a.exercise.Exercise).localeCompare(String(b.exercise.Exercise));
  });
  return scored.length ? scored[0].exercise : null;
}

function JMAC_scoreExercise_(ex, rule, context, selectedInBlock) {
  var controls = context.controls;
  var score = 0;
  var nameKey = JMAC_norm_(ex.Exercise);
  if (!ex.Exercise || context.usedExerciseNames[nameKey]) return -1000;
  if (selectedInBlock.some(function (s) { return JMAC_norm_(s.Exercise) === nameKey; })) return -1000;

  var complexity = JMAC_toInt_(ex.Complexity, 2);
  if (complexity > rule.complexityCap) return -1000;

  if (!JMAC_intersects_(ex.BlockType, rule.blockType)) return -1000;
  if (!JMAC_intersects_(ex.AgeGroup, controls.ageGroup)) score -= 10;
  if (!JMAC_intersects_(ex.Experience, controls.experience)) score -= 8;
  if (!JMAC_intersects_(ex.Phase, controls.phase)) score -= 3;
  if (JMAC_intersects_(ex.Sport, controls.sport)) score += 8;

  var patterns = rule.requiredPatterns || [];
  if (JMAC_intersects_(ex.Pattern, patterns)) score += 20;
  if (JMAC_intersects_(ex.Tags, patterns)) score += 10;

  var ecosystemWeights = rule.ecosystemWeights || {};
  Object.keys(ecosystemWeights).forEach(function (eco) {
    if (JMAC_intersects_(ex.Ecosystem, eco)) score += ecosystemWeights[eco] * 4;
  });

  if (JMAC_intersects_(ex.TrainingMetric, controls.trainingMetric)) score += 10;
  if (JMAC_intersects_(ex.TrainingMetric, rule.speedPriority)) score += 10;
  if (JMAC_intersects_(ex.Tags, rule.injuryBias)) score += 7;

  var region = context.dayPlan.bodyRegion;
  if (region !== 'Total' && JMAC_intersects_(ex.Region, region)) score += 8;
  if (region !== 'Total' && !JMAC_intersects_(ex.Region, [region, 'Total'])) score -= 20;

  var cns = JMAC_toInt_(ex.CNS, 3);
  if (rule.blockKey === 'SPEED_POWER' && cns >= 4) score += 5;
  if (rule.blockKey === 'ARMOR' && cns <= 3) score += 8;
  if (rule.blockKey === 'C' && cns >= 5) score -= 10;

  var patternKey = JMAC_norm_(ex.Pattern);
  if ((context.usedPatterns[patternKey] || 0) > 0) score -= 12;

  score += JMAC_toInt_(ex.CoachRank, 0);
  return score;
}
