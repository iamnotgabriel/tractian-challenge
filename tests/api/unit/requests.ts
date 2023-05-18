import { type CreateUnitDTO, type Unit } from '@/domain/unit/entity'
import { type Express } from 'express'
import request from 'supertest'

export async function createUnit (app: Express, payload: CreateUnitDTO): Promise<Unit> {
  const { body } = await request(app).post('/api/v1/units').send(payload).expect(201)

  return body
}

export async function readUnit<T= Unit> (app: Express, id: string, status: number = 200): Promise<T> {
  const { body } = await request(app).get(`/api/v1/units/${id}`).expect(status)
  return body
}

export async function deleteUnit (app: Express, id: string): Promise<void> {
  await request(app).delete(`/api/v1/units/${id}`).send().expect(204)
}
