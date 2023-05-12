import { CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { saveCompanyRepositoryStub } from "./stubs";
import crypto from 'crypto';


describe('use-case/create-company', () => {
    saveCompanyRepositoryStub.save.mockImplementation(async (company) => ({
        ...company,
        id: crypto.randomUUID(),
    }));
    const companyDTO = {
        name: 'Big Tech Company',
        document: '94919521000190'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('use case creates new company', async () => {
        const useCase  = new CreateCompanyUseCaseImpl(saveCompanyRepositoryStub);
        
        const entity = await useCase.create(companyDTO);

        expect(entity).not.toBeNull();
        expect(entity).toHaveProperty('id');
    });

    test('use case fails when a error occurs', async () => {
        saveCompanyRepositoryStub.save.mockRejectedValueOnce(new Error('Bad Entry'))
        const useCase  = new CreateCompanyUseCaseImpl(saveCompanyRepositoryStub);
        expect.assertions(1);
        useCase.create(companyDTO).catch((error: Error)  => {
            expect(error.message).toBe('Bad Entry');
        });
    });

});