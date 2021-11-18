import Joi from 'joi'
import { BodyRequestValidator } from '../../presentation/protocols'

export class SignUpBodyValidator implements BodyRequestValidator {
  validate (body: object): Error {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
      name: Joi.string().min(5).max(80).required(),
      doc: Joi.string().regex(/([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})/).message('provide a valid cnpj in the format: xx.xxx.xxx/xxxx-xx').required(),
      address: Joi.string().min(5).max(150).required(),
      phone: Joi.string().regex(/\(\d{2,}\) \d{4,}-\d{4}/).message('provide a valid phone in the format: (xx) xxxxx-xxxx').required(),
      carCapacity: Joi.number().positive().integer().required(),
      motorcycleCapacity: Joi.number().positive().integer().required()
    })

    const { error } = schema.validate(body)

    if (error) return new Error(error.message)

    return null
  }
}
