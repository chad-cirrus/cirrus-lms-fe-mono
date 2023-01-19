import { Injectable, isDevMode } from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Injectable({
  providedIn: 'root'
})
export class FullStoryService {

  constructor() {}

  init(orgId: string) {
    FullStory.init({ orgId, devMode: isDevMode() });
  }
}
