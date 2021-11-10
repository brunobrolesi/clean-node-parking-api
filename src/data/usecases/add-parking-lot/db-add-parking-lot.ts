import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLot, AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'
import { Hasher } from '../../protocols/cryptography/hasher'
import { AddParkingLotRepository } from '../../protocols/db/add-parking-lot-repository'
import { LoadParkingLotByEmailRepository } from '../../protocols/db/load-parking-lot-by-email-repository'

export class DbAddParkingLot implements AddParkingLot {
  constructor (
    private readonly loadParkingLotByEmailRepository: LoadParkingLotByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addParkingLotRepository: AddParkingLotRepository
  ) {}

  async add (parkingLotData: AddParkingLotModel): Promise<ParkingLotModel> {
    const hasAccount = await this.loadParkingLotByEmailRepository.loadByEmail(parkingLotData.email)

    if (hasAccount) return null

    const hashedPassword = this.hasher.hash(parkingLotData.password)

    await this.addParkingLotRepository.add({ ...parkingLotData, password: hashedPassword })
  }
}
