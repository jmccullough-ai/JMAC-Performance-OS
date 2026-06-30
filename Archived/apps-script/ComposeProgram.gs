/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: ComposeProgram.gs
 * Purpose: Stable composeProgram() pipeline.
 */
function composeProgram() {
  return JMAC_composeProgram();
}

function JMAC_composeProgram() {
  JMAC_log('composeProgram started');
  var controls = JMAC_readControls();
  var split = JMAC_getSplit(controls.trainingDays);
  var exercisePool = JMAC_getExercisePool();
  var program = {
    version: JMAC.VERSION,
    generatedAt: new Date(),
    controls: controls,
    days: []
  };

  split.forEach(function (dayPlan) {
    var context = {
      controls: controls,
      dayPlan: dayPlan,
      exercisePool: exercisePool,
      usedExerciseNames: {},
      usedPatterns: {}
    };
    var rules = JMAC_buildSessionRules(controls, dayPlan);
    var blocks = rules.map(function (rule) {
      var exercises = JMAC_selectExercisesForBlock(rule, context);
      return JMAC_applyProgressionToBlock({
        key: rule.blockKey,
        label: rule.blockLabel,
        type: rule.blockType,
        exercises: exercises
      }, controls, dayPlan);
    });
    program.days.push({ day: dayPlan.day, theme: dayPlan.theme, focus: dayPlan.focus, blocks: blocks });
  });

  var validation = JMAC_validateProgram(program);
  if (!validation.isValid) {
    program = JMAC_repairProgram(program, validation);
    validation = JMAC_validateProgram(program);
  }
  program.validation = validation;
  program.weeklyStress = JMAC_calculateWeeklyStress(program);

  JMAC_writeProgramToPrint(program);
  JMAC_writeDashboard(program);
  JMAC_writeValidationReport(validation);
  JMAC_log('composeProgram finished. Valid: ' + validation.isValid);
  return program;
}

function JMAC_readControls() {
  var sh = JMAC_getSpreadsheet_().getSheetByName(JMAC.SHEETS.HOME);
  var controls = {};
  Object.keys(JMAC.DEFAULT_CONTROLS).forEach(function (key) {
    var cell = JMAC.CONTROL_CELLS[key];
    var value = sh ? sh.getRange(cell).getValue() : '';
    controls[key] = JMAC_safe_(value, JMAC.DEFAULT_CONTROLS[key]);
  });
  controls.trainingDays = Math.max(1, Math.min(4, JMAC_toInt_(controls.trainingDays, 4)));
  return controls;
}
