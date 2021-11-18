import { SignUpBodyValidator } from './signup-body-validator'

const makeSut = (): SignUpBodyValidator => {
  return new SignUpBodyValidator()
}

describe('SignUpBody Validator', () => {
  it('Should return an error if email is not provided', () => {
    const sut = makeSut()
    const body = {
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if email is invalid', () => {
    const sut = makeSut()
    const body = {
      email: 'invalid_email',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if password is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if name is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if doc is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if doc is invalid', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: 'invalid_doc',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if address is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if phone is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if invalid phone is provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: 'invalid_phone',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if carCapacity is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return an error if motorcycleCapacity is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeInstanceOf(Error)
  })

  it('Should return null on successes', () => {
    const sut = makeSut()
    const body = {
      email: 'valid@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '89.435.262/0001-92',
      address: 'valid_address',
      phone: '(99) 9999-9999',
      carCapacity: 10,
      motorcycleCapacity: 10
    }
    const result = sut.validate(body)
    expect(result).toBeNull()
  })
})
