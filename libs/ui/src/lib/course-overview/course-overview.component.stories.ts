import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ICourseOverviewInfo } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseOverviewComponent } from './course-overview.component';

export default {
  title: 'Course Component Overview Tab Content',
  component: CourseOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatIconModule, MatIconRegistryModule],
      declarations: [CourseOverviewComponent],
    }),
  ],
} as Meta<CourseOverviewComponent>;

const Template: Story<CourseOverviewComponent> = (
  args: CourseOverviewComponent
) => ({ props: args });

const overview: ICourseOverviewInfo = {
  id: 355,
  name: 'SR22T Airframe and Powerplant Differences',
  major_version: 5,
  minor_version: 9,
  completion_time: '20h 15m',
  minimum_flight_hours: '035',
  course_summary_counts: {
    lessons: 5,
    videos: 10,
    documents: 7,
    assessments: 2,
    quizzes: 0,
  },
  agreement_body:
    '<div class="OutlineElement Ltr SCXW193394030" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr;"><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;">This training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.</p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;"><br></p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;">The objectives of this course are limited to visual flight rules (VFR) only. Additional instrument training and completion of an instrument proficiency check in aircraft type is required to be capable of safely flying in instrument conditions.&nbsp;</p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;"><br></p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;">I acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly recommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).&nbsp;</p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;"><br></p><p class="Paragraph SCXW193394030" xml:lang="EN-US" lang="EN-US" paraid="727678916" paraeid="{1341523e-8628-436e-909e-4c0b3737ae42}{22}" style="padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline;">I acknowledge that my instructor will only observe my flight proficiency during this training for the tasks marked as satisfactory or unsatisfactory and that the tasks required by this training course may not be inclusive of all the knowledge and skill that is required to safely fly under visual or instrument flight rules.</p></div>',
  overview:
    '<span class="TextRun SCXW15190085" xml:lang="EN-US" style="animation: none 0s ease 0s 1 normal none running; background: none 0% 0% / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0); background-blend-mode: normal; border: 0px none rgb(0, 0, 0); border-radius: 0px; border-collapse: separate; bottom: auto; box-shadow: none; box-sizing: content-box; break-after: auto; break-before: auto; break-inside: auto; caption-side: top; clear: none; clip: auto; color: rgb(0, 0, 0); content: normal; cursor: text; direction: ltr; display: inline; empty-cells: show; float: none; font-family: Calibri, Calibri_MSFontService, sans-serif; font-kerning: auto; font-size: 14.6667px; font-stretch: 100%; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; font-variant-numeric: normal; font-variant-east-asian: normal; height: auto; image-rendering: auto; isolation: auto; place-items: normal; place-self: auto; left: auto; line-height: 18px; list-style: disc outside none; margin: 0px; max-height: none; max-width: none; min-height: 0px; min-width: 0px; mix-blend-mode: normal; object-fit: fill; object-position: 50% 50%; offset: none 0px auto 0deg; opacity: 1; outline: rgb(0, 0, 0) none 0px; outline-offset: 0px; overflow-anchor: auto; overflow-wrap: break-word; overflow: visible; padding: 0px; pointer-events: auto; position: static; resize: none; right: auto; scroll-behavior: auto; speak: normal; table-layout: auto; tab-size: 8; text-align-last: auto; text-decoration-style: solid; text-decoration-color: rgb(0, 0, 0); text-decoration-skip-ink: auto; text-underline-position: auto; text-rendering: auto; text-shadow: none; text-size-adjust: auto; text-overflow: clip; top: auto; touch-action: auto; transition: all 0s ease 0s; unicode-bidi: normal; vertical-align: baseline; visibility: visible; width: auto; will-change: auto; word-break: normal; z-index: auto; zoom: 1; -webkit-appearance: none; backface-visibility: visible; border-spacing: 0px; -webkit-border-image: none; -webkit-box-align: stretch; -webkit-box-decoration-break: slice; -webkit-box-direction: normal; -webkit-box-flex: 0; -webkit-box-ordinal-group: 1; -webkit-box-orient: horizontal; -webkit-box-pack: start; columns: auto auto; gap: normal normal; column-rule: 0px none rgb(0, 0, 0); column-span: none; place-content: normal; flex: 0 1 auto; flex-flow: row nowrap; -webkit-font-smoothing: auto; grid-auto-columns: auto; grid-auto-flow: row; grid-auto-rows: auto; grid-area: auto / auto / auto / auto; grid-template-areas: none; grid-template-columns: none; grid-template-rows: none; -webkit-highlight: none; hyphens: manual; -webkit-hyphenate-character: auto; -webkit-line-break: after-white-space; -webkit-locale: &quot;en-US&quot;; -webkit-margin-collapse: collapse collapse; -webkit-mask-box-image-outset: 0px; -webkit-mask-box-image-repeat: stretch; -webkit-mask-box-image-slice: 0 fill; -webkit-mask-box-image-source: none; -webkit-mask-box-image-width: auto; -webkit-mask: none 0% 0% / auto repeat border-box border-box; -webkit-mask-composite: source-over; order: 0; perspective: none; perspective-origin: 0px 0px; -webkit-print-color-adjust: economy; -webkit-rtl-ordering: logical; shape-outside: none; shape-image-threshold: 0; shape-margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-combine: none; -webkit-text-emphasis: none rgb(0, 0, 0); -webkit-text-emphasis-position: over right; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-orientation: vertical-right; -webkit-text-security: none; -webkit-text-stroke-color: rgb(0, 0, 0); transform: none; transform-origin: 0px 0px 0px; transform-style: flat; -webkit-user-drag: none; -webkit-user-modify: read-write; user-select: text; -webkit-writing-mode: horizontal-tb; -webkit-app-region: none; buffered-rendering: auto; clip-path: none; clip-rule: nonzero; mask: none; filter: none; flood-color: rgb(0, 0, 0); flood-opacity: 1; lighting-color: rgb(255, 255, 255); stop-color: rgb(0, 0, 0); stop-opacity: 1; color-interpolation: sRGB; color-interpolation-filters: linearRGB; color-rendering: auto; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: nonzero; marker: none; mask-type: luminance; shape-rendering: auto; stroke: none; stroke-dasharray: none; stroke-dashoffset: 0px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 1px; alignment-baseline: auto; baseline-shift: 0px; dominant-baseline: auto; text-anchor: start; writing-mode: horizontal-tb; vector-effect: none; paint-order: fill; d: none; cx: 0px; cy: 0px; x: 0px; y: 0px; r: 0px; rx: auto; ry: auto; caret-color: rgb(0, 0, 0);" lang="EN-US"><span class="NormalTextRun SCXW15190085" style="background-color: inherit;">This add-on course is designed to transition an experienced Cirrus pilot to a different airframe/powerplant. The course focuses on the operational differences unique to the SR22T.</span></span><div><b style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);"><br></b></div><div><b style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);">Flight Time:</b><span style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);"> 3 Hours (estimate)</span></div><div><span style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);"><br></span></div><div><span style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);"><b>Bundled Courses:</b>&nbsp;</span><span style="background-color: transparent; font-size: 14.6667px; font-variant-ligatures: none; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);"><font color="#000000" face="Calibri, Calibri_MSFontService, sans-serif">Takeoffs &amp; Landings Course and&nbsp;</font></span><span style="background-color: inherit; color: rgb(0, 0, 0); font-family: Calibri, Calibri_MSFontService, sans-serif; font-size: 14.6667px; font-variant-ligatures: no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual; -webkit-text-fill-color: rgb(0, 0, 0); -webkit-text-stroke-color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);">Engine Management Course</span></div>',
  course_progress_stats: {
    self_study: [
      {
        type: 'self_study',
        completed: 1,
        total: 1,
        status: 'not_started',
      },
      {
        type: 'self_study',
        completed: 11,
        total: 11,
        status: 'not_started',
      },
      {
        type: 'self_study',
        completed: 5,
        total: 5,
        status: 'not_started',
      },
      {
        type: 'self_study',
        completed: 5,
        total: 5,
        status: 'completed',
      },
      {
        type: 'self_study',
        completed: 1,
        total: 1,
        status: 'not_started',
      },
    ],
    flight: [
      {
        type: 'flight',
        completed: 0.0,
        total: '5.0',
        status: 'completed',
      },
      {
        type: 'flight',
        completed: 0.0,
        total: 0,
        status: 'not_started',
      },
    ],
    ground: [
      {
        type: 'ground',
        completed: 0.0,
        total: '5.0',
        status: 'completed',
      },
      {
        type: 'ground',
        completed: 0.0,
        total: 0,
        status: 'not_started',
      },
    ],
    landings: [
      {
        type: 'landings',
        completed: 0,
        total: 3,
        status: 'completed',
      },
      {
        type: 'landings',
        completed: 0,
        total: 0,
        status: 'not_started',
      },
    ],
    assessment: [
      {
        type: 'assessment',
        completed: 33,
        total: 34,
        status: 'completed',
      },
      {
        type: 'assessment',
        completed: 0,
        total: 20,
        status: 'not_started',
      },
    ],
  },
};

export const Primary = Template.bind({});
Primary.args = {
  courseOverview: overview,
};
