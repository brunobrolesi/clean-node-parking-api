import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignUpController } from '../../factories/signup-controller'

const router = Router()

router.post('/api/signup', adaptRoute(makeSignUpController()))

export default router
