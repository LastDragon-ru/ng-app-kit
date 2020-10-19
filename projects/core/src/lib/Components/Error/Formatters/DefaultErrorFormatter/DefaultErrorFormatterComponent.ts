import {Component}               from '@angular/core';
import {AppError}                from '../../../../Types/AppError';
import {isString}                from '../../../../Utils/isString';
import {ErrorFormatterComponent} from '../ErrorFormatterComponent';

@Component({
    templateUrl: './DefaultErrorFormatterComponent.html',
    styleUrls:   ['./DefaultErrorFormatterComponent.css'],
})
export class DefaultErrorFormatterComponent extends ErrorFormatterComponent {
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
