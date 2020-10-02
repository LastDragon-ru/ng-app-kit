import {AppError} from '../Classes/AppError';
import {Template} from '../Classes/Template';

export abstract class NotificatorService {
    public abstract success<T>(message?: Template<T> | null): void;

    public abstract error<T>(error?: Template<T> | AppError | null): void;
}
