import { UserMongoRepository } from "@/data/user/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { expectToBeOk } from "../../result";
import { User } from "@/domain/user/entity";

describe('data/company/user-mongo-repository', () => {
    beforeAll(async () => {
        await MongoClientSingleton.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoClientSingleton.disconnect();
    });

    afterEach(async () => {
        await MongoClientSingleton.getCollection('companies').deleteMany();
    });

    test('find saved user by id', async () => {
        const repository = new UserMongoRepository();
        const user: ValueObject<User> =  {
            name: 'Testing guy',
            email: 'me@test.com',
            companyId: '64628225f5b6a1023af42e91',
            createdAt: new Date(),
        };
        const {id} = expectToBeOk(await repository.save(user));
        const entity = expectToBeOk(await repository.find(id));
    
        expect(entity).toMatchObject(user);
    });

    test('returns null when entity does not exist', async () => {
        const repository = new UserMongoRepository();
        const entity = expectToBeOk(await repository.find("64628225f5b6a1023af42e91"));

        expect(entity).toBeNull();
    });
});