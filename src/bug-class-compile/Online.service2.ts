import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from './delay';

/* eslint-disable @typescript-eslint/no-misused-promises */

export const WINDOW = new InjectionToken<Window>('window', { providedIn: 'platform', factory: () => window });

/**
 * Service that provides online/offline status.
 */
@Injectable({ providedIn: 'root' })
export class OnlineService2
  extends BehaviorSubject<boolean>
  implements OnDestroy {

  constructor(@Inject(WINDOW) private readonly _window: Window) {
    const browserOnline = _window.navigator.onLine;
    super(browserOnline);

    _window.addEventListener('online', this.toOnline);
    _window.addEventListener('offline', this.toOffline);
  }

  ngOnDestroy() {
    this._window.removeEventListener('online', this.toOnline);
    this._window.removeEventListener('offline', this.toOffline);
    this.complete();
  }

  private readonly toOnline = async () => {
    await delay(1);
    this.next(true);
  };

  private readonly toOffline = async () => {
    await delay(1);
    this.next(false);
  };

}
