import { companyRepository } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import { ReadCompanyUseCaseImpl } from "@/use-case/company/read-company";
import crypto from 'crypto';


describe('use-case/read-company', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('finds company', async () => {
        companyRepository.find.mockImplementationOnce(async (id) => (toOk({
            id: id,
            name: 'Big Tech Company',
            document: '94919521000190',
            createdAt: new Date(), 
        })));
        const useCase  = new ReadCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.find(crypto.randomUUID());
        const entity = expectToBeOk(result);
        expect(entity).toHaveProperty('id');
    });

    test('fails when a error occurs', async () => {
        companyRepository.find.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new ReadCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.find(crypto.randomUUID()) as Result.Err;
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });

    test('returns value null when company is not found ', async () => {
        companyRepository.find.mockResolvedValueOnce(toOk(null));
        
        const useCase  = new ReadCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.find(crypto.randomUUID()) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(404);
    });
});
