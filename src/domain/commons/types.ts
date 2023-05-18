import { type Result, toOk } from '@/use-case/commons'
import { ValidationError } from '../errors'
import Joi from 'joi'

export type ValueObject<T> = Omit<T, 'id'>
export type UpdateObject<T> = Partial<ValueObject<Omit<T, 'createdAt'>>>
export type Entity<T> = T & { id: string, createdAt: Date }

export class Page<T> {
  constructor (
    public readonly total: number,
    public readonly data: T[]
  ) {}

  static of<T>(total: number, data: T[]): Page<T> {
    return new Page(total, data)
  }
};

export class PageRequest {
  static readonly schema = Joi.object({
    limit: Joi.number().default(10).min(1).max(100),
    skip: Joi.number().default(0).min(0),
    sort: Joi.string()
      .optional()
      .default('id')
  }).options({ allowUnknown: true })

  constructor (
    public readonly limit: number,
    public readonly skip: number,
    public readonly sort: string,
    public readonly filters?: Record<string, string>
  ) {}

  static from (request: Record<string, any>): Result<PageRequest> {
    const { error, value } = PageRequest.schema.validate(request)
    if (error) {
      return new ValidationError(error.details).toResult()
    }
    const { limit, skip, sort, ...filters } = value

    return toOk(new PageRequest(limit, skip, sort, filters))
  }
}
