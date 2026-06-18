export class ApiError extends Error {
    constructor( message, status, code, details) {
        super(message);
        this.status = status;
        this.code = code ?? undefined;
        this.details = details ?? undefined;
        this.name = 'ApiError';
    }
}