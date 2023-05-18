import { type Company, type CreateCompanyDTO } from '@/domain/company/entity'
import { type Express } from 'express'
import request from 'supertest'

export async function createCompany (app: Express): Promise<Company> {
  const body: CreateCompanyDTO = {
    name: 'Cool company Inc.',
    document: '012345667'
  }
  const { body: res } = await request(app).post('/api/v1/companies').send(body).expect(201)

  return res
}
