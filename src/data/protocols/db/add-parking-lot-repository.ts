import { ParkingLotModel } from '../../../domain/models/parking-lot-model'
import { AddParkingLotModel } from '../../../domain/usecases/add-parking-lot'

export interface AddParkingLotRepository {
  add: (parkingLotData: AddParkingLotModel) => Promise<ParkingLotModel>
}
