import {HttpErrorResponse}       from '@angular/common/http';
import {Component}               from '@angular/core';
import {ErrorFormatterComponent} from '../ErrorFormatterComponent';

@Component({
    templateUrl: './HttpErrorFormatterComponent.html',
    styleUrls:   ['./HttpErrorFormatterComponent.css'],
})
export class HttpErrorFormatterComponent extends ErrorFormatterComponent {
    /**
     * @protected
     */
    public get status(): number | null {
        return this.error instanceof HttpErrorResponse
            ? this.error.status
            : null;
    }
}
