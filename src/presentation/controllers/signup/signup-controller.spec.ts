import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLot, AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { BodyRequestValidator } from '../../protocols/body-request-validator-protocol'
import { HttpRequest } from '../../protocols/http-protocol'
import { SignUpController } from './signup-controller'

const makeBodyRequestValidator = (): BodyRequestValidator => {
  class SignUpBodyRequestValidatorStub implements BodyRequestValidator {
    validate (body: object): Error|null {
      return null
    }
  }

  return new SignUpBodyRequestValidatorStub()
}

const makeAddParkingLot = (): AddParkingLot => {
  class AddParkingLotStub implements AddParkingLot {
    async add (parkingLotData: AddParkingLotModel): Promise<ParkingLotModel> {
      const fakeParkingLot = {
        id: 'any_id',
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
        cnpj: 'any_cnpj',
        address: 'any_address',
        phone: 'any_phone',
        carCapacity: 20,
        motorcycleCapacity: 20
      }
      return await new Promise(resolve => resolve(fakeParkingLot))
    }
  }

  return new AddParkingLotStub()
}

interface SutTypes {
  sut: SignUpController
  bodyValidatorStub: BodyRequestValidator
  addParkingLotStub: AddParkingLot
}

const makeSut = (): SutTypes => {
  const bodyValidatorStub = makeBodyRequestValidator()
  const addParkingLotStub = makeAddParkingLot()
  const sut = new SignUpController(bodyValidatorStub, addParkingLotStub)

  return {
    sut,
    bodyValidatorStub,
    addParkingLotStub
  }
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    name: 'any_name',
    cnpj: 'any_cnpj',
    address: 'any_address',
    phone: 'any_phone',
    carCapacity: 20,
    motorcycleCapacity: 20
  }
})

describe('SignUp Controller', () => {
  it('Should call BodyRequestValidator with correct values', async () => {
    const { sut, bodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(bodyValidatorStub, 'validate')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should returns 400 and error message if BodyRequestValidator returns an error', async () => {
    const { sut, bodyValidatorStub } = makeSut()
    jest.spyOn(bodyValidatorStub, 'validate').mockReturnValueOnce(new Error('missing field'))
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe('missing field')
  })

  it('Should call AddParkingLot with correct values', async () => {
    const { sut, addParkingLotStub } = makeSut()
    const addSpy = jest.spyOn(addParkingLotStub, 'add')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should returns 500 and internal server error message if AddParkingLot throws', async () => {
    const { sut, addParkingLotStub } = makeSut()
    jest.spyOn(addParkingLotStub, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe('internal server error')
  })
})
