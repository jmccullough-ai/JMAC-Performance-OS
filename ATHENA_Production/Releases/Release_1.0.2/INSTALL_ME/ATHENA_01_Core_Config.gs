/**
 * JMAC Performance OS — ATHENA Production
 * Release 1.0.2 — Core Config
 */

const ATHENA_PRODUCTION = {
  appName: 'JMAC Performance OS',
  systemName: 'ATHENA Production',
  release: 'Release 1.0.2',
  version: '1.0.2',
  buildDate: '2026-07-01',
  menuName: 'ATHENA Production',

  sheets: {
    home: 'HOME',
    print: 'PRINT',
    lookup: 'LOOKUP',
    sportProfiles: 'SPORT_PROFILES',
    athleteLevels: 'ATHLETE_LEVELS',
    weeklySchedule: 'WEEKLY_SCHEDULE',
    progressionMap: 'PROGRESSION_MAP',
    exerciseMaster: 'EXERCISE_MASTER',
    programRules: 'PROGRAM_RULES',
    templates: 'TEMPLATES',
    healthCheck: 'HEALTH_CHECK'
  },

  home: {
    programTitle: 'B5',
    facilityTeam: 'B6',
    coachName: 'B7',
    sport: 'B8',
    gender: 'B9',
    athleteLevel: 'B10',
    phase: 'B11',
    primaryGoal: 'B12',
    printHeader: 'B13',
    trainingDayCount: 'B15',
    schedulePattern: 'B16',
    weeklyCalendarStartRow: 21,
    weeklyCalendarRows: 7
  },

  colors: {
    purple: '#4B0082',
    black: '#111111',
    white: '#FFFFFF',
    greyDark: '#444444',
    greyLight: '#F3F3F3',
    green: '#D9EAD3',
    red: '#F4CCCC',
    yellow: '#FFF2CC',
    blue: '#CFE2F3'
  },

  fonts: {
    primary: 'Arial'
  }
};

function ATHENA_requiredSheetNames_() {
  const s = ATHENA_PRODUCTION.sheets;
  return [
    s.home,
    s.print,
    s.lookup,
    s.sportProfiles,
    s.athleteLevels,
    s.weeklySchedule,
    s.progressionMap,
    s.exerciseMaster,
    s.programRules,
    s.templates,
    s.healthCheck
  ];
}

function ATHENA_getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function ATHENA_getHomeRange_(fieldName) {
  return ATHENA_getSpreadsheet_()
    .getSheetByName(ATHENA_PRODUCTION.sheets.home)
    .getRange(ATHENA_PRODUCTION.home[fieldName]);
}

function ATHENA_toast_(message, title) {
  ATHENA_getSpreadsheet_().toast(message, title || ATHENA_PRODUCTION.systemName, 5);
}
