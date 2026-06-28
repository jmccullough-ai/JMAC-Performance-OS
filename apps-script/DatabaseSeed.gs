/**
 * JMAC Performance OS — DatabaseSeed.gs
 * Version: v3.0.0-alpha.1
 * REPLACE/ADD: This module seeds starter database sheets.
 */

function JMAC_seedDatabases() {
  JMAC_writeRows_(JMAC.SHEETS.EXERCISES, JMAC_seedExerciseRows_(), true);
  JMAC_writeRows_(JMAC.SHEETS.SOLUTIONS, JMAC_seedSolutionRows_(), true);
  JMAC_writeRows_(JMAC.SHEETS.SPORTS, [['sport'],['Football'],['Basketball'],['Soccer'],['Baseball'],['Track'],['Wrestling'],['Volleyball'],['Lacrosse'],['General']], true);
  JMAC_writeRows_(JMAC.SHEETS.ECOSYSTEMS, [['ecosystem','description'],['Velocity','Sprint mechanics, acceleration, max velocity, elastic contacts'],['Forge','Strength, carries, trunk, structural capacity'],['Power','Jumps, throws, triple extension, explosive outputs'],['Armor','Durability, tissue capacity, joint-specific protection']], true);
  JMAC_writeRows_(JMAC.SHEETS.METRICS, [['metric'],['Acceleration'],['Max Velocity'],['Elastic Power'],['Strength'],['Hypertrophy'],['Armor']], true);
  JMAC_writeRows_(JMAC.SHEETS.RULES, [['rule','value'],['SpeedPowerFirst','TRUE'],['ArmorEverySession','TRUE'],['MaxTrainingDays','4'],['NoSprintJumpFinishers','TRUE']], true);
  JMAC_writeRows_(JMAC.SHEETS.PROGRESSIONS, [['week','strategy'],['1','Base / technical'],['2','Add quality volume'],['3','Add set or load'],['4','Deload / absorb']], true);
  JMAC_writeRows_(JMAC.SHEETS.DNA, [['principle','description'],['Intent','Every session has a clear adaptation target'],['Progression','Progress from extensive to intensive before advanced loading'],['Speed','Speed/power happen before fatigue'],['Armor','Durability is trained every day']], true);
}

