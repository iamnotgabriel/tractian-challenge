import { TestApplication } from "@/tests/main/test-application";
import { Express } from "express";
import { getContext } from "@/resources/context/application";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { createAsset, createAssetOnly } from "./requests";
import request from "supertest";
import { createUnit } from "../unit/requests";
import { createCompany } from "../company/requests";
import { createUser } from "../user/requests";
import { AssetStatus } from "@/domain/asset/entity";

describe('api/asset/list', () => {
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

    async function createCompanyMarvel() {
        const marvel = await createCompany(app);
        const avengers = await createUnit(app, {
            name: 'avengers',
            companyId: marvel.id
        });
        const antMan = await createUser(app, {
            name: 'Ant Man',
            email: 'man@ant.com',
            companyId: marvel.id,
        });
        return {
            marvel,
            avengers,
            antMan,
        }
    }

    test("list assets", async () => {
        await createAsset(app, { name: 'Asset 1'});
        await createAsset(app, { name: 'Asset 2'});
        await createAsset(app, { name: 'Asset 3'});
        const { body } = await request(app)
            .get('/api/v1/assets')
            .query("sort=name")
            .expect(200);

        expect(body.data).toHaveLength(3);
        expect(body.data[0].name).toEqual('Asset 1');
        expect(body.data[1].name).toEqual('Asset 2');
        expect(body.data[2].name).toEqual('Asset 3');
        expect(body.total).toBe(3);
    });

    test("list assets by company", async () => {
        const {avengers, antMan, marvel} = await createCompanyMarvel();
        await createAssetOnly(app, {
            name: 'Asset 1',
            unitId: avengers.id,
            image: "#",
            description: "first asset",
            model: "hero",
            assigneeId: antMan.id,
            status: 'Running' as AssetStatus,
            healthLevel: 1,
        });
        await createAssetOnly(app, {
            name: 'Asset 2',
            unitId: avengers.id,
            image: "#",
            description: "second asset",
            model: "villain",
            assigneeId: antMan.id,
            status: 'Running' as AssetStatus,
            healthLevel: 10,
        });
        await createAsset(app, { name: 'Asset 3' });
        const { body } = await request(app)
            .get('/api/v1/assets')
            .query("sort=name")
            .query("companyId=" + marvel.id)
            .expect(200);

        expect(body.data).toHaveLength(2);
        expect(body.data[0].name).toEqual('Asset 1');
        expect(body.data[1].name).toEqual('Asset 2');
        expect(body.total).toBe(2);
    });

    test("list assets by unit", async () => {
        const {avengers, antMan, marvel} = await createCompanyMarvel();
        const guardians = await createUnit(app, {
            name: 'guardians of the galaxy',
            companyId: marvel.id,
        });
        await createAssetOnly(app, {
            name: 'Asset 1',
            unitId: avengers.id,
            image: "#",
            description: "first asset",
            model: "hero",
            assigneeId: antMan.id,
            status: 'Running' as AssetStatus,
            healthLevel: 1,
        });
        await createAssetOnly(app, {
            name: 'Asset 2',
            unitId: guardians.id,
            image: "#",
            description: "second asset",
            model: "villain",
            assigneeId: antMan.id,
            status: 'Running' as AssetStatus,
            healthLevel: 10,
        });
        const { body } = await request(app)
            .get('/api/v1/assets')
            .query("sort=name")
            .query("unitId=" + guardians.id)
            .expect(200);

        expect(body.data).toHaveLength(1);
        expect(body.data[0].name).toEqual('Asset 2');
        expect(body.total).toBe(1);
    });
});
