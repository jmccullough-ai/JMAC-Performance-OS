/**
 * JMAC Performance OS — ComposeProgram.gs
 * Version: v3.0.0-alpha.1
 */

function composeProgram() {
  const controls = JMAC_getControls_();
  JMAC_log_('INFO', 'composeProgram started', controls);
  const split = JMAC_getSplit_(controls);
  const program = {
    version: JMAC.VERSION,
    generatedAt: new Date(),
    controls: controls,
    days: []
  };

  split.forEach(splitDay => {
    const dayRules = JMAC_buildDayRules_(controls, splitDay);
    const usedIds = {};
    const session = {
      day: splitDay.day,
      theme: splitDay.theme,
      body: splitDay.body,
      metric: dayRules.metric,
      stressTarget: dayRules.stressTarget,
      blocks: []
    };

    dayRules.blocks.forEach(blockRule => {
      let exercises = ATHENA_selectExercises_(controls, dayRules, blockRule, usedIds);
      session.blocks.push({ block: blockRule.block, exercises: exercises });
    });

    program.days.push(session);
  });

  const validated = JMAC_validateProgram_(program);
  const repaired = validated.valid ? program : JMAC_repairProgram_(program, validated);
  const progressed = JMAC_applyProgressions_(repaired);
  progressed.weeklyStress = JMAC_calculateWeeklyStress_(progressed);

  JMAC_writePrint_(progressed);
  JMAC_writeDashboard_(progressed, validated);
  JMAC_log_('INFO', 'composeProgram complete', { days: progressed.days.length, issues: validated.issues.length });
  return progressed;
}
