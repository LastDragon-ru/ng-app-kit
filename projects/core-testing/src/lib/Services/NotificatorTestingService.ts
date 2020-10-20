import {
    AppError,
    NotificatorService,
    Severity,
    Template,
} from '@lastdragon-ru/ng-app-kit-core';

export class NotificatorTestingService extends NotificatorService {
    public error<T>(error?: Template<T> | AppError | null, severity?: Severity | null): void {
        // empty
    }

    public success<T>(message?: Template<T> | null): void {
        // empty
    }
}
