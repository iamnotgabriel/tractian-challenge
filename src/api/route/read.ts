import { type Result, toOk } from '@/use-case/commons'
import { type HttpResponse } from '../http/http-response'
import { type ReadUseCase } from '@/use-case/commons/use-case/read'
import { StatusCode } from '../http/status-code'

export class ReadRoute<T> {
  constructor (private readonly useCase: ReadUseCase<T>) {}

  async handle (id: string): Promise<Result<HttpResponse<T>>> {
    const result = await this.useCase.handle(id)

    if (result.ok === false) {
      return result
    }

    return toOk({
      status: StatusCode.OK,
      body: result.value
    })
  }
}
