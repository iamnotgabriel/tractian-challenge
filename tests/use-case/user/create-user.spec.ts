import { userRepository } from "./stubs";
import { expectToBeOk } from "../../result";
import { toOk } from "@/use-case/commons";
import { CreateUserUseCaseImpl } from "@/use-case/user/create-user";

import crypto from 'crypto';
import { getTestContext } from "@/tests/main/context";


describe('use-case/create-user', () => {
    const testContext = getTestContext();

    function useCase () {
        return new CreateUserUseCaseImpl(testContext.readCompanyUseCase, userRepository);
    }

    userRepository.save.mockImplementation(async (user) => (toOk({
        ...user,
        id: crypto.randomUUID(),
    })));
    testContext.readCompanyUseCase.handle.mockResolvedValueOnce(toOk(null))

    const userDTO = {
        name: 'Test user',
        email: 'user@email.com',
        companyId: crypto.randomUUID(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('creates new user', async () => {
        const result = await useCase().handle(userDTO);
        const entity = expectToBeOk(result);

        expect(entity).toHaveProperty('id');
        expect(testContext.readCompanyUseCase.handle).toBeCalledTimes(1);
        expect(userRepository.save).toBeCalledTimes(1);
    });

});