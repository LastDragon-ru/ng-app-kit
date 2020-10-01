import {Component}       from '@angular/core';
import {
    AppError,
    ErrorFormatter,
    isHashMap,
}                        from '@lastdragon-ru/ng-app-kit-core';
import {ValidationError} from './ValidationError';

@Component({
    templateUrl: './ValidationErrorFormatterComponent.html',
    styleUrls:   ['./ValidationErrorFormatterComponent.css'],
})
export class ValidationErrorFormatterComponent extends ErrorFormatter {
    /**
     * @protected
     */
    public errors: ValidationError | null = null;

    public setError(error: AppError): void {
        super.setError(error);

        if (isHashMap(this.error)) {
            this.errors = <ValidationError> Object.assign({}, this.error);

            // `required` should be shown only if no other errors
            if (Object.keys(this.errors).length > 1 && this.errors.required) {
                delete this.errors.required;
            }
        } else {
            this.errors = null;
        }
    }
}
