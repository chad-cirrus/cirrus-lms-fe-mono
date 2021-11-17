import { Injectable } from '@angular/core';
import { IConfig } from '@cirrus/models';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  getConfigs(): Observable<IConfig> {
    const configs: IConfig = {
      a: 'test config a',
      b: true,
      c: 2000,
    };
    return timer(3000).pipe(map(() => ({ ...configs })));
  }
}
