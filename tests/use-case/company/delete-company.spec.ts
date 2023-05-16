import { companyRepository } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import { DeleteUseCaseImpl } from "@/use-case/commons/use-case/delete";

import crypto from 'crypto';


describe('use-case/delete-company', () => {
    function useCase () {
        return new DeleteUseCaseImpl('Company', companyRepository);
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case deletes company when company exists', async () => {
        companyRepository.delete.mockResolvedValueOnce(toOk(null));
        
        const result = await useCase().handle(crypto.randomUUID());
        expectToBeOk(result);

    });

    test('use case fails when a error occurs', async () => {
        companyRepository.delete
            .mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const result = await useCase().handle(crypto.randomUUID()) as Result.Err;
    
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });
});
