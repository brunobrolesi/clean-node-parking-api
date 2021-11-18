import { Express } from 'express'
import signupRouter from '../routes/signup/signup-routes'

export default (app: Express): void => {
  app.use(signupRouter)
}
