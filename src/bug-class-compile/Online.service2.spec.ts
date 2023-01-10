/*!
 * Copyright 2022 Fintellect, Inc. All Rights Reserved.
 */

import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { OnlineService2, WINDOW } from './Online.service2';
import { TestEventTarget } from './TestEventTarget';

class FakeWindow extends TestEventTarget {
  public readonly navigator: Partial<Navigator> = {
    onLine: false
  };
}

describe('OnlineService2', () => {
  let service: OnlineService2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW,
          useFactory: () => new FakeWindow()
        }
      ]
    });
    service = TestBed.inject(OnlineService2);
  });

  it('emits true after online event', fakeAsync(() => {
    expect(service.value).toBeFalse();

    const fakeWindow = TestBed.inject(WINDOW) as unknown as FakeWindow;
    fakeWindow.dispatchEvent(new Event('online'));
    tick(1);

    expect(service.value).toBeTrue();
  }));

});
