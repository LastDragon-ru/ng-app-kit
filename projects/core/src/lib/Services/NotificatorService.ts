import {Injectable} from '@angular/core';
import {Error}      from 'projects/core/src/lib/Classes/AppError';

@Injectable({
    providedIn: 'root',
})
export class NotificatorService {
    public constructor() {
        // empty
    }

    // <editor-fold desc="API">
    // =========================================================================
    public success(message?: string): void {
        console.log(message);
    }

    public error(error?: Error | null): void {
        if (error === false) {
            return;
        }

        console.error(error);
    }

    // </editor-fold>
}
