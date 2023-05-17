import { CompanyMongoRepository } from "@/data/company/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { PageRequest, ValueObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";
import { expectToBeOk } from "../../result";

describe('data/company/company-mongo-repository', () => {
    beforeAll(async () => {
        await MongoClientSingleton.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoClientSingleton.disconnect();
    });

    beforeEach(async () => {
        await MongoClientSingleton.getCollection('companies').deleteMany();
    });

    test('list saved companies by id', async () => {
        const repository = new CompanyMongoRepository();
        const company: (name: string) => ValueObject<Company> = (name) => ({
            name,
            document: '01234567890',
            createdAt: new Date(),
        });

        expectToBeOk(await repository.save(company('1')));
        const {id: secondId} = expectToBeOk(await repository.save(company('2')));
        expectToBeOk(await repository.save(company('3')));

        const entities = expectToBeOk(await repository.list(new PageRequest(1, 1, "createdAt")));
        const total = expectToBeOk(await repository.count());

        expect(entities).toHaveLength(1);
        expect(entities[0].id).toEqual(secondId);
        expect(total).toEqual(3);
    });

    test('returns empty list when collection is empty', async () => {
        const repository = new CompanyMongoRepository();
        const entities = expectToBeOk(await repository.list(new PageRequest(10, 10, "id")));
        const total = expectToBeOk(await repository.count());

        expect(entities).toHaveLength(0);
        expect(total).toEqual(0);
    });
});