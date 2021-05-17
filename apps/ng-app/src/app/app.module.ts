import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedUiComponentsAngularModule } from '@cesousan/shared/ui-components-angular'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    CoreModule,
    SharedUiComponentsAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
