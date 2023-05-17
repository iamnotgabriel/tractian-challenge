import { CreateUnitDTO, Unit } from "@/domain/unit/entity";
import { Express } from "express";
import request from "supertest";

export async function createUnit(app: Express, body: CreateUnitDTO): Promise<Unit> {
    const { body: res } = await request(app).post('/api/v1/units').send(body).expect(201);

    return res
}

export async function readUnit(app: Express, id: string, status: number = 200) {
    const { body:res } = await request(app).get(`/api/v1/units/${id}`).expect(status);

    return res;
}