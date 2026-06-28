/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Logger.gs
 */
function JMAC_log(message) {
  try {
    var sh = JMAC_getOrCreateSheet_(JMAC.SHEETS.LOG);
    if (sh.getLastRow() === 0) sh.appendRow(['Timestamp', 'Message']);
    sh.appendRow([new Date(), message]);
  } catch (err) {
    Logger.log(message);
  }
}
