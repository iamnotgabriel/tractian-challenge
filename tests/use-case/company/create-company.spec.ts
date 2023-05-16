import { CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { companyRepository } from "./stubs";
import { expectToBeOk } from "../../result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError } from "@/domain/errors";
import crypto from 'crypto';


describe('use-case/create-company', () => {
    companyRepository.save.mockImplementation(async (company) => (toOk({
        ...company,
        id: crypto.randomUUID(),
        createdAt: new Date()
    })));
    const companyDTO = {
        name: 'Big Tech Company',
        document: '94919521000190'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case creates new company', async () => {
        const useCase  = new CreateCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.handle(companyDTO);
        const entity = expectToBeOk(result);

        expect(entity).toHaveProperty('id');
    });

    test('use case fails to create new company when name is empty', async () => {
        const useCase  = new CreateCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.handle({...companyDTO, name:''}) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(400);
    });

    test('use case fails when a error occurs', async () => {
        companyRepository.save.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
        
        const useCase  = new CreateCompanyUseCaseImpl(companyRepository);
        
        const result = await useCase.handle(companyDTO) as Result.Err;
        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR);
    });

});