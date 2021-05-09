import { NgModule } from "@angular/core";
import { SharedDataAccessModule } from '@cesousan/shared/data-access'

@NgModule({
  imports: [
    SharedDataAccessModule.forRoot()
  ]
})
export class CoreModule {}
