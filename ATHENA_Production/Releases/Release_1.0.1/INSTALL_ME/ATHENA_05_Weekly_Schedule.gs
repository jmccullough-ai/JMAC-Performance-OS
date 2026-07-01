/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.1 — Weekly Schedule
 */

function ATHENA_refreshWeeklySchedule() {
  const ss = ATHENA_getSpreadsheet_();
  const home = ss.getSheetByName(ATHENA_PRODUCTION.sheets.home);
  const schedule = ss.getSheetByName(ATHENA_PRODUCTION.sheets.weeklySchedule);

  if (!home || !schedule) return;

  const startRow = ATHENA_PRODUCTION.home.weeklyCalendarStartRow;
  const calendar = home.getRange(startRow, 1, ATHENA_PRODUCTION.home.weeklyCalendarRows, 7).getValues();
  const trainDays = calendar.map(function(row) {
    return row[1] === true;
  });

  const trainingCount = trainDays.filter(Boolean).length;
  const pattern = ATHENA_getSchedulePattern_(trainDays);

  const output = calendar.map(function(row, index) {
    const day = row[0];
    const isTraining = trainDays[index];
    const prev = index > 0 ? trainDays[index - 1] : false;
    const next = index < 6 ? trainDays[index + 1] : false;

    if (!isTraining) {
      return [day, 'Off', 'Off', 'Off / Recovery', 'None', 'None', prev, next, 'Off', ''];
    }

    const dayNumber = trainDays.slice(0, index + 1).filter(Boolean).length;
    const cns = ATHENA_assignCnsType_(trainingCount, dayNumber, prev, next, pattern);
    const split = ATHENA_assignSplitTheme_(trainingCount, dayNumber, prev, next, pattern);
    const speedPower = ATHENA_assignSpeedPowerTheme_(cns, split, dayNumber);
    const strength = ATHENA_assignStrengthTheme_(split);
    const spacing = ATHENA_assignSpacingLabel_(prev, next);

    return [day, 'Train', cns, split, speedPower, strength, prev, next, spacing, pattern];
  });

  schedule.getRange(2, 1, 7, 10).setValues(output);

  home.getRange(ATHENA_PRODUCTION.home.trainingDayCount).setValue(trainingCount);
  home.getRange(ATHENA_PRODUCTION.home.schedulePattern).setValue(pattern);

  for (let i = 0; i < 7; i++) {
    home.getRange(startRow + i, 3, 1, 4).setValues([[output[i][2], output[i][3], output[i][4], output[i][5]]]);
    home.getRange(startRow + i, 7).setValue(output[i][9]);
  }

  ATHENA_refreshPrintHeader();
  ATHENA_toast_('Weekly schedule refreshed.');
}

function ATHENA_getSchedulePattern_(trainDays) {
  const count = trainDays.filter(Boolean).length;
  let backToBackPairs = 0;

  for (let i = 0; i < trainDays.length - 1; i++) {
    if (trainDays[i] && trainDays[i + 1]) backToBackPairs++;
  }

  if (count === 0) return 'No Training Days Selected';
  if (count === 1) return 'Single Day';
  if (backToBackPairs === 0) return 'Spaced';
  if (backToBackPairs >= count - 1) return 'Compressed / Consecutive';
  return 'Mixed Spacing';
}

function ATHENA_assignCnsType_(trainingCount, dayNumber, prev, next, pattern) {
  if (trainingCount === 1) return 'High CNS';

  if (pattern === 'Spaced') {
    if (trainingCount === 2) return 'High CNS';
    if (trainingCount === 3) return dayNumber === 2 ? 'Moderate CNS' : 'High CNS';
    if (trainingCount >= 4) return dayNumber % 2 === 0 ? 'Low CNS' : 'High CNS';
  }

  if (pattern === 'Compressed / Consecutive') {
    if (dayNumber === 1) return 'High CNS';
    if (dayNumber === 2) return 'Low CNS';
    return 'Moderate CNS';
  }

  if (prev && next) return 'Low CNS';
  if (prev) return 'Moderate CNS';
  return 'High CNS';
}

function ATHENA_assignSplitTheme_(trainingCount, dayNumber, prev, next, pattern) {
  if (trainingCount === 1) return 'Total Body Performance';

  if (trainingCount === 2) {
    if (pattern === 'Spaced') {
      return dayNumber === 1 ? 'Full Body Acceleration' : 'Full Body Max Velocity';
    }
    return dayNumber === 1 ? 'Full Body High' : 'Full Body Low / Recovery Strength';
  }

  if (trainingCount === 3) {
    if (pattern === 'Spaced') {
      if (dayNumber === 1) return 'Lower Strength + Acceleration';
      if (dayNumber === 2) return 'Upper Strength + Max Velocity';
      return 'Total Body Power';
    }

    if (pattern === 'Compressed / Consecutive') {
      if (dayNumber === 1) return 'Lower Strength + Acceleration';
      if (dayNumber === 2) return 'Upper / Armor Low';
      return 'Total Body Power Moderate';
    }

    if (dayNumber === 1) return 'Lower Strength + Acceleration';
    if (prev && next) return 'Upper / Armor Low';
    return 'Total Body Power';
  }

  if (trainingCount >= 4) {
    if (dayNumber === 1) return 'Lower Strength + Acceleration';
    if (dayNumber === 2) return prev ? 'Upper Strength Low / Armor' : 'Upper Strength + Max Velocity';
    if (dayNumber === 3) return 'Lower Power';
    return 'Upper Power / Total Body';
  }

  return 'General Performance';
}

function ATHENA_assignSpeedPowerTheme_(cns, split, dayNumber) {
  if (cns === 'Low CNS') return 'Movement Prep / Tempo / Low Plyo';
  if (split.indexOf('Acceleration') !== -1) return 'Acceleration / Sled Push';
  if (split.indexOf('Max Velocity') !== -1) return 'Max Velocity / Elastic';
  if (split.indexOf('Power') !== -1) return 'Jumps / Throws / Olympic Derivative';
  return dayNumber % 2 === 1 ? 'Acceleration / Plyo' : 'Elastic / Med Ball';
}

function ATHENA_assignStrengthTheme_(split) {
  if (split.indexOf('Lower') !== -1) return 'Lower Strength';
  if (split.indexOf('Upper') !== -1) return 'Upper Strength';
  if (split.indexOf('Power') !== -1) return 'Total Body Power';
  if (split.indexOf('Low') !== -1) return 'Armor / Tissue Capacity';
  return 'Total Body Strength';
}

function ATHENA_assignSpacingLabel_(prev, next) {
  if (prev && next) return 'Middle of Back-to-Back';
  if (prev) return 'After Training Day';
  if (next) return 'Before Training Day';
  return 'Rest-Spaced';
}
