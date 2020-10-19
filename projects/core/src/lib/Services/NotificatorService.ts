import {AppError} from '../Types/AppError';
import {Template} from '../Types/Template';

export abstract class NotificatorService {
    public abstract success<T>(message?: Template<T> | null): void;

    public abstract error<T>(error?: Template<T> | AppError | null): void;
}
