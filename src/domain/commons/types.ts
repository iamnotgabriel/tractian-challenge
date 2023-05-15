export type ValueObject<T> = Omit<T, "id">;
export type UpdateObject<T> = Partial<ValueObject<Omit<T, "createdAt">>>;
export type Entity<T> = T & { id: string };