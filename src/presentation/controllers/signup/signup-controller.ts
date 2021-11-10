import { AddParkingLot } from '../../../domain/usecases/add-parking-lot'
import { BodyRequestValidator } from '../../protocols/body-request-validator-protocol'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator,
    private readonly addParkingLot: AddParkingLot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.bodyRequestValidator.validate(httpRequest.body)

    if (error) return { statusCode: 400, body: { error: error.message } }

    const parkingLotData: { name, cnpj, address, phone, carCapacity, motorcycleCapacity } = httpRequest.body

    await this.addParkingLot.add(parkingLotData)

    return {
      statusCode: 200
    }
  }
}
