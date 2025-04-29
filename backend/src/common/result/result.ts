export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  readonly isOk: true = true;
  readonly isErr: false = false;
  constructor(readonly value: T) { }
}

export class Err<T, E> {
  readonly isOk: false = false;
  readonly isErr: true = true;
  constructor(readonly error: E) { }
}