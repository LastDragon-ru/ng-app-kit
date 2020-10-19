import {AppError} from '../../../Types/AppError';

export abstract class ErrorFormatterComponent {
    protected error: AppError | null = null;

    public setError(error: AppError): void {
        this.error = error;
    }
}
