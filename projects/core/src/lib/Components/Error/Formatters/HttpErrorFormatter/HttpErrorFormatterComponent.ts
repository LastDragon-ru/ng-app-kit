import {HttpErrorResponse}       from '@angular/common/http';
import {Component}               from '@angular/core';
import {AppError}                from '../../../../Classes/AppError';
import {ErrorFormatterComponent} from '../ErrorFormatterComponent';

@Component({
    templateUrl: './HttpErrorFormatterComponent.html',
    styleUrls:   ['./HttpErrorFormatterComponent.css'],
})
export class HttpErrorFormatterComponent extends ErrorFormatterComponent {
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
