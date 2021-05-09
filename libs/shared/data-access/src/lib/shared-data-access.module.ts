import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '@cesousan/shared/environments';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25
    }) : [],
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class SharedDataAccessRootModule {}

@NgModule({})
export class SharedDataAccessModule {

  static forRoot(): ModuleWithProviders<SharedDataAccessRootModule> {
    return {
      ngModule: SharedDataAccessRootModule
    }
  }
}
