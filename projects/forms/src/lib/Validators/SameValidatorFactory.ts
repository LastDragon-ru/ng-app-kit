import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isString}                     from '@lastdragon-ru/ng-app-kit-core';

export type SameValidatorError = {
    kitFormsSame: boolean,
};

export const SameValidatorFactory = (control: AbstractControl | string | null,
                                     confirmation: AbstractControl | string | null): ValidatorFn => {
    return (group: AbstractControl): null => {
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
                const error: SameValidatorError = {
                    [name]: true,
                };

                confirmation.setErrors(Object.assign({}, confirmation.errors, error));
            }
        }

        return null;
    };
};
