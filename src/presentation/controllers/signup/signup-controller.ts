import { BodyRequestValidator } from '../../protocols/body-request-validator-protocol'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.bodyRequestValidator.validate(httpRequest.body)

    if (error) return { statusCode: 400, body: { error: error.message } }

    return {
      statusCode: 200
    }
  }
}
