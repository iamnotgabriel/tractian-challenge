import { type Result, toOk } from '@/use-case/commons'
import { type DeleteUseCase } from '@/use-case/commons/use-case/delete'
import { type HttpResponse } from '../http/http-response'
import { StatusCode } from '../http/status-code'

export class DeleteRoute {
  constructor (private readonly useCase: DeleteUseCase) {}

  async handle (id: string): Promise<Result<HttpResponse<void>>> {
    const result = await this.useCase.handle(id)

    if (result.ok === false) {
      return result
    }

    return toOk({
      status: StatusCode.NO_CONTENT,
      body: undefined
    })
  }
}
