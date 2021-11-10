import { ParkingLotModel } from '../models/parking-lot-model'

export interface AddParkingLotModel {
  name: string
  cnpj: string
  address: string
  phone: string
  carCapacity: number
  motorcycleCapacity: number
}

export interface AddParkingLot {
  add: (parkingLotData: AddParkingLotModel) => Promise<ParkingLotModel>
}
