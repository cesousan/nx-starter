/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda'

import { Maybe } from '@hawk/utils/types/adt/maybe'

enum Tag {
  NotAsked = 'NotAsked',
  Loading = 'Loading',
  Failure = 'Failure',
  Success = 'Success',
}

interface Patterns<E, V, T> {
  NotAsked: () => T
  Loading: () => T
  Failure: (error: E) => T
  Success: (value: V) => T
}

export class RemoteData<E, V> {
  private static NOT_ASKED = new RemoteData<never, never>(Tag.NotAsked)

  private static LOADING = new RemoteData<never, never>(Tag.Loading)

  static of = RemoteData.Success

  static NotAsked<E = any, V = any>(): RemoteData<E, V> {
    return RemoteData.NOT_ASKED
  }

  static Loading<E = any, V = any>(): RemoteData<E, V> {
    return RemoteData.LOADING
  }

  static Failure<E = any, V = any>(error: E): RemoteData<E, V> {
    return new RemoteData(Tag.Failure, error)
  }

  static Success<E = any, V = any>(value: V): RemoteData<E, V> {
    return new RemoteData(Tag.Success, undefined, value)
  }

  static isNotAsked<E = any, V = any>(r: RemoteData<E, V>): boolean {
    return r.isNotAsked()
  }

  static isLoading<E = any, V = any>(r: RemoteData<E, V>): boolean {
    return r.isLoading()
  }

  static isFailure<E = any, V = any>(r: RemoteData<E, V>): boolean {
    return r.isFailure()
  }

  static isSuccess<E = any, V = any>(r: RemoteData<E, V>): boolean {
    return r.isSuccess()
  }

  static map<E, V, W>(f: (v: V) => W, r: RemoteData<E, V>): RemoteData<E, W> {
    return r.map(f)
  }

  static map2<E, V1, V2, W>(
    f: (v1: V1, v2: V2) => W,
    r1: RemoteData<E, V1>,
    r2: RemoteData<E, V2>,
  ): RemoteData<E, W> {
    return r2.ap(r1.map((v1) => (v2: V2) => f(v1, v2)))
  }

  static ap<E, V, W>(rf: RemoteData<E, (v: V) => W>, r: RemoteData<E, V>): RemoteData<E, W> {
    return r.ap(rf)
  }

  static chain<E, V, W>(f: (v: V) => RemoteData<E, W>, r: RemoteData<E, V>): RemoteData<E, W> {
    return r.chain(f)
  }

  static fold<E, V, T>(patterns: Patterns<E, V, T>, r: RemoteData<E, V>): T {
    return r.fold(patterns)
  }

  static get<V, E = any>(r: RemoteData<E, V>): V {
    return r.get()
  }

  static getOrElse<V, E = any>(value: V, r: RemoteData<E, V>): V {
    return r.getOrElse(value)
  }

  static all<E, V>(rs: RemoteData<E, V>[]): RemoteData<E, V[]> {
    return rs.reduce((acc, it) => acc.ap(it.map(R.append)), RemoteData.Success([]))
  }

  static toMaybe<V>(r: RemoteData<any, V>): Maybe<V> {
    return r.toMaybe()
  }

  private constructor(tag: Tag.NotAsked | Tag.Loading)
  private constructor(tag: Tag.Failure, error: E)
  private constructor(tag: Tag.Success, error: undefined, value: V)
  private constructor(readonly tag: Tag, readonly error?: E, readonly value?: V) {}

  isNotAsked(): boolean {
    return this.tag === Tag.NotAsked
  }

  isLoading(): boolean {
    return this.tag === Tag.Loading
  }

  isFailure(): boolean {
    return this.tag === Tag.Failure
  }

  isSuccess(): boolean {
    return this.tag === Tag.Success
  }

  map<W>(f: (value: V) => W): RemoteData<E, W> {
    switch (this.tag) {
      case Tag.Success:
        return RemoteData.Success(f(this.value))
      default:
        return this as RemoteData<any, any>
    }
  }

  ap<W>(rf: RemoteData<E, (value: V) => W>): RemoteData<E, W> {
    switch (this.tag) {
      case Tag.Success:
        return rf.map((f) => f(this.value))
      default:
        return this as RemoteData<any, any>
    }
  }

  chain<W>(f: (value: V) => RemoteData<E, W>): RemoteData<E, W> {
    switch (this.tag) {
      case Tag.Success:
        return f(this.value)
      default:
        return this as RemoteData<any, any>
    }
  }

  fold<T>(patterns: Patterns<E, V, T>): T {
    switch (this.tag) {
      case Tag.NotAsked:
        return patterns.NotAsked()
      case Tag.Loading:
        return patterns.Loading()
      case Tag.Failure:
        return patterns.Failure(this.error)
      case Tag.Success:
        return patterns.Success(this.value)
    }
  }

  get(): V {
    switch (this.tag) {
      case Tag.Success:
        return this.value
      default:
        throw new TypeError(`Can't extract any value from ${this.tag}`)
    }
  }

  getOrElse(value: V): V {
    switch (this.tag) {
      case Tag.Success:
        return this.value
      default:
        return value
    }
  }

  toMaybe(): Maybe<V> {
    switch (this.tag) {
      case Tag.Success:
        return Maybe.Just(this.value)
      default:
        return Maybe.Nothing()
    }
  }
}

export const {
  of,
  NotAsked,
  Loading,
  Failure,
  Success,
  isNotAsked,
  isLoading,
  isFailure,
  isSuccess,
  map,
  ap,
  chain,
  all,
  fold,
  get,
  getOrElse,
  toMaybe,
} = RemoteData
