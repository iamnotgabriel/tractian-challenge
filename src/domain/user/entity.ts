import { Entity } from "../commons/types";


export type CreateUserDTO = {
    name: string,
    email: string,
    companyId: string,
};

export type User = Entity<CreateUserDTO>;
