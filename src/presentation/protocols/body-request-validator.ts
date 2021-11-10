export interface BodyRequestValidator {
  validate: (body: object) => Error|null
}
