/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: Config.gs
 * Purpose: Global constants, sheet names, default controls, block definitions.
 */
var JMAC = JMAC || {};

JMAC.VERSION = '3.0.0-alpha.2';

JMAC.SHEETS = {
  HOME: 'HOME',
  PRINT: 'PRINT',
  DASHBOARD: 'COACH_DASHBOARD',
  LOG: 'JMAC_LOG',
  EXERCISE_DB: 'EXERCISE_DB',
  PERFORMANCE_SOLUTIONS: 'PERFORMANCE_SOLUTIONS',
  PROGRAM_RULES: 'PROGRAM_RULES',
  VALIDATION: 'VALIDATION_REPORT'
};

JMAC.CONTROL_CELLS = {
  sport: 'B5',
  ageGroup: 'B6',
  experience: 'B7',
  goal: 'B8',
  phase: 'B9',
  trainingDays: 'B10',
  trainingMetric: 'B11',
  primaryEcosystem: 'B12',
  secondaryEcosystem: 'B13',
  desiredOutcome: 'B14'
};

JMAC.DEFAULT_CONTROLS = {
  sport: 'Football',
  ageGroup: 'High School',
  experience: 'Intermediate',
  goal: 'Speed + Strength',
  phase: 'Offseason',
  trainingDays: 4,
  trainingMetric: 'Acceleration',
  primaryEcosystem: 'Velocity',
  secondaryEcosystem: 'Forge',
  desiredOutcome: 'Explosive athlete'
};

JMAC.BLOCKS = [
  { key: 'PREP', label: 'Prep', slots: 2, type: 'prep' },
  { key: 'SPEED_POWER', label: 'Speed / Power', slots: 2, type: 'speed_power' },
  { key: 'A', label: 'Strength A', slots: 2, type: 'strength' },
  { key: 'B', label: 'Strength B', slots: 2, type: 'strength' },
  { key: 'C', label: 'Strength C', slots: 2, type: 'strength' },
  { key: 'ARMOR', label: 'Armor', slots: 2, type: 'armor' }
];

JMAC.AGE_LEVEL = {
  'Youth': 1,
  'Middle School': 2,
  'High School': 3,
  'College': 4,
  'Adult': 4
};

JMAC.EXPERIENCE_LEVEL = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
  'Elite': 4
};

JMAC.SPLITS = {
  1: ['Total Body Performance'],
  2: ['Full Body Acceleration', 'Full Body Max Velocity'],
  3: ['Lower Strength', 'Upper Strength', 'Total Body Power'],
  4: ['Lower Strength', 'Upper Strength', 'Lower Power', 'Upper Power']
};

JMAC.DEFAULT_PROGRESSIONS = {
  prep: '2 x 8 each',
  speed_power: '3-5 x 2-5',
  strength: '3 x 6-8',
  armor: '2-3 x 8-12'
};
