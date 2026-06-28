/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: SplitEngine.gs
 * Purpose: Generate day themes for 1-4 day programming.
 */
function JMAC_getSplit(trainingDays) {
  var days = Math.max(1, Math.min(4, JMAC_toInt_(trainingDays, 4)));
  return JMAC.SPLITS[days].map(function (theme, index) {
    return {
      day: index + 1,
      theme: theme,
      focus: JMAC_classifyTheme_(theme),
      bodyRegion: JMAC_classifyRegion_(theme)
    };
  });
}

function JMAC_classifyTheme_(theme) {
  var t = JMAC_norm_(theme);
  if (t.indexOf('acceleration') >= 0) return 'Acceleration';
  if (t.indexOf('max velocity') >= 0) return 'Max Velocity';
  if (t.indexOf('power') >= 0) return 'Power';
  if (t.indexOf('strength') >= 0) return 'Strength';
  return 'Performance';
}

function JMAC_classifyRegion_(theme) {
  var t = JMAC_norm_(theme);
  if (t.indexOf('upper') >= 0) return 'Upper';
  if (t.indexOf('lower') >= 0) return 'Lower';
  return 'Total';
}
