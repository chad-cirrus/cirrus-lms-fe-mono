import { Injectable, isDevMode } from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Injectable({
  providedIn: 'root'
})
export class FullStoryService {

  constructor() {}

  init(orgId?: string) {
    if (orgId === undefined) return; // Skip initialization if orgId is missing

    FullStory.init({ orgId, devMode: isDevMode() });
  }
}
