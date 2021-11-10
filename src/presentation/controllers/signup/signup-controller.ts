import { HttpRequest, HttpResponse, Controller, AddParkingLot, BodyRequestValidator } from './signup-protocols'
import { badRequest, created, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator,
    private readonly addParkingLot: AddParkingLot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.bodyRequestValidator.validate(httpRequest.body)

      if (error) return badRequest(error)

      const parkingLotData: { email, password, name, cnpj, address, phone, carCapacity, motorcycleCapacity } = httpRequest.body

      const parkingLot = await this.addParkingLot.add(parkingLotData)

      return created(parkingLot)
    } catch (error) {
      return serverError()
    }
  }
}
