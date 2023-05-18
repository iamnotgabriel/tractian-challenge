import { expectToBeOk } from '@/tests/result'
import { updateUser } from '@/domain/user/entity'
import { user } from '@/tests/use-case/user/stubs'
import { randomId } from '@/tests/commons'
import { type Result } from '@/use-case/commons'

describe('domain/user', () => {
  test('update user fails when patch contains a different companyId', () => {
    expectToBeOk(updateUser(user, { companyId: user.companyId }))
    expectToBeOk(updateUser(user, {}))
    const result = updateUser(user, { companyId: randomId() }) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(400)
  })
})
