import {Component, Input}        from '@angular/core';
import {Error}                   from 'projects/core/src/lib/Components/Error/Error';
import {ErrorFormatterComponent} from 'projects/core/src/lib/Components/Error/Formatters/ErrorFormatterComponent';
import {isString}                from 'projects/core/src/lib/Utils/isString';

@Component({
    templateUrl: './DefaultErrorFormatterComponent.html',
    styleUrls:   ['./DefaultErrorFormatterComponent.css'],
})
export class DefaultErrorFormatterComponent implements ErrorFormatterComponent {
    @Input()
    public error!: Error;

    /**
     * @protected
     */
    public get message(): string | null {
        return isString(this.error) ? this.error : null;
    }
}
