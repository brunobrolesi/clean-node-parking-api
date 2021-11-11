import { ParkingLotModel, AddParkingLot, AddParkingLotModel, Hasher, AddParkingLotRepository, LoadParkingLotByEmailRepository } from './db-add-parking-lot-protocols'
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

    return await this.addParkingLotRepository.add({ ...parkingLotData, password: hashedPassword })
  }
}
