import { type Result, toOk } from '@/use-case/commons'
import { Page, type PageRequest } from '@/domain/commons/types'
import { type ListRepository } from '../plugins'
import { type UseCase } from '.'

export type ListUseCase<T> = UseCase<PageRequest, Page<T>>

export class ListUseCaseImpl<T> implements ListUseCase<T> {
  constructor (private readonly repository: ListRepository<T>) {}

  async handle (request: PageRequest): Promise<Result<Page<T>>> {
    const [total, list] = await Promise.all([
      this.repository.count(request.filters),
      this.repository.list(request)
    ])
    if (total.ok === false) {
      return total
    }
    if (list.ok === false) {
      return list
    }

    return toOk(Page.of(total.value, list.value))
  }
}
