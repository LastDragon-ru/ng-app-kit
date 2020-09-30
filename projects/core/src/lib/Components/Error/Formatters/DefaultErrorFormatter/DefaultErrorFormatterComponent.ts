import {Component}      from '@angular/core';
import {AppError}       from '../../../../Classes/AppError';
import {isString}       from '../../../../Utils/isString';
import {ErrorFormatter} from '../../ErrorFormatter';

@Component({
    templateUrl: './DefaultErrorFormatterComponent.html',
    styleUrls:   ['./DefaultErrorFormatterComponent.css'],
})
export class DefaultErrorFormatterComponent extends ErrorFormatter {
    /**
     * @protected
     */
    public message: string | null = null;

    public setError(error: AppError): void {
        super.setError(error);

        this.message = isString(this.error)
            ? this.error
            : null;
    }
}
