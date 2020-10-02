import {Injectable} from '@angular/core';
import {AppError}   from '../Classes/AppError';
import {Template}   from '../Classes/Template';

@Injectable({
    providedIn: 'root',
})
export class NotificatorService {
    public constructor() {
        // empty
    }

    // <editor-fold desc="API">
    // =========================================================================
    public success<T>(message: Template<T> | null = null): void {
        console.log(message);
    }

    public error<T>(error: Template<T> | AppError | null = null): void {
        if (error === false) {
            return;
        }

        console.error(error);
    }

    // </editor-fold>
}
