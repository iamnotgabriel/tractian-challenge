import { companyRepository } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import crypto from 'crypto';
import { DeleteCompanyUseCaseImpl } from "@/use-case/company/delete-company";


describe('use-case/delete-company', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case deletes company when company exists', async () => {
        companyRepository.delete.mockResolvedValueOnce(toOk(null));
        const useCase  = new DeleteCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.handle(crypto.randomUUID());
        expectToBeOk(result);

    });

    test('use case fails when a error occurs', async () => {
        companyRepository.delete
            .mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new DeleteCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.handle(crypto.randomUUID()) as Result.Err;
    
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });
});
