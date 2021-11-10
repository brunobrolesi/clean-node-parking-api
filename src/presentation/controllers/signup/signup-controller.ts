import { BodyRequestValidator } from '../../protocols/body-request-validator-protocol'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.bodyRequestValidator.validate(httpRequest.body)

    return {
      statusCode: 200
    }
  }
}
