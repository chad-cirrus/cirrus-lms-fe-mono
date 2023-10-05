import { IContent, IContentPlayerMenuItem, ILesson, IProgress, PROGRESS_STATUS, ProgressType } from '@cirrus/models';
import { findNextContent, getNextContent } from './findNextContent';

let nullProgress: IProgress = { id: 0, scorm: { grade: 0, pass: false }, status: '' };
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
  progress: nullProgress,
  quiz: undefined,
  score: 0,
  show_comments: false,
  starter_file: '',
  upload_image: '',
  url: '',
  id: 0, order: 0, title: '', subtitle: '' };
const lesson: ILesson = {
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
    },
    {
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
    {
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
    {
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
    {
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
    {
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
  ],
  instructor_contents: [
    {
      id: 123,
      order: 0,
      title: 'Intro',
      subtitle: 'Intro Video: Icing Awareness Course',
      progress: {
        id: 0,
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
    {
      id: 456,
      order: 1,
      title:
        'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      subtitle:
        'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      progress: {
        id: 0,
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
    {
      id: 789,
      order: 2,
      title: 'SR22 TKS Anti-Ice POH Supplement System',
      subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
      progress: {
        id: 0,
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
  ],
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

const menuItems: IContentPlayerMenuItem[] = [
  {
    icon: 'courses/images/svg/video_play.svg',
    text: 'Intro',
    id: 593,
    progress: {
      id: 1774634,
      status: 'completed',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    text: 'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    id: 605,
    progress: {
      id: 1774635,
      status: 'completed',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    text: 'SR22 TKS Anti-Ice POH Supplement System',
    id: 557,
    progress: {
      id: 1774636,
      status: 'completed',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    text: 'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    id: 553,
    progress: {
      id: 1774637,
      status: 'not_started',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    text: 'SR22T TKS Anti-Ice System POH Supplement',
    id: 554,
    progress: {
      id: 1774638,
      status: 'not_started',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    text: 'Guide To FIKI',
    id: 911,
    progress: {
      id: 1774639,
      status: 'not_started',
    },
  },
];

const instructorMenuItems: IContentPlayerMenuItem[] = [
  {
    icon: 'courses/images/svg/document_button.svg',
    id: 123,
    text: 'Intro',
    progress: {
      id: 1,
      status: 'not_started',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    id: 456,
    text:
      'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    progress: {
      id: 2,
      status: 'not_started',
    },
  },
  {
    icon: 'courses/images/svg/document_button.svg',
    id: 789,
    text: 'SR22 TKS Anti-Ice POH Supplement System',
    progress: {
      id: 3,
      status: 'not_started',
    },
  }, 
]

describe('find next content index', () => {
  test('should return next content index in instructor view when we are not on last content item', () => {
    const currentId = 123;
    const payload = { type: 'next', id: currentId };
    const result = getNextContent(payload, lesson, instructorMenuItems, currentId, true);
    const expectedResult = { state: 'next', content: lesson.instructor_contents[1] };

    expect(result).toEqual(expectedResult);
  });

  test('should return first content index in instructor view when we are on last content item', () => {
    const currentId = 789;
    const payload = { type: 'next', id: currentId };
    const result = getNextContent(payload, lesson, instructorMenuItems, currentId, true);
    const expectedResult = { state: 'next', content: lesson.instructor_contents[0] }

    expect(result).toEqual(expectedResult);
  });

  test('should return next content index when we are not on last content item in student view', () => {
    const currentId = 593;
    const payload = { type: 'next', id: currentId };
    const result = getNextContent(payload, lesson, menuItems, currentId, false);
    const expectedResult = { state: 'next', content: lesson.contents[1] };

    expect(result).toEqual(expectedResult);
  });

  test('should return next-incomplete content item when on last content item in student view', () => {
    const currentId = 911;
    const payload = { type: 'next', id: currentId };
    const result = getNextContent(payload, lesson, menuItems, currentId, false);
    const expectedResult = { state: 'next-incomplete', content: lesson.contents[3] };

    expect(result).toEqual(expectedResult);
  });

  test('should return lesson-complete when all lesson content items are complete in student view', () => {
    const currentId = 911;
    const payload = { type: 'next', id: currentId };
    let completedLesson = lesson;
    let completedMenuItems = menuItems;

    completedLesson.contents.map(content => content.progress.status = 'completed' );
    completedMenuItems.map(menuItem => menuItem.progress.status = 'completed');
    const result = getNextContent(payload, completedLesson, completedMenuItems, currentId, false);

    expect(result).toEqual({state: 'lesson-complete', content: undefined});
  });
});

describe('find next content helper function', () => {
  test('should return the initial id', () => {
    const payLoad = {
      type: 'initial',
      id: 593,
    };

    const response = findNextContent(payLoad, lesson, menuItems, 0, false);

    expect(response.content?.id).toBe(593);
    expect(response.state).toBe('initial');
  });

  test('should advance to the second one when on the first and recieving a next payload', () => {
    const payLoad = {
      type: 'next',
    };

    const response = findNextContent(payLoad, lesson, menuItems, 593, false);

    expect(response.content?.id).toBe(605);
    expect(response.state).toBe('next');
  });

  test('should move back to previous index if on second one or after and recieving a prev payload', () => {
    const payLoad = {
      type: 'prev',
    };

    const response = findNextContent(payLoad, lesson, menuItems, 605, false);

    expect(response.content?.id).toBe(593);
    expect(response.state).toBe('prev');
  });

  test('should return undefined if previous payload and first content item', () => {
    const payLoad = {
      type: 'prev',
    };

    const response = findNextContent(payLoad, lesson, menuItems, 593, false);

    expect(response.content).toBe(undefined);
    expect(response.state).toBe('no-prev');
  });

  test('should return lesson_complete when clicking next on the last lesson', () => {
    const payload = { type: 'next' };

    const menuItemsAllComplete = [
      {
        icon: 'courses/images/svg/video_play.svg',
        text: 'Intro',
        id: 593,
        progress: {
          id: 1000,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        id: 605,
        progress: {
          id: 1000,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22 TKS Anti-Ice POH Supplement System',
        id: 557,
        progress: {
          id: 1000,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        id: 553,
        progress: {
          id: 1000,
          status: PROGRESS_STATUS.completed,
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22T TKS Anti-Ice System POH Supplement',
        id: 554,
        progress: {
          id: 1000,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'Guide To FIKI',
        id: 911,
        progress: {
          id: 1774639,
          status: 'not_started',
        },
      },
    ];

    const response = findNextContent(
      payload,
      lesson,
      menuItemsAllComplete,
      911,
      false
    );

    expect(response.content).toBe(undefined);
    expect(response.state).toBe('lesson-complete');
  });

  test('should return first uncompleted content when clicking next on the last lesson with remaining incomplete lessons', () => {
    const payload = { type: 'next' };

    const menuItemsSomeComplete = [
      {
        icon: 'courses/images/svg/video_play.svg',
        text: 'Intro',
        id: 593,
        progress: {
          id: 1774634,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        id: 605,
        progress: {
          id: 1774635,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22 TKS Anti-Ice POH Supplement System',
        id: 557,
        progress: {
          id: 1774636,
          status: 'completed',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        id: 553,
        progress: {
          id: 1774637,
          status: 'not_started',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'SR22T TKS Anti-Ice System POH Supplement',
        id: 554,
        progress: {
          id: 1774638,
          status: 'not_started',
        },
      },
      {
        icon: 'courses/images/svg/document_button.svg',
        text: 'Guide To FIKI',
        id: 911,
        progress: {
          id: 1774639,
          status: 'not_started',
        },
      },
    ];

    const response = findNextContent(
      payload,
      lesson,
      menuItemsSomeComplete,
      911,
      false
    );

    expect(response.state).toBe('next-incomplete');
    expect(response.content?.id).toBe(553);
  });
});
