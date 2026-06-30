/**
 * JMAC Performance OS v3.0.0-alpha.2
 * File: DatabaseSeed.gs
 * Purpose: Creates editable database sheets inside Google Sheets.
 */
function JMAC_seedDatabases() {
  JMAC_seedExerciseDatabase();
  JMAC_seedPerformanceSolutions();
}

function JMAC_seedExerciseDatabase() {
  var rows = JMAC_getStarterExercises_();
  JMAC_writeTable_(JMAC.SHEETS.EXERCISE_DB, rows);
}

function JMAC_seedPerformanceSolutions() {
  var rows = [
    { Sport: 'Football', Priority: 'Acceleration|Forge|Armor', InjuryBias: 'Neck|Hamstring|Groin|Tibialis' },
    { Sport: 'Basketball', Priority: 'Elasticity|Power|Landing', InjuryBias: 'Patellar Tendon|Soleus|Ankle' },
    { Sport: 'Soccer', Priority: 'COD|Elasticity|Armor', InjuryBias: 'Groin|Adductor|Hamstring|Calf' },
    { Sport: 'Track', Priority: 'Acceleration|Max Velocity|Elasticity', InjuryBias: 'Hamstring|Hip Flexor|Foot/Ankle' },
    { Sport: 'General', Priority: 'Strength|Power|Armor', InjuryBias: 'Trunk|Hip|Shoulder' }
  ];
  JMAC_writeTable_(JMAC.SHEETS.PERFORMANCE_SOLUTIONS, rows);
}

