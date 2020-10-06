import {
    AppError,
    NotificatorService,
    Template,
} from '@lastdragon-ru/ng-app-kit-core';

export class NotificatorTestingService extends NotificatorService {
    public error<T>(error?: Template<T> | AppError | null): void {
        // empty
    }

    public success<T>(message?: Template<T> | null): void {
        // empty
    }
}
