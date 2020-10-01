import {AbstractControl}  from '@angular/forms';
import {ValidationErrors} from '../Classes/ValidationErrors';

/**
 * Updates control errors.
 */
export function setFormControlErrors(
    control: AbstractControl,
    errors: ValidationErrors,
    touch: boolean = false,
): void {
    control.setErrors(Object.assign({}, control.errors || {}, errors), {
        emitEvent: true,
    });

    if (touch) {
        control.markAsDirty();
        control.markAsTouched();
    }
}
