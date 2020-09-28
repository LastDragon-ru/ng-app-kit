import {Component, Input}        from '@angular/core';
import {AppError}                from '../../../../Classes/AppError';
import {isString}                from '../../../../Utils/isString';
import {ErrorFormatterComponent} from '../ErrorFormatterComponent';

@Component({
    templateUrl: './DefaultErrorFormatterComponent.html',
    styleUrls:   ['./DefaultErrorFormatterComponent.css'],
})
export class DefaultErrorFormatterComponent implements ErrorFormatterComponent {
    @Input()
    public error!: AppError;

    /**
     * @protected
     */
    public get message(): string | null {
        return isString(this.error) ? this.error : null;
    }
}
