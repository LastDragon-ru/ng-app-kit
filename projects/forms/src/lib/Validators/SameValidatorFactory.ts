import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isString}                                       from '@lastdragon-ru/ng-app-kit-core';

export const SameValidatorFactory = (control: AbstractControl | string | null,
                                     confirmation: AbstractControl | string | null): ValidatorFn => {
    return (group: AbstractControl): ValidationErrors | null => {
        // Prepare
        control      = isString(control) ? group.get(control) : control;
        confirmation = isString(confirmation) ? group.get(confirmation) : confirmation;

        // Check
        const name = 'kitFormsSame';

        if (control && confirmation && control.value === confirmation.value) {
            let errors = confirmation.errors;

            if (errors) {
                delete errors[name];
            }

            if (errors && Object.keys(errors).length === 0) {
                errors = null;
            }

            confirmation.setErrors(errors);
        } else {
            if (confirmation) {
                confirmation.setErrors(Object.assign({}, confirmation.errors, {
                    [name]: true,
                }));
            }
        }

        return null;
    };
};
