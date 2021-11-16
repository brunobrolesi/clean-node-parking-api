import { Prisma, PrismaClient } from '@prisma/client'
import { prismaMock } from '../../../../singleton'
import { AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { PostgreSqlParkingLotRepository } from './postgre-sql-parking-lot-repository'

interface SutTypes {
  sut: PostgreSqlParkingLotRepository
  prisma: PrismaClient
}

const makeSut = (): SutTypes => {
  const prisma = prismaMock as unknown as PrismaClient
  const sut = new PostgreSqlParkingLotRepository(prisma)
  return {
    sut,
    prisma
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

const makeFakeParkingLotCreateInputData = (): Prisma.ParkingLotCreateInput => {
  const { carCapacity, motorcycleCapacity, ...data } = makeFakeParkingLotData()
  const parkingLot: Prisma.ParkingLotCreateInput = {
    ...data,
    status: {
      create: {
        carCapacity,
        motorcycleCapacity
      }
    }
  }
  return parkingLot
}

describe('PostgreSqlParkingLot Repository', () => {
  it('Should call prisma client parking lot creation with correct vales', async () => {
    const { sut, prisma } = makeSut()
    const createSpy = jest.spyOn(prisma.parkingLot, 'create')
    await sut.add(makeFakeParkingLotData())
    expect(createSpy).toHaveBeenCalledWith({ data: makeFakeParkingLotCreateInputData() })
  })
})
