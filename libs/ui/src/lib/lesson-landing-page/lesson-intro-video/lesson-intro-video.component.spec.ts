import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonIntroVideoComponent } from './lesson-intro-video.component';
import { InstructorIntroVideo, StudentIntroVideo } from '@cirrus/models';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('LessonIntroVideoComponent', () => {
    let component: LessonIntroVideoComponent;
    let fixture: ComponentFixture<LessonIntroVideoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconTestingModule],
            declarations: [
                MatIcon,
                LessonIntroVideoComponent
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LessonIntroVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should display student intro video contents when instructor toggle is false and student video title is empty', () => {
        component.instructorView = false;
        component.studentIntroVideo = {...mockStudentIntroVideoContent(), title: ''};
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle').textContent).toContain('Lesson Introduction Video');
    });

    it('should display student intro video contents when instructor toggle is false and student video title is truthy', () => {
        component.instructorView = false;
        component.studentIntroVideo = mockStudentIntroVideoContent();
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle').textContent).toContain('Student Intro Video');
    });

    it('should not display student intro video when student intro video content is undefined', () => {
        component.instructorView = false;
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle')).toBeFalsy();
    });

    it('should display instructor intro video contents when instructor toggle is true and instructor video title is empty', () => {
        component.instructorView = true;
        component.instructorIntroVideo = {...mockInstructorIntroVideoContent(), title: ''};
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle').textContent).toContain('Lesson Introduction Video');
    });

    it('should display instructor intro video contents when instructor toggle is true and instructor video title is truthy', () => {
        component.instructorView = true;
        component.instructorIntroVideo = mockInstructorIntroVideoContent();
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle').textContent).toContain('Instructor Intro Video');
    });

    it('should not display instructor intro video contents when instructor toggle is true and instructor video content is undefined', () => {
        component.instructorView = true;
        fixture.detectChanges();
        const introVideoElement = fixture.debugElement.nativeElement;

        expect(introVideoElement.querySelector('.intro-video-subtitle')).toBeFalsy();
    });
});

function mockInstructorIntroVideoContent(): InstructorIntroVideo {
      return {
        content: {
            blob_directory: '',
            order: 0,
            quiz: '',
            content_tasks: [],
            progress: { id: 1, status: 'not_completed' },
            content_file: '',
            content_filename: '',
            content_html: '',
            content_type: 0,
            created_by: 'Cirrus Aircraft',
            desc: 'Perspective & Perspective+ Avionics Course',
            id: 401,
            jet_scoring: false,
            meta_tags: [],
            placeholder_image:
              'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
            score: 0,
            show_comments: true,
            starter_file: '',
            subtitle: 'Hello Cockpit [2.1]',
            title: 'Hello Cockpit [2.1]',
            upload_image: '',
            url: '309005652',
          },
        content_id: 4567,
        created_at: '',
        hidden: false,
        required: false,
        id: 456789,
        title: 'Instructor Intro Video',
        updated_at: '',
      }
}

function mockStudentIntroVideoContent(): StudentIntroVideo {
    return {
        content: {
            blob_directory: '',
            order: 0,
            quiz: '',
            content_tasks: [],
            progress: { id: 1, status: 'not_completed' },
            content_file: '',
            content_filename: '',
            content_html: '',
            content_type: 0,
            created_by: 'Cirrus Aircraft',
            desc: 'Perspective & Perspective+ Avionics Course',
            id: 401,
            jet_scoring: false,
            meta_tags: [],
            placeholder_image:
              'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
            score: 0,
            show_comments: true,
            starter_file: '',
            subtitle: 'Hello Cockpit [2.1]',
            title: 'Hello Cockpit [2.1]',
            upload_image: '',
            url: '309005652',
        },
        content_id: 1234,
        created_at: '',
        hidden: false,
        required: false,
        id: 123456,
        title: 'Student Intro Video',
        updated_at: ''
    }
}