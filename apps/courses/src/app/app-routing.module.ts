import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './course/lesson/lesson.component';

const routes: Routes = [
  {
    path: ':courseId',
    component: CourseComponent,
    children: [],
  },
  { path: ':courseId/lessons/:lessonId', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
