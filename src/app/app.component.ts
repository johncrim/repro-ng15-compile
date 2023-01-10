import { Component } from '@angular/core';
import { OnlineService } from '../bug-class-init/Online.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repro-ng15-init';

  constructor(private readonly _online: OnlineService) { }

}
