import { BodyRequestValidator } from '../../protocols/body-request-validator'
import { httpRequest, httpResponse } from '../../protocols/http-protocol'

export class SignUpController {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    this.bodyRequestValidator.validate(httpRequest.body)

    return {
      statusCode: 200
    }
  }
}
