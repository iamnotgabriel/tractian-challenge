import { CompanyMongoRepository } from "@/data/company/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";

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

    test('company repository saves company and returns entity company', async () => {
        const repository = new CompanyMongoRepository();
        const company: ValueObject<Company> =  {
            name: 'Testing company',
            document: '01234567890',
            createdAt: new Date(),
        };
        const entity = await repository.save(company);
        expect(entity).toMatchObject(company);
        expect(entity).toHaveProperty('id');
    });

    test('company repository saves company and returns entity company', async () => {
        const repository = new CompanyMongoRepository();
        const company: ValueObject<Company> =  {
            name: 'Testing company',
            document: '01234567890',
            createdAt: new Date(),
        };
        const {id} = await repository.save(company);
        const entity = await repository.findOne(id);
    
        expect(entity).toMatchObject(company);
    });
});