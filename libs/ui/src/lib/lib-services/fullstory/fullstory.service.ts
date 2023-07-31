import { Inject, Injectable } from '@angular/core';
import * as FullStory from '@fullstory/browser';
import { FullStoryEvent } from './full-story-event';

@Injectable({
  providedIn: 'root',
})
export class FullstoryService {
  private readonly environment: Record<string, unknown>;

  constructor(@Inject('environment') environment: Record<string, unknown>) {
    this.environment = environment;
  }

  init() {
    FullStory.init({ orgId: this.environment.fullstoryOrgId as string });
  }

  event(eventName: string, eventProperties: FullStoryEvent) {
    FullStory.event(eventName, eventProperties);
  }
}
