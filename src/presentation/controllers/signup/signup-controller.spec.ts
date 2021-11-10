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

interface SutTypes {
  sut: SignUpController
  bodyValidator: BodyRequestValidator
}

const makeSut = (): SutTypes => {
  const bodyValidator = makeBodyRequestValidator()
  const sut = new SignUpController(bodyValidator)

  return {
    sut,
    bodyValidator
  }
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
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
    const { sut, bodyValidator } = makeSut()
    const validatorSpy = jest.spyOn(bodyValidator, 'validate')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
