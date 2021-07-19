import { Component } from '@angular/core'

import { ExampleA } from '@hawk/shared/types'

@Component({
  selector: 'hawk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-app'
  ex: ExampleA = {
    firstName: 'Tito',
    lastName: 'Zoubida',
  }
}
