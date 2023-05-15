export type Configuration = Readonly<typeof configuration>;

function env(variable: string, defaultValue: string): string {
    return process.env[variable] ?? defaultValue 
}

export let configuration = Object.freeze({
    mongoUrl: env("MONGO_URL", "mongodb://localhost:27017/db"),
    serverPort: Number(env("SERVER_PORT", "8080")),
    httpLogging: env("HTTP_LOGGING", "true") == "true",
    silenceLogging: env("SILENCE_LOGGING", "false") == "true"
});
