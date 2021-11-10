import { BodyRequestValidator } from '../../protocols/body-request-validator'
import { SignUpController } from './signup-controller'

describe('SignUp Controller', () => {
  it('Should call BodyRequestValidator with correct values', async () => {
    class SignUpBodyRequestValidatorStub implements BodyRequestValidator {
      validate (body: object): Error|null {
        return null
      }
    }
    const bodyValidator = new SignUpBodyRequestValidatorStub()
    const sut = new SignUpController(bodyValidator)
    const validatorSpy = jest.spyOn(bodyValidator, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
        address: 'any_address',
        phone: 'any_phone',
        carCapacity: 20,
        motorcycleCapacity: 20
      }
    }
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
