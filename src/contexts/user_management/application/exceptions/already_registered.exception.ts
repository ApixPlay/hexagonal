export class AlreadyRegisteredException extends Error {
  constructor() {
    super('User already registered')

    this.name = 'AlreadyRegisteredException'
  }

  serialize() {
    return {
      name: this.name,
      code: 'E_ALREADY_REGISTERED',
      date: new Date().toISOString(),
      message: this.message,
    }
  }
}
