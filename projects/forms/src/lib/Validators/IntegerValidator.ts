import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {
    isEmpty,
    isNumber,
    isObject,
}                                                       from '@lastdragon-ru/ng-app-kit-core';

export const IntegerValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!isObject(control.value) && isEmpty(control.value)) {
        return null;
    }

    if (isNumber(control.value) && /^-?([0-9]+)$/.test(control.value.toString())) {
        return null;
    }

    return {
        kitFormsInteger: {
            actual: control.value,
        },
    };
};
