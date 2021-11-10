import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    error: new ServerError().message
  }
})

export const created = (data: object): HttpResponse => ({
  statusCode: 201,
  body: {
    data: data
  }
})
