import { Prisma, PrismaClient } from '@prisma/client'
import { prismaMock } from '../../../../singleton'
import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
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

const makeFakeParkingLotModel = (): ParkingLotModel => ({
  id: 'any_id',
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  cnpj: 'any_cnpj',
  address: 'any_address',
  phone: 'any_phone'
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
  describe('add', () => {
    it('Should call prisma client parking lot creation with correct values', async () => {
      const { sut, prisma } = makeSut()
      const createSpy = jest.spyOn(prisma.parkingLot, 'create')
      await sut.add(makeFakeParkingLotData())
      expect(createSpy).toHaveBeenCalledWith({ data: makeFakeParkingLotCreateInputData() })
    })

    it('Should throw if parking lot creation throws', async () => {
      const { sut, prisma } = makeSut()
      jest.spyOn(prisma.parkingLot, 'create').mockRejectedValueOnce(new Error())
      const promise = sut.add(makeFakeParkingLotData())
      await expect(promise).rejects.toThrow()
    })

    it('Should returns an parking lot on parking lot creation success', async () => {
      const { sut, prisma } = makeSut()
      jest.spyOn(prisma.parkingLot, 'create').mockResolvedValueOnce(makeFakeParkingLotModel())
      const parkingLot = await sut.add(makeFakeParkingLotData())
      expect(parkingLot).toEqual(makeFakeParkingLotModel())
    })
  })
  describe('loadByEmail', () => {
    it('Should call prisma client with correct email', async () => {
      const { sut, prisma } = makeSut()
      const findSpy = jest.spyOn(prisma.parkingLot, 'findUnique')
      await sut.loadByEmail('any_email')
      expect(findSpy).toHaveBeenCalledWith({ where: { email: 'any_email' } })
    })

    it('Should throw if findUnique throws', async () => {
      const { sut, prisma } = makeSut()
      jest.spyOn(prisma.parkingLot, 'findUnique').mockRejectedValueOnce(new Error())
      const promise = sut.loadByEmail('any_email')
      await expect(promise).rejects.toThrow()
    })

    it('Should returns an parking lot on success', async () => {
      const { sut, prisma } = makeSut()
      jest.spyOn(prisma.parkingLot, 'findUnique').mockResolvedValueOnce(makeFakeParkingLotModel())
      const parkingLot = await sut.loadByEmail('any_email')
      expect(parkingLot).toEqual(makeFakeParkingLotModel())
    })

    it('Should returns null if not found parking lot', async () => {
      const { sut, prisma } = makeSut()
      jest.spyOn(prisma.parkingLot, 'findUnique').mockResolvedValueOnce(null)
      const parkingLot = await sut.loadByEmail('any_email')
      expect(parkingLot).toBeNull()
    })
  })
})
