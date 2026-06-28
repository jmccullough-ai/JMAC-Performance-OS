/**
 * JMAC Performance OS — SplitEngine.gs
 * Version: v3.0.0-alpha.1
 */

function JMAC_getSplit_(controls) {
  const days = JMAC_clamp_(JMAC_int_(controls.trainingDays, 4), 1, 4);
  const splits = {
    1: [
      { day: 1, theme: 'Total Body Performance', emphasis: 'Blend', body: 'Total' }
    ],
    2: [
      { day: 1, theme: 'Full Body Acceleration', emphasis: 'Acceleration', body: 'Total' },
      { day: 2, theme: 'Full Body Max Velocity', emphasis: 'Max Velocity', body: 'Total' }
    ],
    3: [
      { day: 1, theme: 'Lower Strength', emphasis: 'Acceleration', body: 'Lower' },
      { day: 2, theme: 'Upper Strength', emphasis: 'Upper Power', body: 'Upper' },
      { day: 3, theme: 'Total Body Power', emphasis: 'Elastic Power', body: 'Total' }
    ],
    4: [
      { day: 1, theme: 'Lower Strength', emphasis: 'Acceleration', body: 'Lower' },
      { day: 2, theme: 'Upper Strength', emphasis: 'Upper Power', body: 'Upper' },
      { day: 3, theme: 'Lower Power', emphasis: 'Max Velocity', body: 'Lower' },
      { day: 4, theme: 'Upper Power', emphasis: 'Med Ball Power', body: 'Upper' }
    ]
  };
  return splits[days];
}
