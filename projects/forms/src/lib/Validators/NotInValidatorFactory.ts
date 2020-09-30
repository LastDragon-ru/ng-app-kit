import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isEmpty, isObject}            from '@lastdragon-ru/ng-app-kit-core';

export type NotInValidatorError = {
    kitFormsNotIn: {
        actual: any,   // tslint:disable-line:no-any
        values: any[], // tslint:disable-line:no-any
    }
};

export const NotInValidatorFactory = (values: any[]): ValidatorFn => { // tslint:disable-line:no-any
    return (control: AbstractControl): NotInValidatorError | null => {
        if (!isObject(control.value) && isEmpty(control.value)) {
            return null;
        }

        if (!values.includes(control.value)) {
            return null;
        }

        return {
            kitFormsNotIn: {
                actual: control.value,
                values: values,
            },
        };
    };
};
