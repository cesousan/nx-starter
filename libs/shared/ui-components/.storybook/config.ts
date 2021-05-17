import { configure, addDecorator } from '@storybook/html'
import { withKnobs } from '@storybook/addon-knobs'
import { defineCustomElements } from '../../../../dist/libs/shared-ui-components/loader'

defineCustomElements()

addDecorator(withKnobs)
configure(require.context('../src', true, /\.stories\.(j|t)sx?$/), module)
