import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './course/lesson/lesson.component';

const routes: Routes = [
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    children: [],
  },
  { path: 'courses/:courseId/lesson/:lessonId', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
