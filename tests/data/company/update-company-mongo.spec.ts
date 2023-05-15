import { CompanyMongoRepository } from "@/data/company/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";
import { expectToBeOk } from "../../result";
import { Result } from "@/use-case/commons";

describe('data/company/company-mongo-repository', () => {
    beforeAll(async () => {
        await MongoClientSingleton.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoClientSingleton.disconnect();
    });

    afterEach(async () => {
        await MongoClientSingleton.getCollection('companies').deleteMany();
    });

    test('update saved company by id', async () => {
        const repository = new CompanyMongoRepository();
        const company: ValueObject<Company> =  {
            name: 'Testing company',
            document: '01234567890',
            createdAt: new Date(),
        };
        const patch = {
            name: 'Other company',
        };
        const {id} = expectToBeOk(await repository.save(company));
        expectToBeOk(await repository.update({id, patch}));
        const entity = expectToBeOk(await repository.find(id)); 
    
        expect(entity).toMatchObject({...company, ...patch });
    });

    test('returns null when entity does not exist', async () => {
        const repository = new CompanyMongoRepository();
        const id = "64628225f5b6a1023af42e91"
        const patch = {};
        
        const result  = await repository.update({id, patch}) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(404);
    });
});