import Joi from 'joi'
import { validationSchema } from '@/domain/validation'
import { type UpdateObject, type ValueObject } from '../commons/types'
import { type Result, toOk } from '@/use-case/commons'
import { ValidationError } from '../errors'

export type CreateCompanyDTO = {
  name: string
  document: string
}

export type Company = CreateCompanyDTO & {
  id: string
  createdAt: Date
}

const companySchema = validationSchema<CreateCompanyDTO>({
  name: Joi.string().min(1).required(),
  document: Joi.string().required()
})

export function createCompany (dto: CreateCompanyDTO): Result<ValueObject<Company>> {
  const { error, value } = companySchema.validate(dto)
  if (error) {
    return new ValidationError(error.details).toResult()
  }
  return toOk({
    ...value,
    createdAt: new Date()
  })
}

export function updateCompany (company: Company, patch: UpdateObject<Company>): Result<Company> {
  const patchedCompany = Object.assign(company, patch)
  const { error, value } = companySchema.validate(patchedCompany)
  if (error) {
    return new ValidationError(error.details).toResult()
  }

  return toOk(Object.assign(company, value))
}
