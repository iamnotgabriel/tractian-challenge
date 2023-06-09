import Joi from 'joi'
import { type Entity, type UpdateObject, type ValueObject } from '../commons/types'
import { validationSchema } from '../validation'
import { type Result, toOk } from '@/use-case/commons'
import { ValidationError } from '../errors'

export type CreateUserDTO = {
  name: string
  email: string
  companyId: string
}

export type User = Entity<CreateUserDTO>

const userSchema = validationSchema<CreateUserDTO>({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  companyId: Joi.string().required()
})

export function createUser (dto: CreateUserDTO): Result<ValueObject<User>> {
  const { error, value } = userSchema.validate(dto)

  if (error) {
    return new ValidationError(error.details).toResult()
  }

  return toOk({
    ...value,
    createdAt: new Date()
  })
}

export function updateUser (user: User, patch: UpdateObject<User>): Result<User> {
  if (patch.companyId && user.companyId !== patch.companyId) {
    return new ValidationError({ value: patch,message: 'user.companyId is an immutable field' }).toResult()
  }
  const patchedUser = Object.assign(user, patch)
  const { error, value } = userSchema.validate(patchedUser)
  if (error) {
    return new ValidationError(error.details).toResult()
  }

  return toOk(Object.assign(user, value))
}
