import { type ReadUseCase, ReadUseCaseImpl } from '@/use-case/commons/use-case/read'
import { getDataContext } from './data'
import { type CreateCompanyUseCase, CreateCompanyUseCaseImpl } from '@/use-case/company/create-company'
import { type UpdateCompanyUseCase, UpdateCompanyUseCaseImpl } from '@/use-case/company/update-company'
import { type Company } from '@/domain/company/entity'
import { type DeleteUseCase, DeleteUseCaseImpl } from '@/use-case/commons/use-case/delete'
import { type ListUseCase, ListUseCaseImpl } from '@/use-case/commons/use-case/list'
import { type CreateUserUseCase, CreateUserUseCaseImpl } from '@/use-case/user/create-user'
import { type User } from '@/domain/user/entity'
import { type UpdateUserUseCase, UpdateUserUseCaseImpl } from '@/use-case/user/update-user'
import { type CreateUnitUseCase, CreateUnitUseCaseImpl } from '@/use-case/unit/create-unit'
import { type Unit } from '@/domain/unit/entity'
import { type UpdateUnitUseCase, UpdateUnitUseCaseImpl } from '@/use-case/unit/update-unit'
import { type CreateAssetUseCase, CreateAssetUseCaseImpl } from '@/use-case/asset/create-asset'
import { type Asset } from '@/domain/asset/entity'
import { type UpdateAssetUseCase, UpdateAssetUseCaseImpl } from '@/use-case/asset/update-asset'

export type ApplicationContext = Readonly<ReturnType<typeof loadContext>>

let context: ApplicationContext

export function getContext () {
  if (context == undefined) {
    context = Object.freeze(loadContext())
  }

  return context
}

function loadContext () {
  const dataContext = getDataContext()
  const createCompanyUseCase: CreateCompanyUseCase =
        new CreateCompanyUseCaseImpl(dataContext.companyRepository)
  const readCompanyUseCase: ReadUseCase<Company> =
        new ReadUseCaseImpl('Company', dataContext.companyRepository)
  const updateCompanyUseCase: UpdateCompanyUseCase =
        new UpdateCompanyUseCaseImpl(dataContext.companyRepository)
  const deleteCompanyUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Company', dataContext.companyRepository)
  const listCompanyUseCase: ListUseCase<Company> =
        new ListUseCaseImpl(dataContext.companyRepository)

  const createUserUseCase: CreateUserUseCase =
        new CreateUserUseCaseImpl(readCompanyUseCase, dataContext.userRepository)
  const readUserUseCase: ReadUseCase<User> =
        new ReadUseCaseImpl('User', dataContext.userRepository)
  const updateUserUseCase: UpdateUserUseCase =
        new UpdateUserUseCaseImpl(dataContext.userRepository)
  const deleteUserUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('User', dataContext.userRepository)
  const listUserUseCase: ListUseCase<User> =
        new ListUseCaseImpl(dataContext.userRepository)

  const createUnitUseCase: CreateUnitUseCase =
        new CreateUnitUseCaseImpl(dataContext.unitRepository, readCompanyUseCase)
  const readUnitUseCase: ReadUseCase<Unit> =
        new ReadUseCaseImpl('Unit', dataContext.unitRepository)
  const updateUnitUseCase: UpdateUnitUseCase =
        new UpdateUnitUseCaseImpl(dataContext.unitRepository)
  const deleteUnitUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Unit', dataContext.unitRepository)
  const listUnitUseCase: ListUseCase<Unit> =
        new ListUseCaseImpl(dataContext.unitRepository)

  const createAssetUseCase: CreateAssetUseCase =
        new CreateAssetUseCaseImpl(
          dataContext.assetRepository,
          readUnitUseCase,
          readUserUseCase
        )
  const readAssetUseCase: ReadUseCase<Asset> =
        new ReadUseCaseImpl('Asset', dataContext.assetRepository)
  const updateAssetUseCase: UpdateAssetUseCase =
        new UpdateAssetUseCaseImpl(dataContext.assetRepository, readUnitUseCase, readUserUseCase)
  const deleteAssetUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Asset', dataContext.assetRepository)
  const listAssetUseCase: ListUseCase<Asset> =
        new ListUseCaseImpl(dataContext.assetRepository)

  return {
    createCompanyUseCase,
    readCompanyUseCase,
    deleteCompanyUseCase,
    updateCompanyUseCase,
    listCompanyUseCase,
    createUserUseCase,
    readUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    listUserUseCase,
    createUnitUseCase,
    readUnitUseCase,
    updateUnitUseCase,
    deleteUnitUseCase,
    listUnitUseCase,
    createAssetUseCase,
    readAssetUseCase,
    updateAssetUseCase,
    deleteAssetUseCase,
    listAssetUseCase
  }
}
