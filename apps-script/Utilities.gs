/**
 * JMAC Performance OS — Utilities.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_getSS_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function JMAC_sheet_(name) {
  const ss = JMAC_getSS_();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function JMAC_resetSheet_(name) {
  const sh = JMAC_sheet_(name);
  sh.clear();
  sh.clearFormats();
  return sh;
}

function JMAC_hideSheet_(name) {
  const sh = JMAC_sheet_(name);
  if (!sh.isSheetHidden()) sh.hideSheet();
  return sh;
}

function JMAC_value_(sheetName, a1, fallback) {
  const sh = JMAC_sheet_(sheetName);
  const value = sh.getRange(a1).getValue();
  return value === '' || value === null || typeof value === 'undefined' ? fallback : value;
}

function JMAC_int_(value, fallback) {
  const n = parseInt(value, 10);
  return isNaN(n) ? fallback : n;
}

function JMAC_clamp_(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function JMAC_csvRows_(csvText) {
  return Utilities.parseCsv(csvText).filter(row => row.join('').trim() !== '');
}

function JMAC_writeRows_(sheetName, rows, hide) {
  const sh = JMAC_resetSheet_(sheetName);
  if (rows && rows.length) sh.getRange(1,1,rows.length,rows[0].length).setValues(rows);
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, Math.max(1, rows[0] ? rows[0].length : 1));
  if (hide) sh.hideSheet();
  return sh;
}

function JMAC_tableObjects_(sheetName) {
  const sh = JMAC_sheet_(sheetName);
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(r => r.join('').trim() !== '').map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function JMAC_setValidationList_(range, items) {
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(items, true).setAllowInvalid(false).build();
  range.setDataValidation(rule);
}

function JMAC_normalize_(value) {
  return String(value || '').trim().toLowerCase();
}

function JMAC_inList_(candidate, target) {
  const c = JMAC_normalize_(candidate);
  const t = JMAC_normalize_(target);
  if (!c || c === 'any') return true;
  return c.split('|').map(s => s.trim().toLowerCase()).indexOf(t) !== -1;
}
