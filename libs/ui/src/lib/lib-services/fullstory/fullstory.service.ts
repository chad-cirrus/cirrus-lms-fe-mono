import { Inject, Injectable } from '@angular/core';
import * as FullStory from '@fullstory/browser';
import { FullStoryEventData } from './full-story-event';
import { ICirrusUser } from '@cirrus/models';

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

  event(eventName: string, eventProperties: FullStoryEventData) {
    FullStory.event(eventName, eventProperties);
  }

  identify(cirrusUser: ICirrusUser) {
    // business asked for cirrus id instead of sfid. need to convert to string for FullStory
    FullStory.identify(cirrusUser.id.toString(), {
      role: cirrusUser?.role
    });
  }
}
