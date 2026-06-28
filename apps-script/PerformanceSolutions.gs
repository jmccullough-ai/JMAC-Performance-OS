/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: PerformanceSolutions.gs
 * Purpose: Intelligence layer. Converts controls + day theme into coaching priorities.
 */
function JMAC_getPerformanceSolution(controls, dayPlan) {
  var base = {
    primaryPatterns: JMAC_getPatternsForTheme_(dayPlan.theme),
    speedPriority: JMAC_getSpeedPriority_(controls, dayPlan),
    ecosystemWeights: JMAC_getEcosystemWeights_(controls),
    stressTarget: JMAC_getStressTarget_(controls, dayPlan),
    injuryBias: JMAC_getInjuryBias_(controls.sport),
    complexityCap: JMAC_getComplexityCap_(controls),
    volumeBias: JMAC_getVolumeBias_(controls)
  };
  return base;
}

function JMAC_getPatternsForTheme_(theme) {
  var t = JMAC_norm_(theme);
  if (t.indexOf('upper') >= 0) return ['Upper Push', 'Upper Pull', 'Trunk', 'Carry'];
  if (t.indexOf('lower power') >= 0) return ['Jump', 'Hinge', 'Unilateral Knee', 'Landing'];
  if (t.indexOf('lower') >= 0) return ['Squat', 'Hinge', 'Unilateral Knee', 'Posterior Chain'];
  if (t.indexOf('acceleration') >= 0) return ['Acceleration', 'Horizontal Power', 'Hinge', 'Unilateral Knee'];
  if (t.indexOf('max velocity') >= 0) return ['Max Velocity', 'Elasticity', 'Hinge', 'Foot/Ankle'];
  return ['Jump', 'Squat', 'Upper Push', 'Upper Pull', 'Trunk'];
}

function JMAC_getSpeedPriority_(controls, dayPlan) {
  var metric = JMAC_norm_(controls.trainingMetric);
  var focus = JMAC_norm_(dayPlan.focus);
  if (focus.indexOf('acceleration') >= 0) return 'Acceleration';
  if (focus.indexOf('max velocity') >= 0) return 'Max Velocity';
  if (metric.indexOf('change') >= 0) return 'COD';
  if (metric.indexOf('elastic') >= 0) return 'Elasticity';
  return controls.trainingMetric || 'Acceleration';
}

function JMAC_getEcosystemWeights_(controls) {
  var weights = {};
  weights[controls.primaryEcosystem || 'Velocity'] = 5;
  weights[controls.secondaryEcosystem || 'Forge'] = 3;
  weights.Armor = Math.max(weights.Armor || 0, 2);
  return weights;
}

function JMAC_getStressTarget_(controls, dayPlan) {
  var exp = JMAC.EXPERIENCE_LEVEL[controls.experience] || 2;
  var base = 6 + exp;
  if (JMAC_norm_(dayPlan.focus).indexOf('power') >= 0) base += 1;
  if (JMAC_norm_(controls.phase).indexOf('inseason') >= 0) base -= 2;
  if (JMAC_norm_(controls.ageGroup).indexOf('middle') >= 0 || JMAC_norm_(controls.ageGroup).indexOf('youth') >= 0) base -= 1;
  return Math.max(4, Math.min(10, base));
}

function JMAC_getInjuryBias_(sport) {
  var s = JMAC_norm_(sport);
  if (s.indexOf('football') >= 0) return ['Neck', 'Hamstring', 'Groin', 'Tibialis'];
  if (s.indexOf('basketball') >= 0) return ['Patellar Tendon', 'Soleus', 'Landing', 'Ankle'];
  if (s.indexOf('soccer') >= 0) return ['Groin', 'Adductor', 'Hamstring', 'Calf'];
  if (s.indexOf('baseball') >= 0) return ['Rotator Cuff', 'Scap', 'Forearm', 'Trunk'];
  if (s.indexOf('track') >= 0) return ['Hamstring', 'Hip Flexor', 'Foot/Ankle', 'Tibialis'];
  return ['Trunk', 'Hip', 'Foot/Ankle', 'Shoulder'];
}

function JMAC_getComplexityCap_(controls) {
  var age = JMAC.AGE_LEVEL[controls.ageGroup] || 3;
  var exp = JMAC.EXPERIENCE_LEVEL[controls.experience] || 2;
  return Math.max(1, Math.min(4, Math.min(age, exp + 1)));
}

function JMAC_getVolumeBias_(controls) {
  var phase = JMAC_norm_(controls.phase);
  if (phase.indexOf('inseason') >= 0) return 'low';
  if (phase.indexOf('offseason') >= 0) return 'moderate-high';
  return 'moderate';
}
