import { Identifier } from '#shared_kernel/domain/identifier'
import { Entity } from '#shared_kernel/domain/entity'
import { DomainEvent } from '#shared_kernel/domain/domain_event'

export abstract class AggregateRoot<
  TProperties extends { id: Identifier },
> extends Entity<TProperties> {
  #domainEvents: DomainEvent[] = []

  protected constructor(props: TProperties) {
    super(props)
  }

  protected addDomainEvent(event: DomainEvent) {
    this.#domainEvents.push(event)
  }
}
