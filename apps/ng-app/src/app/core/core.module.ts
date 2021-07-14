import { NgModule } from '@angular/core'
import { SharedDataAccessModule } from '@hawk/shared/data-access'

@NgModule({
  imports: [SharedDataAccessModule.forRoot()],
})
export class CoreModule {}
