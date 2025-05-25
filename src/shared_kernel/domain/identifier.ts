import { ValueObject } from '#shared_kernel/domain/value_object'
import { v7 as randomUUID } from 'uuid'

export class Identifier extends ValueObject<{ value: string }> {
  protected constructor(props: { value: string }) {
    super(props)
  }

  static generate(): Identifier {
    return new Identifier({ value: randomUUID() })
  }

  static fromString(value: string): Identifier {
    return new Identifier({ value })
  }
}
