import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import { InternalError } from "@/domain/errors";

describe('api/company/delete', () => {
    let app: Express;

    beforeAll(() => {
        const webApi = TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("deletes company", async () => {
        const company = {
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            document: '09876543210',
            createdAt: new Date()
        }
        TestApplication.context.deleteCompanyUseCase.handle.mockResolvedValueOnce(toOk(null));
        await request(app).delete('/api/v1/companies/'+ company.id).send().expect(204);
    });

    test("fails with internal error", async () => {
        const company = {
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            document: '09876543210',
            createdAt: new Date()
        }
        TestApplication.context.deleteCompanyUseCase
            .handle.mockResolvedValueOnce(new InternalError(new Error('test')).toResult());
        const {body: res} = await request(app).delete('/api/v1/companies/'+ company.id).send().expect(500);

        expect(res).toEqual({
            errorCode: 500,
            message: 'Internal Error'
        });
    });
});
