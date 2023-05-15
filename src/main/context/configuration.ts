export type Configuration = Readonly<typeof configuration>;

export let configuration = Object.freeze({
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/db",
    serverPort: Number(process.env.SERVER_PORT) || 8080,
    httpLogging: process.env.HTTP_LOGGING == "true" || true as boolean,
    logging: process.env.LOGGING == "true" || true as boolean
});

// WARING: test only
export function setConfiguration(_configuration: Configuration) {
    configuration = _configuration;
}