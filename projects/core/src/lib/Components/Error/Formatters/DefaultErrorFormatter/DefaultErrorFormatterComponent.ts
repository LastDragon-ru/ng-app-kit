import {Component}      from '@angular/core';
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
    public get message(): string | null {
        return isString(this.error) ? this.error : null;
    }
}
