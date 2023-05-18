import { type Result, toOk } from '@/use-case/commons'
import { type HttpResponse } from '../http/http-response'
import { type UseCase } from '@/use-case/commons/use-case'
import { StatusCode } from '../http/status-code'

export class UpdateRoute<T, R> {
  constructor (private readonly useCase: UseCase<T, R>) {}

  async handle (request: T): Promise<Result<HttpResponse<R>>> {
    const result = await this.useCase.handle(request)

    if (!result.ok) {
      return result
    }

    return toOk({
      status: StatusCode.OK,
      body: result.value
    })
  }
}
