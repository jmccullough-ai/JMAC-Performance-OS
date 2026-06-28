/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Utilities.gs
 */
function JMAC_getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function JMAC_getOrCreateSheet_(name) {
  var ss = JMAC_getSpreadsheet_();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function JMAC_clearSheet_(sheet) {
  sheet.clear({ contentsOnly: false });
  return sheet;
}

function JMAC_toInt_(value, fallback) {
  var n = parseInt(value, 10);
  return isNaN(n) ? fallback : n;
}

function JMAC_norm_(value) {
  return String(value || '').trim().toLowerCase();
}

function JMAC_splitTags_(value) {
  if (!value) return [];
  return String(value).split('|').map(function (s) { return s.trim(); }).filter(Boolean);
}

function JMAC_hasTag_(row, field, value) {
  var tags = JMAC_splitTags_(row[field]);
  var target = JMAC_norm_(value);
  return tags.some(function (tag) { return JMAC_norm_(tag) === target || JMAC_norm_(tag) === 'all'; });
}

function JMAC_intersects_(pipeValue, wanted) {
  var tags = JMAC_splitTags_(pipeValue).map(JMAC_norm_);
  var wants = Array.isArray(wanted) ? wanted : [wanted];
  wants = wants.map(JMAC_norm_);
  return tags.indexOf('all') >= 0 || wants.some(function (w) { return tags.indexOf(w) >= 0; });
}

function JMAC_readTable_(sheetName) {
  var sh = JMAC_getSpreadsheet_().getSheetByName(sheetName);
  if (!sh) return [];
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0].map(function (h) { return String(h).trim(); });
  return values.slice(1).filter(function (r) { return r.join('').trim() !== ''; }).map(function (r) {
    var obj = {};
    headers.forEach(function (h, i) { obj[h] = r[i]; });
    return obj;
  });
}

function JMAC_writeTable_(sheetName, rows) {
  var sh = JMAC_clearSheet_(JMAC_getOrCreateSheet_(sheetName));
  if (!rows || !rows.length) return sh;
  var headers = Object.keys(rows[0]);
  var values = [headers].concat(rows.map(function (row) { return headers.map(function (h) { return row[h]; }); }));
  sh.getRange(1, 1, values.length, headers.length).setValues(values);
  sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#111827').setFontColor('#ffffff');
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
  return sh;
}

function JMAC_unique_(arr) {
  var seen = {};
  return (arr || []).filter(function (x) {
    var k = JMAC_norm_(x);
    if (!k || seen[k]) return false;
    seen[k] = true;
    return true;
  });
}

function JMAC_safe_(value, fallback) {
  return value === null || value === undefined || value === '' ? fallback : value;
}
