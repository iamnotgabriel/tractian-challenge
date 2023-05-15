import { CompanyMongoRepository } from "@/data/company/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";
import { expectToBeOk } from "../../result";

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

    test('find save company by id', async () => {
        const repository = new CompanyMongoRepository();
        const company: ValueObject<Company> =  {
            name: 'Testing company',
            document: '01234567890',
            createdAt: new Date(),
        };
        const {id} = expectToBeOk(await repository.save(company));
        const entity = expectToBeOk(await repository.find(id));
    
        expect(entity).toMatchObject(company);
    });

    test('returns null when entity does not exist', async () => {
        const repository = new CompanyMongoRepository();
        const company: ValueObject<Company> =  {
            name: 'Testing company',
            document: '01234567890',
            createdAt: new Date(),
        };
        const entity = expectToBeOk(await repository.find("64628225f5b6a1023af42e91"));

        expect(entity).toBeNull();
    });
});