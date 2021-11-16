import { Prisma, PrismaClient } from '@prisma/client'
import { AddParkingLotRepository } from '../../../data/protocols/db/add-parking-lot-repository'
import { LoadParkingLotByEmailRepository } from '../../../data/protocols/db/load-parking-lot-by-email-repository'
import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'

export class PostgreSqlParkingLotRepository implements AddParkingLotRepository, LoadParkingLotByEmailRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async add (parkingLotData: AddParkingLotModel): Promise<ParkingLotModel> {
    const { carCapacity, motorcycleCapacity, ...data } = parkingLotData
    const parkingLotInput: Prisma.ParkingLotCreateInput = {
      ...data,
      status: {
        create: {
          carCapacity,
          motorcycleCapacity
        }
      }
    }
    return await this.prisma.parkingLot.create({ data: parkingLotInput })
  }

  async loadByEmail (email: string): Promise<ParkingLotModel> {
    return await this.prisma.parkingLot.findUnique({ where: { email } })
  }
}
