import { ICourseOverview, ICourseOverviewLesson, ICourseOverviewStage, ILesson } from '@cirrus/models';

class NextLesson {
    public courseOverview: ICourseOverview;
    public stage: ICourseOverviewStage;
    public lesson: ICourseOverviewLesson;

    constructor(
        courseOverview: ICourseOverview,
        stage: ICourseOverviewStage,
        lesson: ICourseOverviewLesson) {
            this.courseOverview = courseOverview;
            this.stage = stage;
            this.lesson = lesson;
        }
}

export const nextLessonUrlSegments = (nextLesson: NextLesson): any[] => ([
    'courses',
    nextLesson.courseOverview.id,
    'stages',
    nextLesson.stage.id,
    'lessons',
    nextLesson.lesson.id
])

const nextIncompleteLesson = (courseOverview: ICourseOverview): NextLesson | null => {
    const nextStage = courseOverview.stages.find(stage => ['not_started', 'in_progress'].includes(stage.progress.status));
    const nextLesson = nextStage?.lessons.find(lesson => ['not_started', 'in_progress'].includes(lesson.progress.status));
    
    if (nextStage === undefined || nextLesson === undefined) {
        return null;
    } else {
        return new NextLesson(courseOverview, nextStage, nextLesson);
    }
}

const nextSequentialLesson = (courseOverview: ICourseOverview, lesson: ILesson): NextLesson => {
    const stagesArr = courseOverview.stages;

    const currentStageIndex = stagesArr.findIndex(stage => stage.id === lesson.stage_id);
    const currentStageLessonsArr = stagesArr[currentStageIndex].lessons;
    const currentLessonIndex = currentStageLessonsArr.findIndex(stageLesson => stageLesson.id === lesson.id);
  
    let nextStage = courseOverview.stages[currentStageIndex];
    let nextLesson = nextStage.lessons[currentLessonIndex + 1];
  
    if (currentStageIndex !== stagesArr.length - 1 && currentLessonIndex === currentStageLessonsArr.length - 1) {
        nextStage = courseOverview.stages[currentStageIndex + 1];
        nextLesson = nextStage.lessons[0];
    }
  
    if (currentStageIndex === stagesArr.length - 1 && currentLessonIndex === currentStageLessonsArr.length - 1) {
        nextStage = courseOverview.stages[0];
        nextLesson = nextStage.lessons[0]; 
    }
  
    return new NextLesson(courseOverview, nextStage, nextLesson);
}
  
export const nextLesson = (courseOverview: ICourseOverview, lesson: ILesson): NextLesson => {
    return nextIncompleteLesson(courseOverview) || nextSequentialLesson(courseOverview, lesson);
}
