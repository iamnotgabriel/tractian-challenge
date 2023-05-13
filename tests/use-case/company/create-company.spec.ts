import { CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { saveCompanyRepositoryStub } from "./stubs";
import { expectToBeOk } from "../../result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import crypto from 'crypto';


describe('use-case/create-company', () => {
    saveCompanyRepositoryStub.save.mockImplementation(async (company) => (toOk({
        ...company,
        id: crypto.randomUUID(),
    })));
    const companyDTO = {
        name: 'Big Tech Company',
        document: '94919521000190'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case creates new company', async () => {
        const useCase  = new CreateCompanyUseCaseImpl(saveCompanyRepositoryStub);
        
        const result = await useCase.create(companyDTO);
        const entity = expectToBeOk(result);

        expect(entity).toHaveProperty('id');
    });

    test('use case fails when a error occurs', async () => {
        saveCompanyRepositoryStub.save.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new CreateCompanyUseCaseImpl(saveCompanyRepositoryStub);
        
        const result = await useCase.create(companyDTO) as Result.Err;
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });

});