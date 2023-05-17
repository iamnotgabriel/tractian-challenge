import { UserMongoRepository } from "@/data/user/repository";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { ValueObject } from "@/domain/commons/types";
import { expectToBeOk } from "../../result";
import { Result } from "@/use-case/commons";
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

    test('update saved user by id', async () => {
        const repository = new UserMongoRepository();
        const user: ValueObject<User> =  {
            name: 'Testing company',
            email: '01234567890',
            companyId: '64628225f5b6a1023af42e91',
            createdAt: new Date(),
        };
        const patch = {
            name: 'Other company',
        };
        const {id} = expectToBeOk(await repository.save(user));
        expectToBeOk(await repository.update({id, patch}));
        const entity = expectToBeOk(await repository.find(id)); 
    
        expect(entity).toMatchObject({...user, ...patch });
    });

    test('returns null when entity does not exist', async () => {
        const repository = new UserMongoRepository();
        const id = "64628225f5b6a1023af42e91"
        const patch = {};
        
        const result  = await repository.update({id, patch}) as Result.Err;

        expect(result.ok).toBeFalsy();
        expect(result.error.errorCode).toBe(404);
    });
});