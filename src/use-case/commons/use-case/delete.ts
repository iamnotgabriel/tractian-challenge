import { type Result } from '@/use-case/commons'
import { type UseCase } from '.'
import { type DeleteByIdRepository } from '../plugins'
import { type Logger } from 'winston'
import { getLogger } from '@/resources/logging'

export type DeleteUseCase = UseCase<string, void>

export class DeleteUseCaseImpl implements DeleteUseCase {
  private readonly logger: Logger

  constructor (
    private readonly entity: string,
    private readonly repository: DeleteByIdRepository
  ) {
    this.logger = getLogger(`Delete${entity}UseCase`)
  }

  async handle (id: string): Promise<Result<void>> {
    const result = await this.repository.delete(id)
    if (result.ok) {
      this.logger.info(`deleted ${this.entity}=${id}`)
    }

    return result
  }
}
