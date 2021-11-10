import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http-protocol'

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
