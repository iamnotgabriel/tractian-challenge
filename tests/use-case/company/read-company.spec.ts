import { readCompanyUseCaseStub, saveCompanyRepositoryStub } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import { ReadCompanyUseCaseImpl } from "@/use-case/company/read-company";
import crypto from 'crypto';


describe('use-case/read-company', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case creates new company', async () => {
        readCompanyUseCaseStub.find.mockImplementationOnce(async (id) => (toOk({
            id: id,
            name: 'Big Tech Company',
            document: '94919521000190',
            createdAt: new Date(), 
        })));
        const useCase  = new ReadCompanyUseCaseImpl(readCompanyUseCaseStub);
        
        const result = await useCase.find(crypto.randomUUID());
        const entity = expectToBeOk(result);
        expect(entity).toHaveProperty('id');
    });

    test('use case fails when a error occurs', async () => {
        readCompanyUseCaseStub.find.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new ReadCompanyUseCaseImpl(readCompanyUseCaseStub);
        
        const result = await useCase.find(crypto.randomUUID()) as Result.Err;
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });

    test('use case returns value null when id is not found', async () => {
        readCompanyUseCaseStub.find.mockResolvedValueOnce(toOk(null));
        
        const useCase  = new ReadCompanyUseCaseImpl(readCompanyUseCaseStub);
        
        const result = await useCase.find(crypto.randomUUID()) as Result.Err;
        const entity = expectToBeOk(result);

        expect(entity).toBeNull();
    });
});