function JMAC_seedExerciseRows_() {
  return [
    JMAC.DATABASE_HEADERS.EXERCISES,
    ['prepA','A-Skip Series','Prep','Velocity','Acceleration|Max Velocity','sprint mechanics','Any','11','99','Any','Any','Bodyweight','2','1','1','FALSE','horizontal','rhythm|posture','2','10 yd','30s','Tall'],
    ['prepB','Pogo Jump + Stick','Prep','Velocity','Elastic Power','jump landing','Any','11','99','Any','Any','Bodyweight','2','1','1','FALSE','vertical','landing|ankle','2','8','30s','Stiff'],
    ['prepC','Worlds Greatest Stretch','Prep','Armor','Armor','mobility','Any','11','99','Any','Any','Bodyweight','1','1','1','FALSE','multi','hips|t-spine','1','5/side','20s','Open'],
    ['spA','Falling Start','SpeedPower','Velocity','Acceleration','sprint','Any','11','99','Any','Any','Bodyweight','4','2','2','FALSE','horizontal','acceleration|first step','3','10 yd','60s','Push'],
    ['spB','Wicket Run Rhythm','SpeedPower','Velocity','Max Velocity','sprint','Track|Football|Soccer|Basketball|Any','13','99','Intermediate|Advanced|Any','Any','Mini Hurdles','4','3','3','FALSE','vertical','max velocity|rhythm','3','15 yd','75s','Tall'],
    ['spC','Countermovement Jump','SpeedPower','Power','Elastic Power','jump','Any','11','99','Any','Any','Bodyweight','3','2','2','FALSE','vertical','jump|power','3','4','60s','Snap'],
    ['spD','Med Ball Scoop Toss','SpeedPower','Power','Med Ball Power|Elastic Power','throw','Any','11','99','Any','Any','Med Ball','3','2','2','FALSE','horizontal','throw|hip','3','5/side','60s','Explode'],
    ['sa1','Goblet Squat','StrengthA','Forge','Strength','squat','Any','11','99','Any','Any','DB|KB','3','1','1','FALSE','vertical','lower|squat','3','6','75s','Brace'],
    ['sa2','DB Bench Press','StrengthA','Forge','Strength','push','Any','11','99','Any','Any','DB','3','1','1','FALSE','upper','upper|push','3','8','75s','Drive'],
    ['sa3','Trap Bar Deadlift','StrengthA','Forge','Strength','hinge','Football|Basketball|Track|Any','13','99','Intermediate|Advanced|Any','Offseason|Preseason|Any','Trap Bar','4','2','2','FALSE','vertical','lower|hinge','3','5','90s','Push floor'],
    ['sa4','Half-Kneeling Landmine Press','StrengthA','Forge|Power','Strength','push','Any','11','99','Any','Any','Landmine','3','2','1','FALSE','upper','upper|trunk','3','6/side','75s','Reach'],
    ['sb1','RFESS','StrengthB','Forge','Strength','lunge','Any','13','99','Intermediate|Advanced|Any','Any','DB','4','3','2','TRUE','vertical','lower|single leg','3','6/side','90s','Control'],
    ['sb2','Chest Supported Row','StrengthB','Forge','Strength','pull','Any','11','99','Any','Any','DB|Bench','3','1','1','FALSE','upper','upper|pull|scap','3','8','75s','Pull'],
    ['sb3','DB RDL','StrengthB','Forge','Strength','hinge','Any','11','99','Any','Any','DB','3','1','1','FALSE','horizontal','hamstring|hinge','3','8','75s','Hips back'],
    ['sb4','Push-Up','StrengthB','Forge','Strength','push','Any','11','99','Any','Any','Bodyweight','2','1','1','FALSE','upper','upper|push','3','8','60s','Line'],
    ['sc1','Walking Lunge','StrengthC','Forge','Hypertrophy|Strength','lunge','Any','11','99','Any','Any','DB|Bodyweight','3','2','1','TRUE','horizontal','lower|single leg','2','8/side','60s','Step'],
    ['sc2','1-Arm DB Row','StrengthC','Forge','Hypertrophy|Strength','pull','Any','11','99','Any','Any','DB','2','1','1','TRUE','upper','upper|pull','2','10/side','60s','Elbow'],
    ['sc3','Hip Thrust','StrengthC','Forge','Strength','hinge','Any','11','99','Any','Any','Bench|Barbell','3','2','1','FALSE','horizontal','glute|hip','3','8','60s','Lockout'],
    ['sc4','Tall Kneeling Med Ball Chest Pass','StrengthC','Power','Med Ball Power','throw','Any','11','99','Any','Any','Med Ball','2','1','1','FALSE','upper','throw|power','2','6','45s','Pop'],
    ['ar1','Copenhagen Side Plank','Armor','Armor','Armor','adductor','Soccer|Hockey|Football|Any','13','99','Intermediate|Advanced|Any','Any','Bodyweight','2','2','1','TRUE','lateral','groin|adductor','2','15s/side','30s','Long'],
    ['ar2','Tibialis Raise','Armor','Armor','Armor','tibialis','Any','11','99','Any','Any','Wall','1','1','1','FALSE','lower','shin|ankle','2','12','30s','Lift'],
    ['ar3','Band External Rotation','Armor','Armor','Armor','rotator cuff','Baseball|Volleyball|Basketball|Any','11','99','Any','Any','Band','1','1','1','TRUE','upper','shoulder|rotator cuff','2','12/side','30s','Smooth'],
    ['ar4','Neck Iso Series','Armor','Armor','Armor','neck','Football|Wrestling|Any','13','99','Any','Any','Bodyweight','1','1','1','FALSE','upper','neck','2','10s each','30s','Brace'],
    ['ar5','Soleus ISO Hold','Armor','Armor','Armor','calf','Basketball|Soccer|Track|Any','11','99','Any','Any','Bodyweight','1','1','1','FALSE','lower','soleus|ankle','2','20s','30s','Press']
  ];
}

function JMAC_seedSolutionRows_() {
  return [
    JMAC.DATABASE_HEADERS.SOLUTIONS,
    ['sol1','Football','HS','Offseason','Acceleration','Velocity','High','hinge|sprint|neck','72','neck','Acceleration and contact prep'],
    ['sol2','Basketball','HS','Offseason','Elastic Power','Power','High','jump|landing|soleus','68','soleus','Elastic repeat power and landing'],
    ['sol3','Soccer','HS','Offseason','Max Velocity','Velocity','High','sprint|adductor|hamstring','66','adductor','Sprint exposure with groin armor'],
    ['sol4','Baseball','HS','Offseason','Med Ball Power','Power','Medium','throw|scap|rotator cuff','58','rotator cuff','Rotational power and shoulder armor'],
    ['sol5','Track','HS','Offseason','Max Velocity','Velocity','High','sprint|elastic|hamstring','70','hamstring','Speed and elastic stiffness'],
    ['sol6','Any','Any','Any','Any','Any','Medium','squat|hinge|push|pull|armor','60','','General performance solution']
  ];
}
