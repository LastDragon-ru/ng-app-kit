import {AppError} from '../../Classes/AppError';

export abstract class ErrorFormatter {
    protected error: AppError | null = null;

    public setError(error: AppError): void {
        this.error = error;
    }
}
