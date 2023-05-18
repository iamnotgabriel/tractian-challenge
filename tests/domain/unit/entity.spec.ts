import { expectToBeOk } from "@/tests/result";
import { updateUnit } from "@/domain/unit/entity";
import { unit } from "@/tests/use-case/unit/stubs";
import { randomId } from "@/tests/commons";
import { Result } from "@/use-case/commons";

describe('domain/unit', ()=> {

    test('update unit fails when patch contains a different companyId', () => {
        expectToBeOk(updateUnit(unit, {companyId: unit.companyId}));
        expectToBeOk(updateUnit(unit, {}));
        const result = updateUnit(unit, {companyId: randomId()}) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(400);
    });

});