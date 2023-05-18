import { type Result } from '@/use-case/commons'
import { type UseCase } from '.'
import { type UpdateByIdRepository } from '../plugins'
import { type Logger } from 'winston'
import { getLogger } from '@/resources/logging'

export type UpdateUseCase<T> = UseCase<UpdateByIdRepository.Request<T>, void>

export class UpdateUseCaseImpl<T> implements UpdateUseCase<T> {
  private readonly logger: Logger

  constructor (
    private readonly entity: string,
    private readonly repository: UpdateByIdRepository<T>
  ) {
    this.logger = getLogger(`Update${entity}UseCase`)
  }

  async handle (request: UpdateByIdRepository.Request<T>): Promise<Result<void>> {
    const result = await this.repository.update(request)
    if (result.ok) {
      this.logger.info(`updated ${this.entity}=${request.id}`)
    }

    return result
  }
}
