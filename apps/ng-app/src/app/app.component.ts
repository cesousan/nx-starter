import { Component } from '@angular/core'

import { APIExampleA } from '@hawk/shared/types'

@Component({
  selector: 'hawk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-app'
  ex: APIExampleA = {
    first: 'Tito',
    last: 'Zoubida',
  }
}
