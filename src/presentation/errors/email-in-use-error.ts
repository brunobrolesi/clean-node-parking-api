export class EmailInUseError extends Error {
  constructor () {
    super('email already registered')
    this.name = 'EmailInUseError'
  }
}
