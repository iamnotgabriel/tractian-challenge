import { TestApplication } from "@/tests/main/test-application";
import { Express } from "express";
import { getContext } from "@/resources/context/application";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { createAsset, readAsset } from "./requests";
import request from "supertest";

describe('api/asset/delete', () => {
    let app: Express;

    beforeAll(async () => {
        const webApi = await TestApplication.create(getContext);
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    beforeEach(async () => {
        await MongoClientSingleton.getCollection('units').deleteMany({});
        await MongoClientSingleton.getCollection('companies').deleteMany({});
        await MongoClientSingleton.getCollection('assets').deleteMany({});
        await MongoClientSingleton.getCollection('users').deleteMany({});
    });

    test("delete asset", async () => {
        const asset = await createAsset(app, { name: 'This will be deleted'});
        await request(app).delete('/api/v1/assets/'+ asset.id).expect(204);
        const res = await readAsset(app, asset.id, 404);
        expect(res).toMatchObject({
            errorCode: 404,
            message: 'Asset Not Found',
            details: {
                id: asset.id
            }
        });
    });

});
