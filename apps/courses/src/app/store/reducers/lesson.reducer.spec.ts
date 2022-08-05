import { IProgressUpdateResponses } from '@cirrus/models';
import {
  completeProgressSuccess,
  fetchLessons,
  fetchLessonsFailure,
  startProgressSuccess,
} from '../actions';
import { initialLessonState, LessonState, reducer } from './lesson.reducer';

describe('reducer: lesson - real data', () => {
  it('should be busy when fetching lessons', () => {
    const newState = reducer(
      initialLessonState,
      fetchLessons({ courseId: 1, lessonId: 1 })
    );

    expect(newState.busy).toEqual(true);
    expect(newState.error).toEqual(null);
    expect(newState.lesson.contents.length).toEqual(0);
  });

  it('should have an error when it fails', () => {
    const error = new Error('test error');
    const newState = reducer(
      initialLessonState,
      fetchLessonsFailure({ error })
    );

    expect(newState.busy).toEqual(false);

    expect(newState.error.message).toEqual('test error');
    expect(newState.lesson.contents.length).toEqual(0);
  });

  it('should not change state with a non-lesson action', () => {
    const noopAction = { type: 'NOOP' } as any;
    const newState = reducer(initialLessonState, noopAction);

    expect(newState.busy).toBe(initialLessonState.busy);
    expect(newState.error).toBe(initialLessonState.error);
  });

  it('successful progress start', () => {
    // arrange
    const oldState: LessonState = {
      busy: false,
      error: null,
      lesson: {
        subtitle: '',
        thumbnail_image_url: '',
        mobile_hero_image_url: '',
        desktop_hero_image_url: '',
        progress_stats: [],
        id: 757,
        course_id: 215,
        stage_id: 125,
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
        contents: [],
        instructor_contents: [],
        progress: {
          id: 1774633,
          status: 'not_started',
        },
        student_intro_video: {
          id: 6,
          title: 'yeah',
          required: false,
          hidden: false,
          content: {
            id: 1236,
            order: 0,
            title: 'TOLD Interactive Map Standalone',
            subtitle: 'DO NOT ADD THIS SPECIFIC CONTENT ITEM TO LESSON',
            progress: {
              id: 0,
              status: '',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: '',
            content_type: 7,
            desc: 'DO NOT ADD THIS SPECIFIC CONTENT ITEM TO LESSON',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/interactives/93c37694d0ed9c485873told_interactive_map/index.html',
            placeholder_image: '',
            jet_scoring: false,
            content_html: '',
            created_by: 'Erik Hutson',
            upload_image: '',
            content_filename: 'told_interactive_map.zip',
            starter_file: '',
            blob_directory: '',
            show_comments: true,
          },
          content_id: 0,
          created_at: '2022-05-20T14:52:12.117Z',
          updated_at: '2022-05-20T14:52:12.117Z',
        },
      },
      lessonContents: {
        ids: [593, 605, 557, 553, 554, 911],
        entities: {
          '553': {
            id: 553,
            order: 3,
            title:
              'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            subtitle:
              'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            progress: {
              id: 1774637,
              status: 'not_started',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22T TKS Anti-Ice System POH Supplement. Aircraft Serials w/ Perspective+ avionics only.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/ded94a6f6fdce40b22a3d2b3823e99SR22T TKS Anti-Ice System (Perspective  Avionics Only) - Revision 2.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/88ce54868056a8aa079e99e7d06851Thumbnail-SR22T TKS Anti-Ice System POH Supplement (Perspective  Avionics Only).png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22T TKS Anti-Ice System (Perspective+ Avionics Only) - Revision 2.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '554': {
            id: 554,
            order: 4,
            title: 'SR22T TKS Anti-Ice System POH Supplement',
            subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
            progress: {
              id: 1774638,
              status: 'not_started',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22T TKS Anti-Ice System POH Supplement.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/ac1d34c8f32345f42256b55c86cefbSR22T TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/2378eaf623a7c5a9b1b175e738cd7fThumbnail-SR22T TKS Anti-Ice System POH Supplement (Perspective  Avionics Only).png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22T TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '557': {
            id: 557,
            order: 2,
            title: 'SR22 TKS Anti-Ice POH Supplement System',
            subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
            progress: {
              id: 1774636,
              status: 'not_started',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22 TKS Anti-Ice System POH Supplement.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/3a8142f395fbfa719133990bd71397SR22 TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/1252c1a49839e2cb138fe633d94297Thumbnail-SR22 TKS Anti-Ice System POH Supplement.png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22 TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '593': {
            id: 593,
            order: 0,
            title: 'Intro',
            subtitle: 'Intro Video: Icing Awareness Course',
            progress: {
              id: 1774634,
              status: 'not_started',
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
          },
          '605': {
            id: 605,
            order: 1,
            title:
              'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            subtitle:
              'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            progress: {
              id: 1774635,
              status: 'not_started',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22 TKS Anti-Ice System POH Supplement. Aircraft Serials w/ Perspective+ avionics only.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/4e9b1f216c4b925c37d17a6ff15f0fSR22 TKS Anti-Ice System (Perspective  Avionics Only) - Revision 2.pdf',
            placeholder_image:
              'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/4e8a24281afe2416a49896f3dcb09bIcingSuppCover.jpg',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22 TKS Anti-Ice System (Perspective+ Avionics Only) - Revision 2.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '911': {
            id: 911,
            order: 5,
            title: 'Guide To FIKI',
            subtitle: 'Guide To FIKI',
            progress: {
              id: 1774639,
              status: 'not_started',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: '',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/baeecabbeddc80c94708673fb444e0Guide to FIKI_v3.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/269868fdad5228b68a0e5f19fe645fGuidetoFIKIThumbnail.jpg',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename: 'Guide to FIKI_v3.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
        },
      },
    };

    const responses: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [
        {
          id: 1774634,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 593,
          status: 'in_progress',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: 0,
          created_at: '2022-05-05T16:41:44.305Z',
          updated_at: '2022-05-26T20:36:33.432Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774633,
          progressable_type: 'Lesson',
          item_id: 757,
          course_id: 215,
          stage_id: 125,
          lesson_id: 757,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'lesson',
          score: 0,
          created_at: '2022-05-05T16:41:44.298Z',
          updated_at: '2022-05-26T20:36:33.455Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774632,
          progressable_type: 'Stage',
          item_id: 125,
          course_id: 215,
          stage_id: 125,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'stage',
          score: 0,
          created_at: '2022-05-05T16:41:44.291Z',
          updated_at: '2022-05-26T20:36:34.257Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774631,
          progressable_type: 'Course',
          item_id: 215,
          course_id: 215,
          stage_id: 0,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'course',
          score: null,
          created_at: '2022-05-05T16:41:44.280Z',
          updated_at: '2022-05-26T20:36:34.290Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    // actual
    const stateAfterStart = reducer(
      oldState,
      completeProgressSuccess({ responses })
    );

    // assert

    expect(stateAfterStart.lesson.progress.status).toBe('in_progress');

    expect(stateAfterStart.lessonContents.entities[593]?.progress.status).toBe(
      'in_progress'
    );
    expect(stateAfterStart.lessonContents.entities[605]?.progress.status).toBe(
      'not_started'
    );
    expect(stateAfterStart.lessonContents.entities[911]?.progress.status).toBe(
      'not_started'
    );

    const completeResponses: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [
        {
          id: 1774634,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 593,
          status: 'completed',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.305Z',
          updated_at: '2022-05-26T20:48:10.989Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const stateAfterComplete = reducer(
      stateAfterStart,
      completeProgressSuccess({ responses: completeResponses })
    );

    expect(stateAfterComplete.lesson.progress.status).toBe(
      stateAfterStart.lesson.progress.status
    );

    expect(
      stateAfterComplete.lessonContents.entities[593]?.progress.status
    ).toBe('completed');
    expect(
      stateAfterComplete.lessonContents.entities[605]?.progress.status
    ).toBe(stateAfterStart.lessonContents.entities[605]?.progress.status);
    expect(
      stateAfterComplete.lessonContents.entities[911]?.progress.status
    ).toBe(stateAfterStart.lessonContents.entities[911]?.progress.status);
  });

  it('when lesson contents are being closed out', () => {
    const prevState: LessonState = {
      busy: false,
      error: null,
      lesson: {
        subtitle: '',
        thumbnail_image_url: '',
        mobile_hero_image_url: '',
        desktop_hero_image_url: '',
        progress_stats: [],
        id: 757,
        course_id: 215,
        stage_id: 125,
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
        contents: [],
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
            order: 0,
            title: 'TOLD Interactive Map Standalone',
            subtitle: 'DO NOT ADD THIS SPECIFIC CONTENT ITEM TO LESSON',
            progress: {
              id: 0,
              status: '',
            },
            score: 0,
            url: '',
            content_type: 7,
            meta_tags: [],
            content_tasks: [],
            quiz: '',
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
          },
          content_id: 0,
          created_at: '2022-05-20T14:52:12.117Z',
          updated_at: '2022-05-20T14:52:12.117Z',
        },
      },
      lessonContents: {
        ids: [593, 605, 557, 553, 554, 911],
        entities: {
          '553': {
            id: 553,
            order: 3,
            title:
              'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            subtitle:
              'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            progress: {
              id: 1774637,
              status: 'completed',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22T TKS Anti-Ice System POH Supplement. Aircraft Serials w/ Perspective+ avionics only.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/ded94a6f6fdce40b22a3d2b3823e99SR22T TKS Anti-Ice System (Perspective  Avionics Only) - Revision 2.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/88ce54868056a8aa079e99e7d06851Thumbnail-SR22T TKS Anti-Ice System POH Supplement (Perspective  Avionics Only).png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22T TKS Anti-Ice System (Perspective+ Avionics Only) - Revision 2.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '554': {
            id: 554,
            order: 4,
            title: 'SR22T TKS Anti-Ice System POH Supplement',
            subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
            progress: {
              id: 1774638,
              status: 'completed',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22T TKS Anti-Ice System POH Supplement.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/ac1d34c8f32345f42256b55c86cefbSR22T TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/2378eaf623a7c5a9b1b175e738cd7fThumbnail-SR22T TKS Anti-Ice System POH Supplement (Perspective  Avionics Only).png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22T TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '557': {
            id: 557,
            order: 2,
            title: 'SR22 TKS Anti-Ice POH Supplement System',
            subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
            progress: {
              id: 1774636,
              status: 'completed',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22 TKS Anti-Ice System POH Supplement.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/3a8142f395fbfa719133990bd71397SR22 TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/1252c1a49839e2cb138fe633d94297Thumbnail-SR22 TKS Anti-Ice System POH Supplement.png',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22 TKS Anti-Ice System POH Supplement - Original Issue.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '593': {
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
            quiz: '',
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
          },
          '605': {
            id: 605,
            order: 1,
            title:
              'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            subtitle:
              'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
            progress: {
              id: 1774635,
              status: 'completed',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: 'SR22 TKS Anti-Ice System POH Supplement. Aircraft Serials w/ Perspective+ avionics only.',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/4e9b1f216c4b925c37d17a6ff15f0fSR22 TKS Anti-Ice System (Perspective  Avionics Only) - Revision 2.pdf',
            placeholder_image:
              'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/4e8a24281afe2416a49896f3dcb09bIcingSuppCover.jpg',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename:
              'SR22 TKS Anti-Ice System (Perspective+ Avionics Only) - Revision 2.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
          '911': {
            id: 911,
            order: 5,
            title: 'Guide To FIKI',
            subtitle: 'Guide To FIKI',
            progress: {
              id: 1774639,
              status: 'in_progress',
            },
            score: 0,
            url: '',
            meta_tags: [],
            content_tasks: [],
            quiz: null,
            content_type: 6,
            desc: '',
            content_file:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/baeecabbeddc80c94708673fb444e0Guide to FIKI_v3.pdf',
            placeholder_image:
              'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/content-files/269868fdad5228b68a0e5f19fe645fGuidetoFIKIThumbnail.jpg',
            jet_scoring: false,
            content_html: '',
            created_by: 'Cirrus Aircraft',
            upload_image: '',
            content_filename: 'Guide to FIKI_v3.pdf',
            starter_file: '',
            blob_directory: '',
            show_comments: false,
          },
        },
      },
    };

    const completeResponse: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [
        {
          id: 1774639,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 911,
          status: 'completed',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.338Z',
          updated_at: '2022-05-26T21:05:34.863Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774633,
          progressable_type: 'Lesson',
          item_id: 757,
          course_id: 215,
          stage_id: 125,
          lesson_id: 757,
          status: 'completed',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'lesson',
          score: null,
          created_at: '2022-05-05T16:41:44.298Z',
          updated_at: '2022-05-26T21:05:34.882Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    expect(prevState.lessonContents.entities[911]?.progress.status).toBe(
      'in_progress'
    );

    expect(prevState.lesson.progress.status).toBe('in_progress');

    const stateAfterComplete: LessonState = reducer(
      prevState,
      completeProgressSuccess({ responses: completeResponse })
    );

    expect(stateAfterComplete.lesson.progress.status).toBe('completed');

    expect(
      stateAfterComplete.lessonContents.entities[593]?.progress.status
    ).toBe('completed');
    expect(
      stateAfterComplete.lessonContents.entities[605]?.progress.status
    ).toBe('completed');
    expect(
      stateAfterComplete.lessonContents.entities[911]?.progress.status
    ).toBe('completed');
  });
});

describe('reducer: lesson - mock data', () => {
  const mockInitital: LessonState = {
    ...initialLessonState,
    lesson: {
      ...initialLessonState.lesson,
      progress: {
        id: 1774000,
        status: 'completed',
      },
    },
    lessonContents: {
      ids: [1, 2, 3],
      entities: {
        '1': {
          id: 1,
          order: 0,
          title: 'title 1',
          subtitle: 'sub title 1',
          progress: {
            id: 1770001,
            status: 'not_started',
          },
          score: 0,
          url: '',
          meta_tags: [],
          content_tasks: [],
          quiz: null,
          content_type: 6,
          desc: 'desc 1',
          content_file: 'content file 1',
          placeholder_image: 'placeholder image 1',
          jet_scoring: false,
          content_html: '',
          created_by: 'Cirrus Aircraft',
          upload_image: '',
          content_filename: 'content filename 1',
          starter_file: '',
          blob_directory: '',
          show_comments: false,
        },
        '2': {
          id: 1,
          order: 0,
          title: 'title 2',
          subtitle: 'sub title 2',
          progress: {
            id: 1770002,
            status: 'not_started',
          },
          score: 0,
          url: '',
          meta_tags: [],
          content_tasks: [],
          quiz: null,
          content_type: 6,
          desc: 'desc 1',
          content_file: 'content file 2',
          placeholder_image: 'placeholder image 2',
          jet_scoring: false,
          content_html: '',
          created_by: 'Cirrus Aircraft',
          upload_image: '',
          content_filename: 'content filename 2',
          starter_file: '',
          blob_directory: '',
          show_comments: false,
        },
        '3': {
          id: 1,
          order: 0,
          title: 'title 3',
          subtitle: 'sub title 3',
          progress: {
            id: 1770003,
            status: 'not_started',
          },
          score: 0,
          url: '',
          meta_tags: [],
          content_tasks: [],
          quiz: null,
          content_type: 6,
          desc: 'desc 3',
          content_file: 'content file 3',
          placeholder_image: 'placeholder image 3',
          jet_scoring: false,
          content_html: '',
          created_by: 'Cirrus Aircraft',
          upload_image: '',
          content_filename: 'content filename 3',
          starter_file: '',
          blob_directory: '',
          show_comments: false,
        },
      },
    },
  };

  const mockStartResponse: IProgressUpdateResponses = {
    progress_stats: [],
    progresses: [
      {
        id: 1770001,
        progressable_type: 'Content',
        course_attempt_id: 119050,
        stage_id: 125,
        lesson_id: 757,
        item_id: 1,
        status: 'in_progress',
        user_id: 25524,
        course_id: 215,
        progress_type: 'content',
        score: null,
        created_at: '2022-05-05T16:41:44.305Z',
        updated_at: '2022-05-27T14:00:11.836Z',
        scorm_progress: null,
        is_force_completed: null,
        ios_uuid: null,
      },
      {
        id: 1774000,
        progressable_type: 'Lesson',
        item_id: 757,
        course_id: 215,
        stage_id: 125,
        lesson_id: 757,
        status: 'in_progress',
        user_id: 25524,
        course_attempt_id: 119050,
        progress_type: 'lesson',
        score: null,
        created_at: '2022-05-05T16:41:44.298Z',
        updated_at: '2022-05-27T14:00:11.880Z',
        scorm_progress: null,
        is_force_completed: null,
        ios_uuid: null,
      },
      {
        id: 1770000,
        progressable_type: 'Stage',
        item_id: 125,
        course_id: 215,
        stage_id: 125,
        lesson_id: 0,
        status: 'in_progress',
        user_id: 25524,
        course_attempt_id: 119050,
        progress_type: 'stage',
        score: null,
        created_at: '2022-05-05T16:41:44.291Z',
        updated_at: '2022-05-27T14:00:11.904Z',
        scorm_progress: null,
        is_force_completed: null,
        ios_uuid: null,
      },
      {
        id: 1700000,
        progressable_type: 'Course',
        item_id: 215,
        course_id: 215,
        stage_id: 0,
        lesson_id: 0,
        status: 'in_progress',
        user_id: 25524,
        course_attempt_id: 119050,
        progress_type: 'course',
        score: null,
        created_at: '2022-05-05T16:41:44.280Z',
        updated_at: '2022-05-27T14:00:11.937Z',
        scorm_progress: null,
        is_force_completed: null,
        ios_uuid: null,
      },
    ],
  };

  const mockComplete: IProgressUpdateResponses = {
    progress_stats: [],
    progresses: [
      {
        id: 1770001,
        progressable_type: 'Content',
        course_attempt_id: 119050,
        stage_id: 125,
        lesson_id: 757,
        item_id: 1,
        status: 'completed',
        user_id: 25524,
        course_id: 215,
        progress_type: 'content',
        score: null,
        created_at: '2022-05-05T16:41:44.305Z',
        updated_at: '2022-05-27T14:00:11.836Z',
        scorm_progress: null,
        is_force_completed: null,
        ios_uuid: null,
      },
    ],
  };

  it('should not be affected by a noop action', () => {
    const prev: LessonState = mockInitital;

    const sut: LessonState = reducer(mockInitital, { type: 'NOOP' });

    expect(prev).toBe(sut);
  });

  it('should not be affected by empty progresses', () => {
    const prev: LessonState = mockInitital;

    const responses: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [],
    };

    const sut: LessonState = reducer(
      mockInitital,
      startProgressSuccess({ responses })
    );

    expect(prev).toStrictEqual(sut);
  });

  it('should not be affected by stage progress', () => {
    const prev: LessonState = mockInitital;

    const stageProgress: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [
        {
          id: 1770000,
          progressable_type: 'Stage',
          item_id: 125,
          course_id: 215,
          stage_id: 125,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'stage',
          score: null,
          created_at: '2022-05-05T16:41:44.291Z',
          updated_at: '2022-05-27T14:00:11.904Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const sut: LessonState = reducer(
      mockInitital,
      startProgressSuccess({ responses: stageProgress })
    );

    expect(prev).toStrictEqual(sut);
  });

  it('should not be affected by course progress', () => {
    const prev: LessonState = mockInitital;

    const courseProgress: IProgressUpdateResponses = {
      progress_stats: [],
      progresses: [
        {
          id: 1700000,
          progressable_type: 'Course',
          item_id: 215,
          course_id: 215,
          stage_id: 0,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'course',
          score: null,
          created_at: '2022-05-05T16:41:44.280Z',
          updated_at: '2022-05-27T14:00:11.937Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const sut: LessonState = reducer(
      mockInitital,
      startProgressSuccess({ responses: courseProgress })
    );

    expect(prev).toStrictEqual(sut);
  });

  it('starting the first content progresses lesson and the first content', () => {
    const prev: LessonState = mockInitital;

    const responses = mockStartResponse;

    const sut: LessonState = reducer(prev, startProgressSuccess({ responses }));

    expect(sut.lesson.progress.status).toBe('in_progress');
    expect(sut.lessonContents.entities['1']?.progress.status).toBe(
      'in_progress'
    );
    expect(sut.lessonContents.entities['2']?.progress.status).toBe(
      'not_started'
    );
    expect(sut.lessonContents.entities['3']?.progress.status).toBe(
      'not_started'
    );
  });

  it('starting the first content progresses lesson and the first content', () => {
    const prev: LessonState = mockInitital;

    const responses = mockStartResponse;

    const sut: LessonState = reducer(prev, startProgressSuccess({ responses }));

    expect(sut.lesson.progress.status).toBe('in_progress');
    expect(sut.lessonContents.entities['1']?.progress.status).toBe(
      'in_progress'
    );
    expect(sut.lessonContents.entities['2']?.progress.status).toBe(
      'not_started'
    );
    expect(sut.lessonContents.entities['3']?.progress.status).toBe(
      'not_started'
    );

    const sut2: LessonState = reducer(
      sut,
      startProgressSuccess({ responses: mockComplete })
    );

    expect(sut2.lesson.progress.status).toBe(sut.lesson.progress.status);
    expect(sut2.lessonContents.entities['1']?.progress.status).toBe(
      'completed'
    );
    expect(sut2.lessonContents.entities['2']?.progress.status).toBe(
      sut.lessonContents.entities['2']?.progress.status
    );
    expect(sut2.lessonContents.entities['3']?.progress.status).toBe(
      sut.lessonContents.entities['3']?.progress.status
    );
  });
});
