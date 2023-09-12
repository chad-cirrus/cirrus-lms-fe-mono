import { ContentCounts, IBadge, ICertificate, IContent, ICourseOverview, ICourseOverviewLesson, ILesson, ProgressType } from '@cirrus/models';
import {nextLesson, nextLessonUrlSegments} from './next-lesson';

const badge: IBadge = {
    badge_image: '',
    desc: '',
    id: 0,
    isActive: false,
    name: '',
    progress: 0,
};
const summaryCounts: ContentCounts = {};
const certificate: ICertificate = { expiration: '' };

describe('determine next lesson to navigate to', () => {
    it('should route to next incomplete/in progress lesson when a course is not complete', () => {
        const getActualNextLesson = nextLesson(mockCourseOverview(), mockLesson());
        const actualUrlSegments = nextLessonUrlSegments(getActualNextLesson);

        expect(actualUrlSegments).toEqual(['courses', 351, 'stages', 123, 'lessons', 840]);
    });

    it('should route to next sequential lesson when course is complete', () => {
        const getNextLesson = nextLesson(mockCompletedCourseOverview(), mockLesson());
        const actualUrlSegments = nextLessonUrlSegments(getNextLesson);

        expect(actualUrlSegments).toEqual(['courses', 351, 'stages', 123, 'lessons', 843]);
    });


    it('should route to first lesson when course is in completed state and user is on last lesson', () => {
        const mockLastLesson = {...mockLesson(), id: 843}
        const actualNextLesson = nextLesson(mockCompletedCourseOverview(), mockLastLesson);
        const actualUrlSegments = nextLessonUrlSegments(actualNextLesson);

        expect(actualUrlSegments).toEqual(['courses', 351, 'stages', 123, 'lessons', 840]);
    });
});


const mockCourseOverview = (): ICourseOverview => {
    let course: ICourseOverview = {
        badge: badge,
        certificate: certificate,
        completed_at: '',
        course_attempt: {
          id: 1234,
          user_course: {
            accepted_agreement: false,
            accepted_agreement_at: '',
            id: 234234,
          },
        },
        course_content_stats: [],
        hours_and_landings_stats: [],
        next_lesson: mockLesson(),
        started_at: '',
        summary_counts: summaryCounts,
        thumbnail_image_url: '',
        id: 351,
        name: 'Private Pilot License Course ',
        major_version: 4,
        minor_version: 11,
        title: 'Private Pilot License Course ',
        subtitle: 'An introductory subhead to the Private Pilot License Course.',
        has_agreement: true,
        agreement_body:
          '\u003cp class="MsoNormal"\u003eThis training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eSafely flying under Instrument Flight Rules (IFR) requires peak levels of skill, sound decision making, and good risk management skills. Many IFR skills degrade over periods of inactivity and each pilot must assess risks for individual flights considering their proficiency levels required to handle forecasted weather, airspace, and other challenges that may arise. Pilots who desire to fly IFR are strongly encouraged to complete an Instrument Proficiency Check in 6-month intervals, regardless of IFR currency requirements.\u0026nbsp;\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly recommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that my instructor will only observe my flight proficiency during this training for the task prescribed in this course. These tasks may not be inclusive of all the knowledge and skill required to safely fly under visual or instrument flight rules.\u003c/p\u003e',
        overview: '',
        completion_time: '1h 1m',
        minimum_flight_hours: 0,
        desktop_hero_image_url:
          'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fac20f6e5eb4f50962f0d7340ec9edSR20G3CourseThumbnail2.jpg',
        mobile_hero_image_url: '',
        can_reenroll: true,
        lessons_stats: { completed: 1, total: 15 },
        stages: [
          {
            id: 123,
            title: 'Advanced',
            overview: '',
            order: 3,
            lessons_are_linear: false,
            lessons: [
              {
                id: 840,
                stage_id: 123,
                title: 'Lesson 7',
                order: 0,
                index: '4.1',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775556, status: 'not_started' },
              },
              {
                id: 841,
                stage_id: 123,
                title: 'Lesson 8',
                order: 1,
                index: '4.2',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775558, status: 'not_started' },
              },
              {
                id: 842,
                stage_id: 123,
                title: 'Lesson 9',
                order: 2,
                index: '4.3',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775560, status: 'not_started' },
              },
              {
                id: 843,
                stage_id: 123,
                title: 'Lesson 10',
                order: 3,
                index: '4.4',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775562, status: 'not_started' },
              },
            ],
            progress: { id: 1775555, status: 'not_started' },
          },
        ],
        progress: { id: 1775461, status: 'in_progress' },
      };

    return course;
};

