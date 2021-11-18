import { PrismaClient } from '@prisma/client'
import { DbAddParkingLot } from '../../data/usecases/add-parking-lot/db-add-parking-lot'
import { BcryptAdapter } from '../../infra/cryptograpy/hasher/bcrypt-adapter'
import { PostgreSqlParkingLotRepository } from '../../infra/db/postgre-sql/postgre-sql-parking-lot-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup-controller'
import { SignUpBodyValidator } from '../../validation/signup/signup-body-validator'

export const makeSignUpController = (): SignUpController => {
  const prisma = new PrismaClient()
  const parkingLotRepository = new PostgreSqlParkingLotRepository(prisma)
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addParking = new DbAddParkingLot(parkingLotRepository, hasher, parkingLotRepository)
  const bodyRequestValidator = new SignUpBodyValidator()
  return new SignUpController(bodyRequestValidator, addParking)
}
