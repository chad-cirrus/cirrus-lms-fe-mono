import { ICourseContentStat } from '@cirrus/models';

export interface ProgressStatConfig {
  iconUrl: string;
  label: string;
  completed: number;
  total: number;
}

enum CourseContentType {
  SelfStudy = 'self_study',
  FlightAssessment = 'flight_assessment',
  GroundAssessment = 'ground_assessment',
}

const iconUrlDictionary: { [key: string]: string } = {
  [CourseContentType.SelfStudy]:
    'courses/images/svg/self-study-progress-icon.svg',
  [CourseContentType.FlightAssessment]:
    'courses/images/svg/flight-assessment-progress-icon.svg',
  [CourseContentType.GroundAssessment]:
    'courses/images/svg/ground-assessment-progress-icon.svg',
};
const                                      labelDictionary: { [key: string]: string } = {
  [CourseContentType.SelfStudy]: 'Self Study',
  [CourseContentType.FlightAssessment]: 'Flight Assessment',
  [CourseContentType.GroundAssessment]: 'Ground Assessment',
};

export const produceProgressStatsConfig = (
  stats: ICourseContentStat[]
): ProgressStatConfig[] => {
  const configs: ProgressStatConfig[] = stats
    .filter(stat =>
      [
        CourseContentType.SelfStudy.toString(),
        CourseContentType.FlightAssessment.toString(),
        CourseContentType.GroundAssessment.toString(),
      ].includes(stat.type)
    )
    .map(stat => ({
      iconUrl: iconUrlDictionary[stat.type],
      label: labelDictionary[stat.type],
      completed: stat.completed,
      total: stat.total,
    }));
  return configs;
};