const mockLesson = () => {
    let nullContent: IContent = {
        blob_directory: '',
        content_file: '',
        content_filename: '',
        content_html: '',
        content_tasks: [],
        content_type: 0,
        created_by: '',
        desc: '',
        jet_scoring: false,
        meta_tags: [],
        placeholder_image: '',
        progress: { id: 0, scorm: { grade: 0, pass: false }, status: '' },
        quiz: undefined,
        score: 0,
        show_comments: false,
        starter_file: '',
        upload_image: '',
        url: '',
        id: 0, order: 0, title: '', subtitle: '' };

    const lesson: ILesson = {
        id: 842,
        course_id: 351,
        stage_id: 123,
        course_attempt_id: 119050,
        lesson_type: 0,
        order: 0,
        system_name: 'Introduction - Icing Awareness Course',
        title: 'Introduction',
        system_desc: 'The introduction lesson for the icing awareness course. ',
        overview:
          '<div><div>Estimated Lesson Time: 15 minutes</div><div><br></div><div>Flight into known or forecast icing conditions comes with its own unique set of operational considerations, requiring the highest level of preparation and situational awareness throughout the flight - from preflight planning through touchdown. The TKS flight into known icing (FIKI) anti-ice system dramatically increases the safety and utility of your Cirrus, providing an extra layer of protection when conditions turn icy.</div><div><br></div><div>As pilot-in-command, you must successfully complete this course within 24 months of any flight into forecast or known icing conditions. Your course must be reset in order to receive a new completion date.</div></div><div><br></div>',
        is_archived: false,
        is_preview: false,
        instructor_overview: '',
        contents_are_linear: false,
        major_version: 1,
        minor_version: 10,
        updated_at: '2022-05-20T14:52:12.168Z',
        overview_image_url: '',
        contents: [
          {
            id: 593,
            order: 0,
            title: 'Intro',
            subtitle: 'Intro Video: Icing Awareness Course',
            progress: {
              id: 1774634,
              status: 'completed',
            },
            score: 0,
            url: '355991595',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 0,
            desc: 'Intro video for the icing awareness course.',
            content_file: '',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/scorm/d754d0afe672c18526c66d5c2e2a8311.1_Intro.jpg',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename: '',
            starter_file: '',
            blob_directory: '',
            show_comments: true,
          }
        ],
        instructor_contents: [],
        progress: {
          id: 1774633,
          status: 'in_progress',
        },
        student_intro_video: {
          id: 6,
          title: 'yeah',
          required: false,
          hidden: false,
          content: {
            id: 1236,
            title: 'TOLD Interactive Map Standalone',
            subtitle: 'DO NOT ADD THIS SPECIFIC CONTENT ITEM TO LESSON',
            score: 0,
            url: '',
            content_type: 7,
            meta_tags: [],
            content_html: '',
            desc: 'DO NOT ADD THIS SPECIFIC CONTENT ITEM TO LESSON',
            placeholder_image: '',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/interactives/93c37694d0ed9c485873told_interactive_map/index.html',
            jet_scoring: false,
            created_by: 'Erik Hutson',
            upload_image: '',
            content_filename: 'told_interactive_map.zip',
            blob_directory: '',
            starter_file: '',
            show_comments: true,
            order: 0,
            progress: {
              id: 0,
              status: '',
            },
            quiz: null,
            content_tasks: [],
          },
          created_at: '2022-05-20T14:52:12.117Z',
          updated_at: '2022-05-20T14:52:12.117Z',
          content_id: 0,
        },
        instructor_intro_video: {
          content: nullContent,
          content_id: 0,
          created_at: '',
          hidden: false,
          required: false,
          id: 0,
          title: '',
          updated_at: '',
        },
        subtitle: '',
        thumbnail_image_url: '',
        mobile_hero_image_url: '',
        desktop_hero_image_url: '',
        progress_stats: [
          {
            type: ProgressType.SelfStudy,
            completed: 0,
            total: 3,
            status: 'not_started',
          },
        ],
      };
    return lesson;
}

