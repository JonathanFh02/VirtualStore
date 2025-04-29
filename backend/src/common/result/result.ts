export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: string,
  ) {}

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, undefined, error);
  }
}
