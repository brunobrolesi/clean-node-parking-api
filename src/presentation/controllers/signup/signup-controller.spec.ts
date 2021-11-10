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

  it('Should returns 400 and error message if BodyRequestValidator returns an error', async () => {
    const { sut, bodyValidator } = makeSut()
    jest.spyOn(bodyValidator, 'validate').mockReturnValueOnce(new Error('missing field'))
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe('missing field')
  })
})
