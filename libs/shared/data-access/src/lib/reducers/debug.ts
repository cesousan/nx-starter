import { ActionReducer } from '@ngrx/store'

export function debug<T = unknown>(reducer: ActionReducer<T>): ActionReducer<T> {
  return (state, action) => {
    console.log('state', state)
    console.log('action', action)
    return reducer(state, action)
  }
}
