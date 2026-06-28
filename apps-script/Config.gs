/**
 * JMAC Performance OS — Config.gs
 * Version: v3.0.0-alpha.1
 */

const JMAC = {
  VERSION: 'v3.0.0-alpha.1',
  APP_NAME: 'JMAC Performance OS',
  MENU_NAME: 'JMAC OS',
  SHEETS: {
    HOME: 'HOME',
    PRINT: 'PRINT',
    DASHBOARD: 'COACH_DASHBOARD',
    LOG: 'JMAC_LOG',
    EXERCISES: 'EXERCISE_DB',
    SOLUTIONS: 'PERFORMANCE_SOLUTIONS',
    SPORTS: 'SPORTS',
    ECOSYSTEMS: 'ECOSYSTEMS',
    METRICS: 'TRAINING_METRICS',
    RULES: 'PROGRAM_RULES',
    PROGRESSIONS: 'PROGRESSIONS',
    DNA: 'COACH_DNA'
  },
  HOME_CELLS: {
    SPORT: 'B5',
    AGE_GROUP: 'B6',
    EXPERIENCE: 'B7',
    GOAL: 'B8',
    PHASE: 'B9',
    TRAINING_DAYS: 'B10',
    TRAINING_METRIC: 'E5',
    PRIMARY_ECOSYSTEM: 'E6',
    SECONDARY_ECOSYSTEM: 'E7',
    DESIRED_OUTCOME: 'E8',
    WEEK: 'E9'
  },
  DEFAULTS: {
    SPORT: 'Football',
    AGE_GROUP: 'HS',
    EXPERIENCE: 'Intermediate',
    GOAL: 'Performance',
    PHASE: 'Offseason',
    TRAINING_DAYS: 4,
    TRAINING_METRIC: 'Acceleration',
    PRIMARY_ECOSYSTEM: 'Velocity',
    SECONDARY_ECOSYSTEM: 'Forge',
    DESIRED_OUTCOME: 'Explosive Athlete',
    WEEK: 1
  },
  SESSION_BLOCKS: ['Prep', 'SpeedPower', 'StrengthA', 'StrengthB', 'StrengthC', 'Armor'],
  DATABASE_HEADERS: {
    EXERCISES: ['id','exercise','block','ecosystem','metric','pattern','sport','ageMin','ageMax','experience','phase','equipment','cns','complexity','progressionLevel','unilateral','vector','tags','sets','reps','rest','coachCue'],
    SOLUTIONS: ['id','sport','ageGroup','phase','metric','ecosystem','priority','movementQuota','stressTarget','injuryBias','notes']
  }
};
