import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '@cesousan/shared/environments'

import { debug } from './debug'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : []
