import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { Hasher } from '../../protocols/cryptography/hasher'
import { AddParkingLotRepository } from '../../protocols/db/add-parking-lot-repository'
import { LoadParkingLotByEmailRepository } from '../../protocols/db/load-parking-lot-by-email-repository'
import { DbAddParkingLot } from './db-add-parking-lot'

const makeLoadParkingLotByEmailRepository = (): LoadParkingLotByEmailRepository => {
  class LoadParkingLotByEmailRepositoryStub implements LoadParkingLotByEmailRepository {
    async loadByEmail (email: string): Promise<ParkingLotModel> {
      return await new Promise(resolve => resolve(null))
    }
  }

  return new LoadParkingLotByEmailRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    hash (password: string): string {
      return 'hashed_password'
    }
  }

  return new HasherStub()
}

const makeAddParkingLotRepository = (): AddParkingLotRepository => {
  class AddParkingLotRepositoryStub implements AddParkingLotRepository {
    async add (parkingLotData: AddParkingLotModel): Promise<ParkingLotModel> {
      return await new Promise(resolve => resolve(makeFakeParkingLotModel()))
    }
  }

  return new AddParkingLotRepositoryStub()
}

interface SutTypes {
  sut: DbAddParkingLot
  loadParkingLotByEmailRepositoryStub: LoadParkingLotByEmailRepository
  hasherStub: Hasher
  addParkingLotRepositoryStub: AddParkingLotRepository
}

const makeSut = (): SutTypes => {
  const loadParkingLotByEmailRepositoryStub = makeLoadParkingLotByEmailRepository()
  const hasherStub = makeHasher()
  const addParkingLotRepositoryStub = makeAddParkingLotRepository()
  const sut = new DbAddParkingLot(loadParkingLotByEmailRepositoryStub, hasherStub, addParkingLotRepositoryStub)
  return {
    sut,
    loadParkingLotByEmailRepositoryStub,
    hasherStub,
    addParkingLotRepositoryStub
  }
}

const makeFakeParkingLotData = (): AddParkingLotModel => ({
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  cnpj: 'any_cnpj',
  address: 'any_address',
  phone: 'any_phone',
  carCapacity: 20,
  motorcycleCapacity: 20
})

const makeFakeParkingLotModel = (): ParkingLotModel => ({
  id: 'any_id',
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  cnpj: 'any_cnpj',
  address: 'any_address',
  phone: 'any_phone',
  carCapacity: 20,
  motorcycleCapacity: 20
})

describe('DbAddParkingLot UseCase', () => {
  it('Should call LoadParkingLotByEmailRepository with correct email', async () => {
    const { sut, loadParkingLotByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadParkingLotByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeParkingLotData())
    expect(loadByEmailSpy).toHaveBeenCalledWith(makeFakeParkingLotData().email)
  })

  it('Should return null if LoadParkingLotByEmailRepository returns a parking lot', async () => {
    const { sut, loadParkingLotByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadParkingLotByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(makeFakeParkingLotModel())
    const parking = await sut.add(makeFakeParkingLotData())
    expect(parking).toBeNull()
  })

  it('Should throw if LoadParkingLotByEmailRepository throws', async () => {
    const { sut, loadParkingLotByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadParkingLotByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeParkingLotData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeParkingLotData())
    expect(hashSpy).toHaveBeenCalledWith(makeFakeParkingLotData().password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeFakeParkingLotData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddParkingLotRepository with correct values', async () => {
    const { sut, addParkingLotRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addParkingLotRepositoryStub, 'add')
    await sut.add(makeFakeParkingLotData())
    expect(addSpy).toHaveBeenCalledWith({ ...makeFakeParkingLotData(), password: 'hashed_password' })
  })

  it('Should throw if AddParkingLotRepository throws', async () => {
    const { sut, addParkingLotRepositoryStub } = makeSut()
    jest.spyOn(addParkingLotRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeParkingLotData())
    await expect(promise).rejects.toThrow()
  })
})
