import { TestApplication } from "@/tests/main/test-application";
import { Express } from "express";
import { getContext } from "@/resources/context/application";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { createAsset, readAsset } from "./requests";
import request from "supertest";

describe('api/asset/update', () => {
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

    test("update asset", async () => {
        const asset = await createAsset(app, { name: 'This will be updated'});
        await request(app).patch('/api/v1/assets/'+ asset.id)
            .send({healthLevel: asset.healthLevel + 10 })
            .expect(200);
        const res = await readAsset(app, asset.id, 200);
        expect(res).toMatchObject({
            healthLevel: asset.healthLevel + 10
        });
    });

});
