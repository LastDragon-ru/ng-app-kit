import {Component}               from '@angular/core';
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
    public get message(): string | null {
        return isString(this.error) ? this.error : null;
    }
}
