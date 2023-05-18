import { type StatusCode } from './status-code'
import { type ErrorCodes } from '@/domain/errors'

export type HttpResponse<T= any> = {
  status: StatusCode | ErrorCodes
  body: T
  headers?: Record<string, string>
}
