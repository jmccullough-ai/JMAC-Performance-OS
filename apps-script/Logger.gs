/**
 * JMAC Performance OS — Logger.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_log_(level, message, data) {
  const sh = JMAC_sheet_(JMAC.SHEETS.LOG);
  if (sh.getLastRow() === 0) sh.appendRow(['Timestamp','Level','Message','Data']);
  sh.appendRow([new Date(), level, message, data ? JSON.stringify(data) : '']);
}

function JMAC_clearLog() {
  JMAC_resetSheet_(JMAC.SHEETS.LOG).appendRow(['Timestamp','Level','Message','Data']);
}
