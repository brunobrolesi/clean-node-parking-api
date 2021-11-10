import { ParkingLotModel } from '../../domain/models/parking-lot-model'

export interface DbLoadParkingLotByEmailRepository {
  loadByEmail: (email: string) => Promise<ParkingLotModel>
}
