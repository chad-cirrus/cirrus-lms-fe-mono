import { testDataReccurent853 } from '../../testing/testData853';
import { testData855 } from '../../testing/testData855';
import { testDataIcingAwarenessCourse } from '../../testing/testDataIcingLesson';
import { ASSESSMENT_TYPE } from '../AssessmentType';
import { IContent } from '../IContent';
import { ILesson, LessonProgress } from '../ILesson';
import { Content } from './Content';
import { Lesson } from './Lesson';
import { LessonHelper } from './LessonHelper';

describe('lesson class', () => {
  it('should return lesson not started when all content items are not started', () => {
    const lessonToTest = LessonHelper.createLessonObject(
      testDataIcingAwarenessCourse
    );

    expect(lessonToTest.assessment_progress).toBe(LessonProgress.NotStarted);
  });

  it('should return lesson inProgress when one content item is in progress', () => {
    const testIcingContentsAllButOneComplete: IContent[] = [
      {
        id: 593,
        order: 0,
        title: 'Intro',
        subtitle: 'Intro Video: Icing Awareness Course',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 605,
        order: 1,
        title:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 557,
        order: 2,
        title: 'SR22 TKS Anti-Ice POH Supplement System',
        subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 553,
        order: 3,
        title:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 554,
        order: 4,
        title: 'SR22T TKS Anti-Ice System POH Supplement',
        subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
    ];
    const sut = testDataIcingAwarenessCourse;
    sut.contents = testIcingContentsAllButOneComplete;

    const sutLessonObject = LessonHelper.createLessonObject(sut);

    expect(sutLessonObject.assessment_progress).toEqual(
      LessonProgress.InProgress
    );
  });

  it('should return lesson inProgress when one content item is in progress and the rest are complete', () => {
    const testIcingContentsAllButOneComplete: IContent[] = [
      {
        id: 593,
        order: 0,
        title: 'Intro',
        subtitle: 'Intro Video: Icing Awareness Course',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 605,
        order: 1,
        title:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 557,
        order: 2,
        title: 'SR22 TKS Anti-Ice POH Supplement System',
        subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 553,
        order: 3,
        title:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 554,
        order: 4,
        title: 'SR22T TKS Anti-Ice System POH Supplement',
        subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
    ];

    const sut = testDataIcingAwarenessCourse;
    sut.contents = testIcingContentsAllButOneComplete;

    const sutLessonObject = LessonHelper.createLessonObject(sut);

    expect(sutLessonObject.assessment_progress).toEqual(
      LessonProgress.InProgress
    );
  });

  it('should return lesson complete when all are complete', () => {
    const testIcingContentsAllComplete: IContent[] = [
      {
        id: 593,
        order: 0,
        title: 'Intro',
        subtitle: 'Intro Video: Icing Awareness Course',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 605,
        order: 1,
        title:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 557,
        order: 2,
        title: 'SR22 TKS Anti-Ice POH Supplement System',
        subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 553,
        order: 3,
        title:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 554,
        order: 4,
        title: 'SR22T TKS Anti-Ice System POH Supplement',
        subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 911,
        order: 5,
        title: 'Guide To FIKI',
        subtitle: 'Guide To FIKI',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
    ];
    const sut = testDataIcingAwarenessCourse;
    sut.contents = testIcingContentsAllComplete;

    const sutLessonObject = LessonHelper.createLessonObject(sut);

    expect(sutLessonObject.assessment_progress).toEqual(
      LessonProgress.Complete
    );
  });

  it('should return lesson inProgress when one content item is failed', () => {
    const testIcingContentsOneFailed: IContent[] = [
      {
        id: 593,
        order: 0,
        title: 'Intro',
        subtitle: 'Intro Video: Icing Awareness Course',
        status: 'failed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
    ];
    const sut = testDataIcingAwarenessCourse;
    sut.contents = testIcingContentsOneFailed;

    const sutLessonObject = LessonHelper.createLessonObject(sut);

    expect(sutLessonObject.assessment_progress).toEqual(
      LessonProgress.InProgress
    );
  });

  it('should return lesson in progress when all are complete except one failure', () => {
    const testIcingContentsAllCompleteExceptOneFailure: IContent[] = [
      {
        id: 593,
        order: 0,
        title: 'Intro',
        subtitle: 'Intro Video: Icing Awareness Course',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 605,
        order: 1,
        title:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 557,
        order: 2,
        title: 'SR22 TKS Anti-Ice POH Supplement System',
        subtitle: 'SR22 TKS Anti-Ice POH Supplement System',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 553,
        order: 3,
        title:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        subtitle:
          'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 554,
        order: 4,
        title: 'SR22T TKS Anti-Ice System POH Supplement',
        subtitle: 'SR22T TKS Anti-Ice System POH Supplement',
        status: 'completed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
      {
        id: 911,
        order: 5,
        title: 'Guide To FIKI',
        subtitle: 'Guide To FIKI',
        status: 'failed',
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
        created_at: '',
        updated_at: '',
        link_id: '',
        version: 0,
        estimated_time: '1:23',
      },
    ];
    const sut = testDataIcingAwarenessCourse;
    sut.contents = testIcingContentsAllCompleteExceptOneFailure;

    const sutLessonObject = LessonHelper.createLessonObject(sut);

    expect(sutLessonObject.assessment_progress).toEqual(
      LessonProgress.InProgress
    );
  });
});

describe('determine self study', () => {
  it('should return self study if the lesson type is self-study', () => {
    const sut = LessonHelper.createLessonObject(testDataIcingAwarenessCourse);

    expect(sut.self_study).toBe(true);
  });

  it('should return false if the lesson type is not self study and the content type is flight only', () => {
    const sut = LessonHelper.createLessonObject(testDataReccurent853);

    expect(sut.self_study).toBe(false);
  });

  it('should return true lesson type not self study but one content type is self study', () => {
    const sut = LessonHelper.createLessonObject(testData855);

    expect(sut.self_study).toBe(true);
  });
});

describe('determine assessment type', () => {
  it('should return flight assessment when all the assessment types are flight', () => {
    const sut = LessonHelper.createLessonObject(testDataReccurent853);

    expect(sut.assessment).toEqual(ASSESSMENT_TYPE.flight);
  });

  it('should return none when there is neither ground nor flight assessments', () => {
    const sut = LessonHelper.createLessonObject(testDataIcingAwarenessCourse);
    expect(sut.assessment).toEqual(ASSESSMENT_TYPE.none);
  });

  it('should return ground assessment when they are all ground', () => {
    const contents = testDataIcingAwarenessCourse.contents.map(c => ({
      ...c,
      content_type: 10,
    }));
    const testLesson = testDataIcingAwarenessCourse;
    testLesson.contents = contents;

    const sut = LessonHelper.createLessonObject(testLesson);

    expect(sut.assessment).toEqual(ASSESSMENT_TYPE.ground);
  });

  it('should return an assessment even if there is only one content item', () => {
    const sut = LessonHelper.createLessonObject(testDataReccurent853);
    expect(sut.contents.length).toEqual(1);
    expect(sut.assessment).toEqual(ASSESSMENT_TYPE.flight);
  });
});
