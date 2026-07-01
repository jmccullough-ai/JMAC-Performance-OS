/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.1 — Controller
 */

function ATHENA_installRelease101() {
  ATHENA_buildFoundationSheets_();
  ATHENA_seedFoundationData_();
  ATHENA_refreshWeeklySchedule();
  ATHENA_refreshPrintHeader();
  ATHENA_runHealthCheck();
  ATHENA_goToHome();
  ATHENA_toast_('Release 1.0.1 installed successfully.');
}

/**
 * Backward-compatible installer alias for the current verified baseline.
 * This is intentional and not a duplicate installer.
 */
function ATHENA_installRelease100() {
  ATHENA_installRelease101();
}
