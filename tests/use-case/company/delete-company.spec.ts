import { deleteCompanyRepositoryStub, readCompanyUseCaseStub, saveCompanyRepositoryStub } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import crypto from 'crypto';
import { DeleteCompanyUseCaseImpl } from "@/use-case/company/delete-company";


describe('use-case/read-company', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case deletes company when company exists', async () => {
        deleteCompanyRepositoryStub.delete.mockResolvedValueOnce(toOk(null));
        const useCase  = new DeleteCompanyUseCaseImpl(deleteCompanyRepositoryStub);
        
        const result = await useCase.delete(crypto.randomUUID());
        expectToBeOk(result);

    });

    test('use case fails when a error occurs', async () => {
        deleteCompanyRepositoryStub.delete
            .mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new DeleteCompanyUseCaseImpl(deleteCompanyRepositoryStub);
        
        const result = await useCase.delete(crypto.randomUUID()) as Result.Err;
    
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });
});
