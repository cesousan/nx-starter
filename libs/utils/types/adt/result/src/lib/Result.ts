/* eslint-disable @typescript-eslint/no-explicit-any */
import { append } from 'ramda'

import { Maybe } from '@hawk/utils/types/adt/maybe'

enum Tag {
  Err = 'Err',
  Ok = 'Ok',
}

interface Patterns<E, V, T> {
  Err: (error: E) => T
  Ok: (value: V) => T
}

export class Result<E, V> {
  static of = Result.Ok

  static Err<E = any, V = any>(e: E): Result<E, V> {
    return new Result(Tag.Err, e)
  }

  static Ok<E = any, V = any>(v: V): Result<E, V> {
    return new Result(Tag.Ok, v)
  }

  static isErr<E, V>(r: Result<E, V>): boolean {
    return r.isErr()
  }

  static isOk<E, V>(r: Result<E, V>): boolean {
    return r.isOk()
  }

  static map<E, V, W>(f: (v: V) => W, r: Result<E, V>): Result<E, W> {
    return r.map(f)
  }

  static map2<E, V1, V2, W>(
    f: (v1: V1, v2: V2) => W,
    r1: Result<E, V1>,
    r2: Result<E, V2>,
  ): Result<E, W> {
    return r2.ap(r1.map((v1) => (v2: V2) => f(v1, v2)))
  }

  static ap<E, V, W>(rf: Result<E, (v: V) => W>, r: Result<E, V>): Result<E, W> {
    return r.ap(rf)
  }

  static chain<E, V, W>(f: (v: V) => Result<E, W>, r: Result<E, V>): Result<E, W> {
    return r.chain(f)
  }

  static fold<E, V, T>(patterns: Patterns<E, V, T>, r: Result<E, V>): T {
    return r.fold(patterns)
  }

  static get<E, V>(r: Result<E, V>): V {
    return r.get()
  }

  static getOrElse<E, V>(v: V, r: Result<E, V>): V {
    return r.getOrElse(v)
  }

  static all<E, V>(rs: Result<E, V>[]): Result<E, V[]> {
    return rs.reduce((acc, it) => acc.ap(it.map(append)), Result.Ok([]))
  }

  static toMaybe<E, V>(r: Result<E, V>): Maybe<V> {
    return r.toMaybe()
  }

  private constructor(tag: Tag.Err, value: E)
  private constructor(tag: Tag.Ok, value: V)
  private constructor(readonly tag: Tag, readonly value: E | V) {}

  isErr(): boolean {
    return this.tag === Tag.Err
  }

  isOk(): boolean {
    return this.tag === Tag.Ok
  }

  map<W>(f: (v: V) => W): Result<E, W> {
    switch (this.tag) {
      case Tag.Err:
        return this as Result<any, any>
      case Tag.Ok:
        return Result.Ok(f(this.value as V))
    }
  }

  ap<W>(r: Result<E, (v: V) => W>): Result<E, W> {
    switch (this.tag) {
      case Tag.Err:
        return this as Result<any, any>
      case Tag.Ok:
        return r.map((f) => f(this.value as V))
    }
  }

  chain<W>(f: (v: V) => Result<E, W>): Result<E, W> {
    switch (this.tag) {
      case Tag.Err:
        return this as Result<any, any>
      case Tag.Ok:
        return f(this.value as V)
    }
  }

  fold<T>(patterns: Patterns<E, V, T>): T {
    switch (this.tag) {
      case Tag.Err:
        return patterns.Err(this.value as E)
      case Tag.Ok:
        return patterns.Ok(this.value as V)
    }
  }

  get(): V {
    switch (this.tag) {
      case Tag.Err:
        throw new TypeError(`Can't extract any value from ${this.tag}`)
      case Tag.Ok:
        return this.value as V
    }
  }

  getOrElse(v: V): V {
    switch (this.tag) {
      case Tag.Err:
        return v
      case Tag.Ok:
        return this.value as V
    }
  }

  toMaybe(): Maybe<V> {
    switch (this.tag) {
      case Tag.Err:
        return Maybe.Nothing()
      case Tag.Ok:
        return Maybe.Just(this.value as V)
    }
  }
}

export const { of, Err, Ok, isErr, isOk, all, map, ap, chain, fold, get, getOrElse } = Result
