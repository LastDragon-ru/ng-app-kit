import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isEmpty, isNumber, isObject}  from '@lastdragon-ru/ng-app-kit-core';

export type FloatValidatorError = {
    kitFormsFloat: {
        actual: any, // tslint:disable-line:no-any
    }
};

export const FloatValidator: ValidatorFn = (control: AbstractControl): FloatValidatorError | null => {
    if (!isObject(control.value) && isEmpty(control.value)) {
        return null;
    }

    if (isNumber(control.value) && /^-?([0-9]+\.[0-9]+)$/.test(control.value.toString())) {
        return null;
    }

    return {
        kitFormsFloat: {
            actual: control.value,
        },
    };
};

