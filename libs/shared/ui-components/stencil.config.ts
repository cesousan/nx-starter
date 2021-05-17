import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target'
import { reactOutputTarget } from '@stencil/react-output-target'

const angularValueAccessorBindings: ValueAccessorConfig[] = []

export const config: Config = {
  namespace: 'ui-components',
  taskQueue: 'async',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: '../../../dist/libs/shared/ui-components/dist',
    },
    angularOutputTarget({
      componentCorePackage: 'dist/libs/shared/ui-components',
      directivesProxyFile:
        '../../../../libs/shared/ui-components-angular/src/generated/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      componentCorePackage: 'dist/libs/shared/ui-components',
      proxiesFile: '../../../../libs/shared/ui-components-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),
  ],
}
