import { CreateUserDTO, User } from "@/domain/user/entity";
import { Express } from "express";
import request from "supertest";

export async function createUser(app: Express, dto: CreateUserDTO): Promise<User> {
    const {body} = await request(app)
        .post('/api/v1/users')
        .send(dto)
        .expect(201);

    return body;
}