import { Identifier } from '#shared_kernel/domain/identifier'

export abstract class DomainEvent {
  protected constructor(
    readonly aggregateId: Identifier,
    readonly occurredAt: Date
  ) {}
}
