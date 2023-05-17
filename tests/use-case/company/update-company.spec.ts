import { companyRepository } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { Result, toOk } from "@/use-case/commons";
import { ErrorCodes, InternalError, NotFoundError } from "@/domain/errors";
import { UpdateCompanyUseCaseImpl } from "@/use-case/company/update-company";
import { getTestContext } from "@/tests/main/context";


describe('use-case/update-company', () => {
    const testContext = getTestContext();
    const company = {
        id: "64628225f5b6a1023af42e91",
        name: 'Big Tech Company',
        document: '94919521000190',
        createdAt: new Date(), 
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('update company', async () => {
        companyRepository.update.mockImplementationOnce(async (_) => (toOk(null)));
        companyRepository.find.mockImplementationOnce(async (_) => (toOk(company)));
        const useCase = new UpdateCompanyUseCaseImpl(
            companyRepository
        );
        const request =  {
            id: company.id,
            patch: {
                name: 'Small town company',
            }
        };
        const result = await useCase.handle(request);
        const entity = expectToBeOk(result);
        expect(entity.id).toBe(request.id);
        expect(entity).toMatchObject(request.patch);
    });

    test('fails when user is not found', async () => {
        const request =  {
            id: "64628225f5b6a1023af42e91",
            patch: {
                name: 'Small town company',
            }
        };
        companyRepository.find
            .mockImplementationOnce(async (_) => 
                new NotFoundError('User', {id: company.id}).toResult()
            );
        const useCase = new UpdateCompanyUseCaseImpl(
            companyRepository
        );
        const result = await useCase.handle(request) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.NOT_FOUND);
        expect(companyRepository.update).not.toBeCalled();
    });

    test('fails when patch is invalid', async () => {
        const request =  {
            id: "64628225f5b6a1023af42e91",
            patch: {
                name: '',
            }
        };
        companyRepository.find.mockImplementationOnce(async (_) => (toOk(company)));
        const useCase = new UpdateCompanyUseCaseImpl(
            companyRepository
        );

        const result = await useCase.handle(request) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(ErrorCodes.VALIDATION_ERROR);
        expect(companyRepository.update).not.toBeCalled();
    });

    test('fails when a error occurs', async () => {
        const request =  {
            id: "64628225f5b6a1023af42e91",
            patch: {
                name: 'Small town company',
            }
        };
        companyRepository.find.mockImplementationOnce(async (_) => (toOk(company)));

        companyRepository.update.mockResolvedValueOnce(new InternalError(new Error('message')).toResult())
        
        const useCase = new UpdateCompanyUseCaseImpl(
            companyRepository,
        );
        const result = await useCase.handle(request) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(500);
    });
});
