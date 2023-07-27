import { Inject, Injectable } from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Injectable({
  providedIn: 'root',
})
export class FullstoryService {
  private readonly environment: Record<string, unknown>;

  constructor(
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  init() {
    FullStory.init({orgId: this.environment.fullstoryOrgId as string})
  }

  event(eventName: string, eventProperties: {}) {
    console.log('EVENT NAME:', eventName);
    FullStory.event(eventName, eventProperties);
  }
}
