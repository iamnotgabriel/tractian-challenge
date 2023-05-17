import { CreateUnitUseCaseImpl }  from "@/use-case/unit/create-unit";
import { getTestContext } from "@/tests/main/context";
import { unitRepository } from "./stubs";
import { expectToBeOk } from "@/tests/result";
import { toOk } from "@/use-case/commons";
import { CreateUnitDTO } from "@/domain/unit/entity";
import { NotFoundError } from "@/domain/errors";

import crypto from "crypto";

describe('use-case/unit/create-unit', ()=> {
    const { readCompanyUseCase } = getTestContext();

    function useCase() {
        return new CreateUnitUseCaseImpl(unitRepository, readCompanyUseCase);
    }
    const unitDTO: CreateUnitDTO = {
        name: 'Jaguar Unit',
        companyId: '6464c895e24c88514543aeca',
    };

    beforeEach(() => jest.clearAllMocks());

    test('creates new unit', async () => {
        unitRepository.save.mockImplementation(async (unit) => (toOk({
            ...unit,
            id: crypto.randomUUID(),
        })));    
        readCompanyUseCase.handle.mockResolvedValueOnce(toOk(null));

        const result = await useCase().handle(unitDTO);
        const entity = expectToBeOk(result);

        expect(entity).toHaveProperty('id');
        expect(readCompanyUseCase.handle).toBeCalledTimes(1);
        expect(unitRepository.save).toBeCalledTimes(1);
    });

    test('fails to create unit when company does no exist', async () => {
        unitRepository.save.mockImplementation(async (unit) => (toOk({
            ...unit,
            id: crypto.randomUUID(),
        })));    
        readCompanyUseCase.handle
            .mockResolvedValueOnce(new NotFoundError('Company', {id: unitDTO.companyId}).toResult());

        const result = await useCase().handle(unitDTO);

        expect(result.ok).toBeFalsy();
        expect(readCompanyUseCase.handle).toBeCalledTimes(1);
        expect(unitRepository.save).toBeCalledTimes(0);
    });

    test('fails to create unit when dto is invalid', async () => {
        const result = await useCase().handle({
            ...unitDTO,
            name: ''
        });

        expect(result.ok).toBeFalsy();
        expect(readCompanyUseCase.handle).toBeCalledTimes(0);
        expect(unitRepository.save).toBeCalledTimes(0);
    });
});