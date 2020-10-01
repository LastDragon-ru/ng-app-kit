import {AbstractControl, FormControl}            from '@angular/forms';
import {HashMap}                                 from '@lastdragon-ru/ng-app-kit-core';
import {using}                                   from '@lastdragon-ru/ng-app-kit-core-testing';
import {IntegerValidator, IntegerValidatorError} from './IntegerValidator';
import {Validators}                              from './Validators';

describe('IntegerValidator', () => {
    const obj                                                                                       = new Date();
    const dataProvider: HashMap<{ value: AbstractControl; expected: IntegerValidatorError | null }> = { // tslint:disable-line:no-any
        'integer value':          {
            value:    new FormControl(123),
            expected: null,
        },
        'negative integer value': {
            value:    new FormControl(-123),
            expected: null,
        },
        'float value':            {
            value:    new FormControl(123.45),
            expected: {kitFormsInteger: {actual: 123.45}},
        },
        'negative float value':   {
            value:    new FormControl(-123.45),
            expected: {kitFormsInteger: {actual: -123.45}},
        },
        'true value':             {
            value:    new FormControl(true),
            expected: {kitFormsInteger: {actual: true}},
        },
        'false value':            {
            value:    new FormControl(false),
            expected: {kitFormsInteger: {actual: false}},
        },
        'string value':           {
            value:    new FormControl('abc'),
            expected: {kitFormsInteger: {actual: 'abc'}},
        },
        'string integer value':   {
            value:    new FormControl('123'),
            expected: {kitFormsInteger: {actual: '123'}},
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
            expected: {kitFormsInteger: {actual: {}}},
        },
        'object value':           {
            value:    new FormControl(obj),
            expected: {kitFormsInteger: {actual: obj}},
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(IntegerValidator(data.value)).toEqual(data.expected);
            expect(Validators.integer(data.value)).toEqual(data.expected);
        });
    });
});
