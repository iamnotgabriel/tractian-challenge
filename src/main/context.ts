export abstract class Context<T> {
    constructor(properties: Interface<T>) {
        for(const [key, value] of Object.entries(properties)) {
            this[key] = value;
        }
    }
}


export type Interface<Class> = {
    [key in keyof Class]: Class[key];
};
