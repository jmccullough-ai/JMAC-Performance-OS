/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.0 — Controller
 */

function ATHENA_installRelease100() {
  ATHENA_buildFoundationSheets_();
  ATHENA_seedFoundationData_();
  ATHENA_refreshWeeklySchedule();
  ATHENA_refreshPrintHeader();
  ATHENA_runHealthCheck();
  ATHENA_goToHome();
  ATHENA_toast_('Release 1.0.0 installed successfully.');
}
