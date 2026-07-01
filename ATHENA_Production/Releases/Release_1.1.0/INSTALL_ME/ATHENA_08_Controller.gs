/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.1.0 — Controller
 */

function ATHENA_installRelease110() {
  ATHENA_buildFoundationSheets_();
  ATHENA_seedFoundationData_();
  ATHENA_refreshWeeklySchedule();
  ATHENA_refreshPrintHeader();
  ATHENA_runHealthCheck();
  ATHENA_goToHome();
  ATHENA_toast_('Release 1.1.0 installed successfully.');
}

/**
 * Legacy installer aliases forward to current release.
 */
function ATHENA_installRelease102() {
  ATHENA_installRelease110();
}

function ATHENA_installRelease101() {
  ATHENA_installRelease110();
}

function ATHENA_installRelease100() {
  ATHENA_installRelease110();
}
