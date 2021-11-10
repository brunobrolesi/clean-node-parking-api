import { AddParkingLot } from '../../../domain/usecases/add-parking-lot'
import { badRequest, serverError } from '../../helpers/http-helper'
import { BodyRequestValidator } from '../../protocols/body-request-validator-protocol'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest, HttpResponse } from '../../protocols/http-protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly bodyRequestValidator: BodyRequestValidator,
    private readonly addParkingLot: AddParkingLot
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.bodyRequestValidator.validate(httpRequest.body)

      if (error) return badRequest(error)

      const parkingLotData: { name, cnpj, address, phone, carCapacity, motorcycleCapacity } = httpRequest.body

      await this.addParkingLot.add(parkingLotData)

      return {
        statusCode: 200
      }
    } catch (error) {
      return serverError()
    }
  }
}
