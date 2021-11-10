import { ParkingLotModel } from '../../../domain/models/parking-lot-model'

export interface LoadParkingLotByEmailRepository {
  loadByEmail: (email: string) => Promise<ParkingLotModel>
}
