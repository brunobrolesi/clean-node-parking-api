import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { DbLoadParkingLotByEmailRepository } from '../../protocols/db-load-parking-lot-by-email'
import { DbAddParkingLot } from './db-add-parking-lot'

const makeLoadParkingLotByEmailRepository = (): DbLoadParkingLotByEmailRepository => {
  class DbLoadParkingLotByEmailRepositoryStub implements DbLoadParkingLotByEmailRepository {
    async loadByEmail (email: string): Promise<ParkingLotModel> {
      return await new Promise(resolve => resolve(null))
    }
  }

  return new DbLoadParkingLotByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAddParkingLot
  loadParkingLotByEmailRepositoryStub: DbLoadParkingLotByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadParkingLotByEmailRepositoryStub = makeLoadParkingLotByEmailRepository()
  const sut = new DbAddParkingLot(loadParkingLotByEmailRepositoryStub)
  return {
    sut,
    loadParkingLotByEmailRepositoryStub
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
})
