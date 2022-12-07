/**
 * Create errors specific to http exceptions
 */
class HttpException extends Error {
    public status: number;
    public message: string;

    /**
     * HttpException class constructor.
     * * status - 400 | 500 | ...
     * * message - Not Found | ...
     */
    constructor(status: number, message: string) {
        super(message);

        this.status = status;
        this.message = message;
    }
}

export { HttpException };
