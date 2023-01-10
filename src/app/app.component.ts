import { Component } from '@angular/core';
import { OnlineService2 } from '../bug-class-compile/Online.service2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repro-ng15-compile';

  constructor(private readonly _online: OnlineService2) { }

}
