import { SafeResourceUrl } from '@angular/platform-browser';
import { IPlayListItem } from '..';

export interface IScormPlayListItem extends IPlayListItem {
  sanitizedUrl: SafeResourceUrl;
}
