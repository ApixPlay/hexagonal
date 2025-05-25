import { ValueObject } from '#shared_kernel/domain/value_object'

export class Email extends ValueObject<{ value: string }> {
  static fromString(value: string): Email {
    return new Email({ value })
  }
}
