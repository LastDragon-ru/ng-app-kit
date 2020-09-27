import {HttpErrorResponse}       from '@angular/common/http';
import {Component}               from '@angular/core';
import {AppError}                from 'projects/core/src/lib/Classes/AppError';
import {ErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';

@Component({
    templateUrl: './HttpErrorFormatterComponent.html',
    styleUrls:   ['./HttpErrorFormatterComponent.css'],
})
export class HttpErrorFormatterComponent implements ErrorFormatterComponent {
    public error!: AppError;

    /**
     * @protected
     */
    public get status(): number | null {
        return this.error instanceof HttpErrorResponse
            ? this.error.status
            : null;
    }
}
