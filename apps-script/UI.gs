/**
 * JMAC Performance OS — UI.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_buildHome() {
  const sh = JMAC_resetSheet_(JMAC.SHEETS.HOME);
  sh.setHiddenGridlines(true);
  sh.getRange('A1:H1').merge().setValue('JMAC PERFORMANCE OS').setFontSize(20).setFontWeight('bold').setFontColor('#ffffff').setBackground('#24113d');
  sh.getRange('A2:H2').merge().setValue('Program Controls').setFontWeight('bold').setFontColor('#ffffff').setBackground('#4b2e83');
  sh.getRange('A4:B4').merge().setValue('Athlete / Context').setFontWeight('bold');
  sh.getRange('D4:E4').merge().setValue('Programming Engine').setFontWeight('bold');

  const labelsLeft = [['Sport'],['Age Group'],['Experience'],['Goal'],['Phase'],['Training Days']];
  const labelsRight = [['Training Metric'],['Primary Ecosystem'],['Secondary Ecosystem'],['Desired Outcome'],['Week']];
  sh.getRange('A5:A10').setValues(labelsLeft).setFontWeight('bold');
  sh.getRange('D5:D9').setValues(labelsRight).setFontWeight('bold');

  const d = JMAC.DEFAULTS;
  sh.getRange('B5:B10').setValues([[d.SPORT],[d.AGE_GROUP],[d.EXPERIENCE],[d.GOAL],[d.PHASE],[d.TRAINING_DAYS]]);
  sh.getRange('E5:E9').setValues([[d.TRAINING_METRIC],[d.PRIMARY_ECOSYSTEM],[d.SECONDARY_ECOSYSTEM],[d.DESIRED_OUTCOME],[d.WEEK]]);

  JMAC_setValidationList_(sh.getRange('B5'), ['Football','Basketball','Soccer','Baseball','Track','Wrestling','Volleyball','Lacrosse','General']);
  JMAC_setValidationList_(sh.getRange('B6'), ['Youth','MS','HS','College','Adult']);
  JMAC_setValidationList_(sh.getRange('B7'), ['Beginner','Intermediate','Advanced']);
  JMAC_setValidationList_(sh.getRange('B8'), ['Performance','Speed','Strength','Power','Durability','Return to Play']);
  JMAC_setValidationList_(sh.getRange('B9'), ['Offseason','Preseason','Inseason','Postseason']);
  JMAC_setValidationList_(sh.getRange('B10'), [1,2,3,4]);
  JMAC_setValidationList_(sh.getRange('E5'), ['Acceleration','Max Velocity','Elastic Power','Strength','Hypertrophy','Armor']);
  JMAC_setValidationList_(sh.getRange('E6'), ['Velocity','Forge','Power','Armor']);
  JMAC_setValidationList_(sh.getRange('E7'), ['Velocity','Forge','Power','Armor']);

  sh.getRange('A13:H13').merge().setValue('Use JMAC OS → Compose Program to generate the athlete card.').setFontStyle('italic');
  sh.setColumnWidths(1, 1, 140);
  sh.setColumnWidths(2, 1, 180);
  sh.setColumnWidths(4, 1, 160);
  sh.setColumnWidths(5, 1, 180);
}
