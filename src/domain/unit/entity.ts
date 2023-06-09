import Joi from 'joi'
import { type Entity, PageRequest, type UpdateObject, type ValueObject } from '../commons/types'
import { validationSchema } from '../validation'
import { type Result, toOk } from '@/use-case/commons'
import { ValidationError } from '../errors'

export type CreateUnitDTO = {
  name: string
  companyId: string
}

export type Unit = Entity<CreateUnitDTO>

const unitSchema = validationSchema<CreateUnitDTO>({
  name: Joi.string().min(1).max(32).required(),
  companyId: Joi.string().required()
})

export function createUnit (dto: CreateUnitDTO): Result<ValueObject<Unit>> {
  const { error, value } = unitSchema.validate(dto)
  if (error) {
    return new ValidationError(error.details).toResult()
  }
  const unit = value as CreateUnitDTO
  return toOk({
    ...unit,
    createdAt: new Date()
  })
}

export function updateUnit (unit: Unit, patch: UpdateObject<Unit>): Result<Unit> {
  if (patch.companyId && unit.companyId !== patch.companyId) {
    return new ValidationError({ value: patch,message: 'unit.companyId is an immutable field' }).toResult()
  }
  const patchedUnit = Object.assign(unit, patch)
  const { error, value } = unitSchema.validate(patchedUnit)
  if (error) {
    return new ValidationError(error.details).toResult()
  }

  return toOk(Object.assign(unit, value))
}

export class UnitPageRequest extends PageRequest {
  static readonly filterSchema = PageRequest.schema.keys({
    name: Joi.string().min(1).max(32),
    companyId: Joi.string(),
    createdAt: Joi.date()
  })

  static from (request: Record<string, any>): Result<PageRequest> {
    const { error, value } = UnitPageRequest.filterSchema.validate(request)
    if (error) {
      console.log(request)
      return new ValidationError(error.details).toResult()
    }

    return super.from(value)
  }
}
