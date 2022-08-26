import { ProgressStat, ProgressType } from '@cirrus/models';

export interface ProgressStatConfig {
  iconUrl: string;
  label: string;
  completed: number;
  total: number;
}

const iconUrlDictionary: { [key: string]: string } = {
  [ProgressType.Ground]: 'courses/images/svg/progress-icon-ground.svg',
  [ProgressType.Landings]: 'courses/images/svg/progress-icon-land.svg',
  [ProgressType.Flight]: 'courses/images/svg/progress-icon-flight.svg',
  [ProgressType.Simulator]: 'courses/images/svg/simulator_icon.svg',
  [ProgressType.Assessment]: 'courses/images/svg/assessment_icon.svg',
  [ProgressType.SelfStudy]: 'courses/images/svg/self-study-progress-icon.svg',
  [ProgressType.CrossCountry]: 'courses/images/svg/cross-country-icon.svg',
};
const labelDictionary: { [key: string]: string } = {
  [ProgressType.Ground]: 'Ground Assessment',
  [ProgressType.Landings]: 'Landings',
  [ProgressType.Flight]: 'Flight Assessment',
  [ProgressType.Simulator]: 'Simulator Hrs',
  [ProgressType.Assessment]: 'Assessment',
  [ProgressType.SelfStudy]: 'Self Study',
  [ProgressType.CrossCountry]: 'Cross Country',
};

export const produceProgressStatsConfig = (
  stats: ProgressStat[]
): ProgressStatConfig[] => {
  const configs: ProgressStatConfig[] = stats.map(stat => ({
    iconUrl: iconUrlDictionary[stat.type],
    label: labelDictionary[stat.type],
    completed: stat.completed,
    total: stat.total,
  }));
  console.log(configs);
  return configs;
};