function JMAC_getStarterExercises_() {
  return [
    e_('A-Skip March','prep','Velocity','Acceleration|Max Velocity','All','All','All','Mobility','Total','Low','1','4','Sprint Mechanics|Hip Flexor'),
    e_('Wall Drill Switch','prep','Velocity','Acceleration','All','All','All','Acceleration','Total','Low','2','5','Sprint Mechanics'),
    e_('Pogo Jump','prep|speed_power','Velocity|Power','Elasticity|Max Velocity','All','All','All','Elasticity','Lower','Low','2','5','Foot/Ankle|Tibialis'),
    e_('Snap Down to Stick','prep|speed_power','Power|Armor','Power|Elasticity','All','All','All','Landing','Lower','Low','1','5','Landing|Patellar Tendon'),
    e_('Falling Start','speed_power','Velocity','Acceleration','All','All','All','Acceleration','Total','High','2','5','Sprint Mechanics'),
    e_('Three Point Start','speed_power','Velocity','Acceleration','Football|Track|General','High School|College|Adult','Intermediate|Advanced|Elite','Acceleration','Total','High','3','5','Sprint Mechanics'),
    e_('Wicket Run','speed_power','Velocity','Max Velocity','Track|Football|Soccer|General','High School|College|Adult','Intermediate|Advanced|Elite','Max Velocity','Total','High','3','5','Sprint Mechanics|Elasticity'),
    e_('Broad Jump','speed_power','Power|Velocity','Power|Acceleration','All','All','All','Jump','Lower','High','2','5','Horizontal Power'),
    e_('Box Jump','speed_power','Power','Power','All','All','All','Jump','Lower','High','2','4','Triple Extension'),
    e_('Med Ball Chest Pass','speed_power','Power','Power','All','All','All','Med Ball','Upper','Moderate','1','4','Upper Push'),
    e_('Med Ball Scoop Toss','speed_power','Power','Power|Acceleration','All','All','All','Med Ball','Total','Moderate','2','5','Rotational Power'),
    e_('Goblet Squat','strength','Forge','Strength','All','All','All','Squat','Lower','Moderate','1','5','Knee Dominant'),
    e_('Front Squat','strength','Forge','Strength|Power','All','High School|College|Adult','Intermediate|Advanced|Elite','Squat','Lower','High','3','5','Knee Dominant'),
    e_('Trap Bar Deadlift','strength','Forge|Power','Strength|Power','All','High School|College|Adult','Beginner|Intermediate|Advanced|Elite','Hinge','Lower','High','2','5','Triple Extension|Posterior Chain'),
    e_('DB RDL','strength','Forge','Strength','All','All','All','Hinge','Lower','Moderate','2','5','Hamstring|Posterior Chain'),
    e_('Single-Leg RDL','strength','Forge|Armor','Strength','All','All','All','Hinge','Lower','Moderate','2','5','Hamstring|Hip'),
    e_('RFESS','strength','Forge','Strength','All','High School|College|Adult','Intermediate|Advanced|Elite','Unilateral Knee','Lower','High','3','5','Knee Dominant'),
    e_('Walking Lunge','strength','Forge','Strength','All','All','All','Unilateral Knee','Lower','Moderate','2','4','Hip|Groin'),
    e_('Push-Up','strength','Forge','Strength','All','All','All','Upper Push','Upper','Moderate','1','4','Shoulder'),
    e_('DB Bench Press','strength','Forge','Strength','All','High School|College|Adult','Beginner|Intermediate|Advanced|Elite','Upper Push','Upper','Moderate','2','5','Upper Push'),
    e_('Half-Kneeling Landmine Press','strength','Forge|Armor','Strength|Power','All','All','All','Upper Push','Upper','Moderate','2','5','Shoulder|Trunk'),
    e_('Pull-Up','strength','Forge','Strength','All','High School|College|Adult','Intermediate|Advanced|Elite','Upper Pull','Upper','High','3','5','Upper Pull'),
    e_('Inverted Row','strength','Forge','Strength','All','All','All','Upper Pull','Upper','Moderate','1','5','Upper Pull|Scap'),
    e_('1-Arm DB Row','strength','Forge','Strength','All','All','All','Upper Pull','Upper','Moderate','1','5','Scap'),
    e_('Farmer Carry','strength|armor','Forge|Armor','Strength','All','All','All','Carry','Total','Moderate','1','5','Grip|Trunk'),
    e_('Pallof Press','armor','Armor','Strength','All','All','All','Trunk','Total','Low','1','5','Trunk'),
    e_('Copenhagen Plank','armor','Armor','Strength','Football|Soccer|Basketball|General','Middle School|High School|College|Adult','Intermediate|Advanced|Elite','Groin','Lower','Low','3','5','Groin|Adductor'),
    e_('Tibialis Raise','armor','Armor','Elasticity','All','All','All','Tibialis','Lower','Low','1','5','Tibialis|Foot/Ankle'),
    e_('Soleus ISO Hold','armor','Armor','Elasticity','Basketball|Soccer|Track|General','All','All','Soleus','Lower','Low','1','5','Soleus|Ankle'),
    e_('Band External Rotation','armor','Armor','Strength','Baseball|Volleyball|Basketball|General','All','All','Rotator Cuff','Upper','Low','1','5','Rotator Cuff|Shoulder'),
    e_('Neck ISO Series','armor','Armor','Strength','Football|Wrestling|General','High School|College|Adult','All','Neck','Upper','Low','1','5','Neck'),
    e_('Dead Bug','armor|prep','Armor','Strength','All','All','All','Trunk','Total','Low','1','5','Trunk')
  ];
}

function e_(Exercise, BlockType, Ecosystem, TrainingMetric, Sport, AgeGroup, Experience, Pattern, Region, CNSLabel, Complexity, CoachRank, Tags) {
  var cnsMap = { Low: 1, Moderate: 3, High: 5 };
  return {
    Exercise: Exercise,
    BlockType: BlockType,
    Ecosystem: Ecosystem,
    TrainingMetric: TrainingMetric,
    Sport: Sport,
    AgeGroup: AgeGroup,
    Experience: Experience,
    Phase: 'All|Offseason|Preseason|Inseason|Postseason',
    Pattern: Pattern,
    Region: Region,
    CNS: cnsMap[CNSLabel] || 3,
    Complexity: Complexity,
    CoachRank: CoachRank,
    Tags: Tags,
    Notes: ''
  };
}
