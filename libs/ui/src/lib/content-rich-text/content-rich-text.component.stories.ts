/* eslint-disable no-useless-escape */
import { Meta, moduleMetadata, Story } from '@storybook/angular';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { testData855 } from 'libs/models/src/testing/testData855';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { ContentRichTextComponent } from './content-rich-text.component';

export default {
  title: 'ContentRichTextComponent',
  component: ContentRichTextComponent,
  decorators: [
    moduleMetadata({
      providers: [CirrusSanitizerService],
    }),
  ],
} as Meta<ContentRichTextComponent>;

const Template: Story<ContentRichTextComponent> = (
  args: ContentRichTextComponent
) => ({
  component: ContentRichTextComponent,
  props: args,
});

const syllabusHtml = `<div>
<span style="background-color: transparent"
  ><div style="text-align: center"><b></b></div>
  <div><b></b></div></span
><span style="background-color: transparent"
  ><div>
    <span style="font-size: 18px; background-color: transparent"
      ><b></b
    ></span>
  </div>
  <div style="text-align: center">
    <span style="font-size: 30px"></span><span style="font-size: 36px"></span
    ><span style="font-size: 42px"></span>
  </div>
  <div style="text-align: center">
    <span style="font-size: 36px">Syllabus Overview</span>
  </div></span
><span style="background-color: transparent"
  ><div><b></b></div></span
><span style="background-color: transparent"
  ><div>
    <span style="font-size: 18px; background-color: transparent"
      ><b></b
    ></span>
  </div>
  <div>
    <span
      style="
        color: inherit;
        font-size: inherit;
        background-color: transparent;
      "
    ></span></div
></span>
</div>
<div>
<span style="background-color: transparent; font-size: 0.875rem"
  ><b><br /></b
></span>
</div>
<div>
<span style="background-color: transparent; font-size: 0.875rem"
  ><b></b
></span>
</div>
<div>
<span style="font-size: 18px; background-color: transparent"><b></b></span>
</div>
<div><span style="background-color: transparent"></span></div>
<div>
<span style="font-size: 18px"><b>Syllabus Structure</b></span>
</div>
<div>
<div style="">
  <span style="font-size: 18px"
    >This course is made up of self-study, ground, or flight lessons. Ground
    and flight lessons are designed to accomplish a list of tasks with a
    certified Cirrus Instructor. You will proceed through each lesson based on
    your proficiency with these tasks.&nbsp;</span
  >
</div>
<div style="">
  <span style="font-size: 18px; background-color: transparent"
    >Each flight lesson incorporates a recommended sequence in which that
    lesson\'s tasks should be conducted. A visual flight profile shows this
    and depicts what general tasks should be accomplished for that particular
    lesson. The different colors along the flight profile represent a unique
    grouping of tasks (known as training segments) that should be conducted
    during that specific phase of flight. The below example depicts a flight
    profile with Normal Operations, Specialty Procedures, and Maneuvers
    tasks.&nbsp;&nbsp;</span
  >
</div>
</div>
<div style="">
<span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div style="">
<img
  src="https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/7f5828d0bdf522989e57689f251e5bREGULAR_maneuvers_abnormal_specialty_CAPS.png"
/><span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div style="">
<img
  src="https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/42f49e040e09a71dbb15a3da2bde14KEY_manAbnormPerform.png"
/><br />
</div>
<div style="">
<span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div>
<div>
  <div style="">
    <div>
      <span style="font-size: 18px"><b>Task Evaluation</b></span>
    </div>
  </div>
</div>
<div>
  <span style="font-size: 18px"
    >Evaluating your progress through the course is essential. All
    instructor-led lessons must be graded using a Lesson Assessment. An
    assessment is essentially a grade sheet of the lesson\'s tasks in which
    your instructor uses to evaluate and record your progress. Lesson
    assessments can be found below each lesson overview.</span
  ><br />
</div>
<div>
  <span style="background-color: transparent; font-size: 18px"><br /></span>
</div>
<div>
  <img
    src="https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/853a4d6f8d045503986d3df39fe505InstructorAssessmentContent.png"
  /><img
    src="https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/ffdc1fe9f059331041117f088daf62LessonAssessment.png"
    style="background-color: transparent"
  /><span style="background-color: transparent; font-size: 18px"><br /></span>
</div>
<div><br /></div>
<div>
  <span style="background-color: transparent; font-size: 18px"
    ><b>Tasks</b></span
  >
</div>
<div>
  <span style="font-size: 18px"
    >Each task is defined by its own unique completion standards. These
    completion standards are divided into knowledge, risk management, and
    skill elements. Completion standards can be found below each lesson
    overview.&nbsp;</span
  ><span style="background-color: transparent; font-size: 18px"><br /></span>
</div>
<div><br /></div>
<div>
  <span style="font-size: 18px"><br /></span>
</div>
<div>
  <img
    src="https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/images/daab6fdd53423c0840684e8787d3daCompletetionStandards-1.JPG"
  /><br />
</div>
<div>
  <span style="background-color: transparent; font-size: 18px"><br /></span>
</div>
<div>
  <span style="background-color: transparent; font-size: 18px"
    ><b>Practice vs. Perform</b></span
  >
</div>
<div>
  <span style="font-size: 18px"
    >Tasks will be prescribed as either Practice or Perform. Tasks that must
    be practiced are not required to be demonstrated to the completion
    standards. Tasks that must be performed are done without assistance from
    your instructor, as pilot-in-command. Tasks that must be performed in a
    lesson are indicated in the top right corner of each task
    group.&nbsp;</span
  ><br />
</div>
<div>
  <span style="background-color: transparent"><br /></span>
</div>
</div>
<blockquote style="margin: 0 0 0 40px; border: none; padding: 0px">
<div>
  <span style="font-size: 18px"><b>Perform</b></span>
</div>
<div>
  <span style="font-size: 18px"
    >Must demonstrate the knowledge and skills required by the associated
    completion standards. Performing a task is done without guidance from your
    instructor.&nbsp;</span
  ><br />
</div>
</blockquote>
<blockquote style="margin: 0 0 0 40px; border: none; padding: 0px">
<div>
  <span style="font-size: 18px"><br /></span>
</div>
<div>
  <span style="font-size: 18px"><b>Practice&nbsp;</b></span>
</div>
<div>
  <span style="font-size: 18px"
    >Not required to demonstrate the knowledge and skills required by the
    associated completion standards. Your instructor may provide
    guidance.</span
  ><br />
</div>
</blockquote>
<div>
<div><span style="background-color: transparent"></span></div>
<div><span style="background-color: transparent"></span></div>
</div>
<blockquote style="margin: 0 0 0 40px; border: none; padding: 0px">
<br />
</blockquote>
<img
src="https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/images/f7076ecbdceb6eb341707b2ec30890TaskGroup-Perform.png"
/><br />
<div>
<div>
  <span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div>
  <span style="font-size: 18px; background-color: transparent"
    >Every time you attempt a task, your instructor will mark it
    either&nbsp;<i>Passed or Missed</i>.&nbsp;</span
  >
</div>
</div>
<blockquote style="margin: 0 0 0 40px; border: none; padding: 0px">
<div>
  <div>
    <span style="font-size: 18px; background-color: transparent"><br /></span>
  </div>
  <div>
    <span style="font-size: 18px; background-color: transparent"
      ><b>Passed</b></span
    >
  </div>
  <div>
    <span style="font-size: 18px"
      >You demonstrated the knowledge and skills required by the associated
      completion standards for that task.</span
    ><br />
  </div>
</div>
<div>
  <div>
    <span style="font-size: 18px; background-color: transparent"><br /></span>
  </div>
  <div>
    <span style="font-size: 18px; background-color: transparent"
      ><b>Missed</b></span
    >
  </div>
  <div>
    <span style="font-size: 18px"
      >You did not demonstrate adequate knowledge or skills required by the
      associated completion standards for that task.</span
    ><br />
  </div>
</div>
<div>
  <span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
</blockquote>
<div>
<div>
  <span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div>
  <div>
    <img
      src="https://cirrusapproachherokudev.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/43fc954e39dc6444d3c4ebed5faa3fAssessmentTask.jpg"
    /><br />
  </div>
  <div><br /></div>
  <div><br /></div>
  <div></div>
  <div></div>
</div>
<div><span style="background-color: transparent"></span></div>
<div>
  <span style="font-size: 18px; background-color: transparent"
    ><b>Completing a Task</b></span
  >
</div>
<div>
  <span style="font-size: 18px"
    >A task is complete when all the required attempts are demonstrated. Tasks
    labeled \'Perform\' must be recorded as Passed to count towards the
    required attempts. Tasks labeled \'Practice\' can be recorded as Passed or
    Missed and will count towards the required attempts. There is a chance
    that it will take over one attempt at a task before it is performed
    proficiently. In this case, your instructor will mark the task as
    \'Missed\' and record the completion standards that were not performed
    correctly. Once you have made progress on that particular task and your
    instructor has determined it meets completion standards, he or she will
    \'Pass\' the task.</span
  ><br />
</div>
<div>
  <span style="font-size: 18px; background-color: transparent"><br /></span>
</div>
<div>
  <span style="font-size: 18px"><br /></span>
</div>
<div>
  <img
    src="https://cirrusapproachherokudev.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/fcd44eaf27679dbdc94047478ee6feMissedCompletionStandard.jpg"
  />
</div>
</div>
<div><br /></div>
<div><br /></div>
<div><br /></div>
`;

export const Primary = Template.bind({});
Primary.args = {
  content: testData855.contents[1],
};
