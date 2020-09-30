import {HttpErrorResponse} from '@angular/common/http';
import {Component}         from '@angular/core';
import {AppError}          from '../../../../Classes/AppError';
import {ErrorFormatter}    from '../../ErrorFormatter';

@Component({
    templateUrl: './HttpErrorFormatterComponent.html',
    styleUrls:   ['./HttpErrorFormatterComponent.css'],
})
export class HttpErrorFormatterComponent extends ErrorFormatter {
    /**
     * @protected
     */
    public status: number | null = null;

    public setError(error: AppError): void {
        super.setError(error);

        this.status = this.error instanceof HttpErrorResponse
            ? this.error.status
            : null;
    }
}
