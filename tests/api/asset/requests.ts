import { type Asset, type AssetStatus, type CreateAssetDTO } from '@/domain/asset/entity'
import { type Express } from 'express'
import request from 'supertest'
import { createCompany } from '../company/requests'
import { createUser } from '../user/requests'
import { createUnit } from '../unit/requests'

export async function createAsset (app: Express, dto: Partial<CreateAssetDTO>): Promise<Asset> {
  const { id: companyId } = await createCompany(app)
  const { id: assigneeId } = await createUser(app, {
    name: 'Emerson',
    email: 'emerson@supremosfreios.com',
    companyId
  })
  const { id: unitId } = await createUnit(app, {
    name: 'API Testing company',
    companyId
  })
  const asset = {
    image: 'http://image.com/path/to/image.webp',
    name: 'Powerful Motor',
    description: 'A good motor',
    model: 'fiat uno',
    assigneeId,
    status: 'Running' as AssetStatus,
    healthLevel: 50,
    unitId,
    ...dto
  }
  return createAssetOnly(app, asset)
}
export async function createAssetOnly (app: Express, dto: CreateAssetDTO): Promise<Asset> {
  const { body } = await request(app).post('/api/v1/assets').send(dto).expect(201)

  return body
}

export async function readAsset<T = Asset> (app: Express, id: string, status: number = 200): Promise<T> {
  const { body } = await request(app).get('/api/v1/assets/' + id).expect(status)

  return body
}