const mockCompletedCourseOverview = (): ICourseOverview => {
    let course: ICourseOverview = {
        badge: badge,
        certificate: certificate,
        completed_at: '2023-09-09',
        course_attempt: {
          id: 1234,
          user_course: {
            accepted_agreement: false,
            accepted_agreement_at: '',
            id: 234234,
          },
        },
        course_content_stats: [],
        hours_and_landings_stats: [],
        next_lesson: mockLesson(),
        started_at: '',
        summary_counts: summaryCounts,
        thumbnail_image_url: '',
        id: 351,
        name: 'Private Pilot License Course ',
        major_version: 4,
        minor_version: 11,
        title: 'Private Pilot License Course ',
        subtitle: 'An introductory subhead to the Private Pilot License Course.',
        has_agreement: true,
        agreement_body:
          '\u003cp class="MsoNormal"\u003eThis training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eSafely flying under Instrument Flight Rules (IFR) requires peak levels of skill, sound decision making, and good risk management skills. Many IFR skills degrade over periods of inactivity and each pilot must assess risks for individual flights considering their proficiency levels required to handle forecasted weather, airspace, and other challenges that may arise. Pilots who desire to fly IFR are strongly encouraged to complete an Instrument Proficiency Check in 6-month intervals, regardless of IFR currency requirements.\u0026nbsp;\u0026nbsp;\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly recommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).\u003c/p\u003e\u003cp class="MsoNormal"\u003e\u003cbr\u003e\u003c/p\u003e\u003cp class="MsoNormal"\u003eI acknowledge that my instructor will only observe my flight proficiency during this training for the task prescribed in this course. These tasks may not be inclusive of all the knowledge and skill required to safely fly under visual or instrument flight rules.\u003c/p\u003e',
        overview: '',
        completion_time: '1h 1m',
        minimum_flight_hours: 0,
        desktop_hero_image_url:
          'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/fac20f6e5eb4f50962f0d7340ec9edSR20G3CourseThumbnail2.jpg',
        mobile_hero_image_url: '',
        can_reenroll: true,
        lessons_stats: { completed: 1, total: 15 },
        stages: [
          {
            id: 123,
            title: 'Advanced',
            overview: '',
            order: 3,
            lessons_are_linear: false,
            lessons: [
              {
                id: 840,
                stage_id: 123,
                title: 'Lesson 7',
                order: 0,
                index: '4.1',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775556, status: 'completed' },
              },
              {
                id: 841,
                stage_id: 123,
                title: 'Lesson 8',
                order: 1,
                index: '4.2',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775558, status: 'completed' },
              },
              {
                id: 842,
                stage_id: 123,
                title: 'Lesson 9',
                order: 2,
                index: '4.3',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775560, status: 'completed' },
              },
              {
                id: 843,
                stage_id: 123,
                title: 'Lesson 10',
                order: 3,
                index: '4.4',
                thumbnail_image_url: '',
                lesson_type: 2,
                completion_time: '1h 1m',
                content_counts: { assessments: 1 },
                progress: { id: 1775562, status: 'completed' },
              },
            ],
            progress: { id: 1775555, status: 'completed' },
          },
        ],
        progress: { id: 1775461, status: 'in_progress' },
      };

    return course;
};