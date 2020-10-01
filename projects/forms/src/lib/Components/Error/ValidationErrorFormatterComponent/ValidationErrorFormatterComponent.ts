import {Component}        from '@angular/core';
import {
    AppError,
    ErrorFormatterComponent,
    isHashMap,
}                         from '@lastdragon-ru/ng-app-kit-core';
import {ValidationErrors} from '../../../Classes/ValidationErrors';

@Component({
    templateUrl: './ValidationErrorFormatterComponent.html',
    styleUrls:   ['./ValidationErrorFormatterComponent.css'],
})
export class ValidationErrorFormatterComponent extends ErrorFormatterComponent {
    /**
     * @protected
     */
    public errors: ValidationErrors | null = null;

    public setError(error: AppError): void {
        super.setError(error);

        if (isHashMap(this.error)) {
            this.errors = <ValidationErrors> Object.assign({}, this.error);

            // `required` should be shown only if no other errors
            if (Object.keys(this.errors).length > 1 && this.errors.required) {
                delete this.errors.required;
            }
        } else {
            this.errors = null;
        }
    }
}
