import { type Result, toOk } from '@/use-case/commons'
import { type HttpResponse } from '../http/http-response'
import { type PageRequest } from '@/domain/commons/types'
import { StatusCode } from '../http/status-code'
import { type ListUseCase } from '@/use-case/commons/use-case/list'

export class ListRoute<T> {
  constructor (private readonly useCase: ListUseCase<T>) {}

  async handle (request: Result<PageRequest>): Promise<Result<HttpResponse>> {
    if (!request.ok) {
      return request
    }
    const result = await this.useCase.handle(request.value)
    if (!result.ok) {
      return result
    }

    return toOk({
      status: StatusCode.OK,
      body: result.value
    })
  }
}
