import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { defineCustomElements } from 'dist/libs/shared/ui-components/loader'
import { MyComponent } from '../generated/directives/proxies'

const UI_COMPONENTS = [MyComponent]

defineCustomElements(window)

@NgModule({
  imports: [CommonModule],
  declarations: [UI_COMPONENTS],
  exports: [UI_COMPONENTS],
})
export class SharedUiComponentsAngularModule {}
