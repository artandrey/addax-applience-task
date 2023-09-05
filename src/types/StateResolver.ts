export type Setter<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void;

export abstract class Resolver<T> {
  constructor(protected set: Setter<T>) {}
}
