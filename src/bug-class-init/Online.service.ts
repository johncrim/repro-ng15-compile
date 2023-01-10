import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from './delay';

/**
 * Service that provides online/offline status.
 */
@Injectable({ providedIn: 'root' })
export class OnlineService
  extends BehaviorSubject<boolean>
  implements OnDestroy {

  constructor() {
    const browserOnline = navigator.onLine;
    super(browserOnline);

    window.addEventListener('online', this.toOnline);
    window.addEventListener('offline', this.toOffline);
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.toOnline);
    window.removeEventListener('offline', this.toOffline);
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
