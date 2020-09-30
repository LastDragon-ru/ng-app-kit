import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isBoolean, isEmpty, isObject} from '@lastdragon-ru/ng-app-kit-core';

export type BooleanValidatorError = {
    kitFormsBoolean: {
        actual: any, // tslint:disable-line:no-any
    }
};

export const BooleanValidator: ValidatorFn = (control: AbstractControl): BooleanValidatorError | null => {
    if (!isObject(control.value) && isEmpty(control.value)) {
        return null;
    }

    if (isBoolean(control.value)) {
        return null;
    }

    return {
        kitFormsBoolean: {
            actual: control.value,
        },
    };
};
