// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  ASSESSMENT_TYPE,
  IContent,
  ILesson,
  LessonProgress,
} from '@cirrus/models';

export const testIcingContentsOneInprogress: IContent[] = [
  {
    id: 593,
    order: 0,
    title: 'Intro',
    subtitle: 'Intro Video: Icing Awareness Course',
    status: 'in_progress',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
  {
    id: 605,
    order: 1,
    title:
      'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    subtitle:
      'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    status: 'not_started',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
  {
    id: 557,
    order: 2,
    title: 'SR22 TKS Anti-Ice POH Supplement System',
    subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
    status: 'not_started',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
  {
    id: 553,
    order: 3,
    title:
      'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    subtitle:
      'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
    status: 'not_started',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
  {
    id: 554,
    order: 4,
    title: 'SR22T TKS Anti-Ice System POH Supplement',
    subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
    status: 'not_started',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
  {
    id: 911,
    order: 5,
    title: 'Guide To FIKI',
    subtitle: 'Guide To FIKI',
    status: 'not_started',
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
    estimated_time: '',
    created_at: '',
    updated_at: '',
    link_id: '',
    version: 0,
  },
];

export const testDataIcingAwarenessCourse: ILesson = {
  id: 757,
  lesson_type: 0,
  course_attempt_id: 0,
  course_id: 0,
  stage_id: 0,
  order: null,
  system_name: 'Introduction - Icing Awareness Course',
  title: 'Introduction',
  system_desc: 'The introduction lesson for the icing awareness course. ',
  overview:
    '\u003cdiv\u003e\u003cdiv\u003eEstimated Lesson Time: 15 minutes\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\u003cdiv\u003eFlight into known or forecast icing conditions comes with its own unique set of operational considerations, requiring the highest level of preparation and situational awareness throughout the flight - from preflight planning through touchdown. The TKS flight into known icing (FIKI) anti-ice system dramatically increases the safety and utility of your Cirrus, providing an extra layer of protection when conditions turn icy.\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\u003cdiv\u003eAs pilot-in-command, you must successfully complete this course within 24 months of any flight into forecast or known icing conditions. Your course must be reset in order to receive a new completion date.\u003c/div\u003e\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e',
  is_archived: false,
  is_preview: false,
  contents_are_linear: false,
  major_version: 1,
  minor_version: 10,
  updated_at: '2020-05-06T13:27:57.281Z',
  overview_image_url: '',
  student_intro_video: '',
  instructor_intro_video: '',
  estimated_time: '1:12',
  contents: [
    {
      id: 593,
      order: 0,
      title: 'Intro',
      subtitle: 'Intro Video: Icing Awareness Course',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
    {
      id: 605,
      order: 1,
      title:
        'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      subtitle:
        'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
    {
      id: 557,
      order: 2,
      title: 'SR22 TKS Anti-Ice POH Supplement System',
      subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
    {
      id: 553,
      order: 3,
      title:
        'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      subtitle:
        'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
    {
      id: 554,
      order: 4,
      title: 'SR22T TKS Anti-Ice System POH Supplement',
      subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
    {
      id: 911,
      order: 5,
      title: 'Guide To FIKI',
      subtitle: 'Guide To FIKI',
      status: 'not_started',
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
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    },
  ],
  created_at: '',
  lesson_progress: LessonProgress.Unknown,
  self_study_progress: LessonProgress.Unknown,
  assessment_progress: LessonProgress.Unknown,
  assessment: ASSESSMENT_TYPE.none,
  self_study: false,
};
