


export type Configuration = Readonly<typeof configuration>;
export const configuration = Object.freeze({
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/db",
    serverPort: Number(process.env.SERVER_PORT) || 8080,
});



