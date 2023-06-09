import { AssetMongoRepository } from '@/data/asset/repository'
import { CompanyMongoRepository } from '@/data/company/repository'
import { UnitMongoRepository } from '@/data/unit/repository'
import { UserMongoRepository } from '@/data/user/repository'

export type DataContext = Readonly<ReturnType<typeof loadContext>>

let dataContext: DataContext

export function getDataContext (): DataContext {
  if (dataContext === undefined) {
    dataContext = Object.freeze(loadContext())
  }

  return dataContext
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function loadContext () {
  const companyRepository = new CompanyMongoRepository()
  const userRepository = new UserMongoRepository()
  const unitRepository = new UnitMongoRepository()
  const assetRepository = new AssetMongoRepository()

  return {
    companyRepository,
    userRepository,
    unitRepository,
    assetRepository
  }
}
