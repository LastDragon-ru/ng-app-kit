import {AbstractControl, FormControl}        from '@angular/forms';
import {HashMap}                             from '@lastdragon-ru/ng-app-kit-core';
import {using}                               from '@lastdragon-ru/ng-app-kit-core-testing';
import {FloatValidator, FloatValidatorError} from './FloatValidator';
import {Validators}                          from './Validators';

describe('FloatValidator', () => {
    const obj                                                                                     = new Date();
    const dataProvider: HashMap<{ value: AbstractControl; expected: FloatValidatorError | null }> = { // tslint:disable-line:no-any
        'integer value':          {
            value:    new FormControl(123),
            expected: {kitFormsFloat: {actual: 123}},
        },
        'negative integer value': {
            value:    new FormControl(-123),
            expected: {kitFormsFloat: {actual: -123}},
        },
        'float value':            {
            value:    new FormControl(123.45),
            expected: null,
        },
        'negative float value':   {
            value:    new FormControl(-123.45),
            expected: null,
        },
        'true value':             {
            value:    new FormControl(true),
            expected: {kitFormsFloat: {actual: true}},
        },
        'false value':            {
            value:    new FormControl(false),
            expected: {kitFormsFloat: {actual: false}},
        },
        'string value':           {
            value:    new FormControl('abc'),
            expected: {kitFormsFloat: {actual: 'abc'}},
        },
        'string integer value':   {
            value:    new FormControl('123'),
            expected: {kitFormsFloat: {actual: '123'}},
        },
        'empty string value':     {
            value:    new FormControl(''),
            expected: null,
        },
        'null value':             {
            value:    new FormControl(null),
            expected: null,
        },
        'HashMap value':          {
            value:    new FormControl({}),
            expected: {kitFormsFloat: {actual: {}}},
        },
        'object value':           {
            value:    new FormControl(obj),
            expected: {kitFormsFloat: {actual: obj}},
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(FloatValidator(data.value)).toEqual(data.expected);
            expect(Validators.float(data.value)).toEqual(data.expected);
        });
    });
});
