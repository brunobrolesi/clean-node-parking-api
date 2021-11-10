import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLot, AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { DbLoadParkingLotByEmailRepository } from '../../protocols/db-load-parking-lot-by-email'

export class DbAddParkingLot implements AddParkingLot {
  constructor (
    private readonly dbLoadParkingLotByEmailRepository: DbLoadParkingLotByEmailRepository
  ) {}

  async add (parkingLotData: AddParkingLotModel): Promise<ParkingLotModel> {
    await this.dbLoadParkingLotByEmailRepository.loadByEmail(parkingLotData.email)
    return null
  }
}
