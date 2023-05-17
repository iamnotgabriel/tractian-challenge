import { ObjectId } from "mongodb";

export function randomId(): string {
    return new ObjectId().toHexString(); 
}