import { createCompany } from '@/domain/company/entity'
import { expectToBeOk } from '../../result'
import { type Result } from '@/use-case/commons'
import { ValidationError } from '@/domain/errors'

describe('domain/company', () => {
  test('createCompany transforms dto with all valid properties', () => {
    const companyDTO = {
      name: 'Small Industry',
      document: '01234567890',
      unknownProperty: 'malicious value'
    }
    const result = createCompany(companyDTO)
    const company = expectToBeOk(result)

    expect(company).toMatchObject({
      name: 'Small Industry',
      document: '01234567890'
    })
    expect(company).not.toHaveProperty('unknownProperty')
  })

  test('createCompany adds createdAt date', () => {
    const companyDTO = {
      name: 'Small Industry',
      document: '01234567890',
      unknownProperty: 'malicious value'
    }
    const result = createCompany(companyDTO)
    const company = expectToBeOk(result)

    expect(company.createdAt).toBeInstanceOf(Date)
  })

  test('createCompany fails when name is empty', () => {
    const companyDTO = {
      name: '',
      document: '01234567890'
    }

    const result = createCompany(companyDTO) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error).toBeInstanceOf(ValidationError)
  })
})
