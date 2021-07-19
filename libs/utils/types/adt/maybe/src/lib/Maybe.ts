/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda'

enum Tag {
  Nothing = 'Nothing',
  Just = 'Just',
}

interface Patterns<A, T> {
  Nothing: () => T
  Just: (value: A) => T
}

export class Maybe<A> {
  private static NOTHING = new Maybe<never>(Tag.Nothing)

  static of = Maybe.Just

  static empty = Maybe.Nothing

  static Nothing<A = any>(): Maybe<A> {
    return Maybe.NOTHING
  }

  static Just<A = any>(value: A): Maybe<A> {
    return new Maybe(Tag.Just, value)
  }

  static fromNullable<A = any>(value: A): Maybe<A> {
    return R.isNil(value) ? Maybe.NOTHING : Maybe.Just(value)
  }

  static isNothing<A>(m: Maybe<A>): boolean {
    return m.isNothing()
  }

  static isJust<A>(m: Maybe<A>): boolean {
    return m.isJust()
  }

  static map<A, B>(f: (a: A) => B, m: Maybe<A>): Maybe<B> {
    return m.map(f)
  }

  static map2<A, B, C>(f: (a: A, b: B) => C, ma: Maybe<A>, mb: Maybe<B>): Maybe<C> {
    return mb.ap(ma.map((a) => (b: B) => f(a, b)))
  }

  static ap<A, B>(mf: Maybe<(a: A) => B>, m: Maybe<A>): Maybe<B> {
    return m.ap(mf)
  }

  static chain<A, B>(f: (a: A) => Maybe<B>, m: Maybe<A>): Maybe<B> {
    return m.chain(f)
  }

  static fold<A, T>(patterns: Patterns<A, T>, m: Maybe<A>): T {
    return m.fold(patterns)
  }

  static filter<A>(predicate: (value: A) => boolean, m: Maybe<A>): Maybe<A> {
    return m.filter(predicate)
  }

  static reject<A>(predicate: (value: A) => boolean, m: Maybe<A>): Maybe<A> {
    return m.reject(predicate)
  }

  static orElse<A>(fallback: Maybe<A>, m: Maybe<A>): Maybe<A> {
    return m.orElse(fallback)
  }

  static get<A>(m: Maybe<A>): A {
    return m.get()
  }

  static getOrElse<A>(value: A, m: Maybe<A>): A {
    return m.getOrElse(value)
  }

  static all<A>(ms: Maybe<A>[]): Maybe<A[]> {
    return ms.reduce((acc, it) => acc.ap(it.map(R.append)), Maybe.Just([]))
  }

  private constructor(tag: Tag.Nothing)
  private constructor(tag: Tag.Just, value: A)
  private constructor(readonly tag: Tag, readonly value?: A) {}

  isNothing(): boolean {
    return this.tag === Tag.Nothing
  }

  isJust(): boolean {
    return this.tag === Tag.Just
  }

  map<B>(f: (value: A) => B): Maybe<B> {
    switch (this.tag) {
      case Tag.Nothing:
        return this as Maybe<any>
      case Tag.Just:
        return Maybe.Just(f(this.value))
    }
  }

  ap<B>(mf: Maybe<(value: A) => B>): Maybe<B> {
    switch (this.tag) {
      case Tag.Nothing:
        return this as Maybe<any>
      case Tag.Just:
        return mf.map((f) => f(this.value))
    }
  }

  chain<B>(f: (value: A) => Maybe<B>): Maybe<B> {
    switch (this.tag) {
      case Tag.Nothing:
        return this as Maybe<any>
      case Tag.Just:
        return f(this.value)
    }
  }

  fold<T>(patterns: Patterns<A, T>): T {
    switch (this.tag) {
      case Tag.Nothing:
        return patterns.Nothing()
      case Tag.Just:
        return patterns.Just(this.value)
    }
  }

  filter(pred: (value: A) => boolean): Maybe<A> {
    switch (this.tag) {
      case Tag.Nothing:
        return this
      case Tag.Just:
        return pred(this.value) ? this : Nothing()
    }
  }

  reject(pred: (value: A) => boolean): Maybe<A> {
    switch (this.tag) {
      case Tag.Nothing:
        return this
      case Tag.Just:
        return pred(this.value) ? Nothing() : this
    }
  }

  orElse(fallback: Maybe<A>): Maybe<A> {
    switch (this.tag) {
      case Tag.Nothing:
        return fallback
      case Tag.Just:
        return this
    }
  }

  get(): A {
    switch (this.tag) {
      case Tag.Nothing:
        throw new TypeError(`Can't extract any value from ${this.tag}`)
      case Tag.Just:
        return this.value
    }
  }

  getOrElse(value: A): A {
    switch (this.tag) {
      case Tag.Nothing:
        return value
      case Tag.Just:
        return this.value
    }
  }
}

export const {
  of,
  empty,
  Nothing,
  Just,
  fromNullable,
  isNothing,
  isJust,
  all,
  map,
  ap,
  chain,
  fold,
  get,
  getOrElse,
} = Maybe
