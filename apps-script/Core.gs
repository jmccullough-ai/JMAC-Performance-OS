/**
 * JMAC Performance OS — Core.gs
 * Version: v3.0.0-alpha.1
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu(JMAC.MENU_NAME)
    .addItem('Install / Repair OS', 'JMAC_install')
    .addItem('Compose Program', 'composeProgram')
    .addItem('Build Home', 'JMAC_buildHome')
    .addItem('Build Dashboard', 'JMAC_buildDashboard')
    .addItem('Clear Log', 'JMAC_clearLog')
    .addToUi();
}

function JMAC_install() {
  JMAC_clearLog();
  JMAC_buildHome();
  JMAC_seedDatabases();
  JMAC_resetSheet_(JMAC.SHEETS.PRINT);
  JMAC_buildDashboard();
  JMAC_log_('INFO', 'Install complete', { version: JMAC.VERSION });
  SpreadsheetApp.getUi().alert('JMAC Performance OS installed: ' + JMAC.VERSION);
}

function JMAC_getControls_() {
  const c = JMAC.HOME_CELLS;
  const d = JMAC.DEFAULTS;
  const home = JMAC.SHEETS.HOME;
  return {
    sport: JMAC_value_(home, c.SPORT, d.SPORT),
    ageGroup: JMAC_value_(home, c.AGE_GROUP, d.AGE_GROUP),
    experience: JMAC_value_(home, c.EXPERIENCE, d.EXPERIENCE),
    goal: JMAC_value_(home, c.GOAL, d.GOAL),
    phase: JMAC_value_(home, c.PHASE, d.PHASE),
    trainingDays: JMAC_clamp_(JMAC_int_(JMAC_value_(home, c.TRAINING_DAYS, d.TRAINING_DAYS), d.TRAINING_DAYS), 1, 4),
    trainingMetric: JMAC_value_(home, c.TRAINING_METRIC, d.TRAINING_METRIC),
    primaryEcosystem: JMAC_value_(home, c.PRIMARY_ECOSYSTEM, d.PRIMARY_ECOSYSTEM),
    secondaryEcosystem: JMAC_value_(home, c.SECONDARY_ECOSYSTEM, d.SECONDARY_ECOSYSTEM),
    desiredOutcome: JMAC_value_(home, c.DESIRED_OUTCOME, d.DESIRED_OUTCOME),
    week: JMAC_clamp_(JMAC_int_(JMAC_value_(home, c.WEEK, d.WEEK), d.WEEK), 1, 52)
  };
}
