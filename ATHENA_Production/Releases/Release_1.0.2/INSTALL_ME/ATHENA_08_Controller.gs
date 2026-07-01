/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.2 — Controller
 */

function ATHENA_installRelease102() {
  ATHENA_buildFoundationSheets_();
  ATHENA_seedFoundationData_();
  ATHENA_refreshWeeklySchedule();
  ATHENA_refreshPrintHeader();
  ATHENA_runHealthCheck();
  ATHENA_goToHome();
  ATHENA_toast_('Release 1.0.2 installed successfully.');
}

/**
 * Backward-compatible installer alias for the current verified baseline.
 * This is intentional and not a duplicate installer.
 */
function ATHENA_installRelease100() {
  ATHENA_installRelease102();
}


/**
 * Alias for failed 1.0.1 installer name.
 */
function ATHENA_installRelease101() {
  ATHENA_installRelease102();
}
