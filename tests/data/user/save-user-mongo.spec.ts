import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { expectToBeOk } from "../../result";
import { UserMongoRepository } from "@/data/user/repository";
import { User } from "@/domain/user/entity";

describe('data/user/user-mongo-repository', () => {
    beforeAll(async () => {
        await MongoClientSingleton.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoClientSingleton.disconnect();
    });

    afterEach(async () => {
        await MongoClientSingleton.getCollection('companies').deleteMany();
    });

    test('save user and returns user entity', async () => {
        const repository = new UserMongoRepository();
        const user: ValueObject<User> =  {
            name: 'Testing company',
            email: 'me@email.com',
            companyId: '64628225f5b6a1023af42e91',
            createdAt: new Date(),
        };
        const result = await repository.save(user);

        const entity = expectToBeOk(result);
        expect(entity).toMatchObject(user);
        expect(entity).toHaveProperty('id');
    });
});
