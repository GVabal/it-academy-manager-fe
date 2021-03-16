export interface CustomError extends Error{
   error:
    {code: string;
    error: string;
    message: string;
    timestamp: string;
    };
}
