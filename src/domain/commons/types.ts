export type ValueObject<T> = Omit<T, "id">;
export type Entity<T> = T & { id: string };