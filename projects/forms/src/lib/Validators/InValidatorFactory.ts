import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {
    isEmpty,
    isObject,
}                                                       from '@lastdragon-ru/ng-app-kit-core';

export const InValidatorFactory = (values: any[]): ValidatorFn => { // tslint:disable-line:no-any
    return (control: AbstractControl): ValidationErrors | null => {
        if (!isObject(control.value) && isEmpty(control.value)) {
            return null;
        }

        if (values.includes(control.value)) {
            return null;
        }

        return {
            kitFormsIn: {
                actual: control.value,
                values: values,
            },
        };
    };
};
