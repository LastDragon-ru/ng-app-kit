import {AbstractControl, FormControl}          from '@angular/forms';
import {HashMap}                               from '@lastdragon-ru/ng-app-kit-core';
import {using}                                 from '@lastdragon-ru/ng-app-kit-core-testing';
import {NumberValidator, NumberValidatorError} from './NumberValidator';
import {Validators}                            from './Validators';

describe('NumberValidator', () => {
    const obj                                                                                      = new Date();
    const dataProvider: HashMap<{ value: AbstractControl; expected: NumberValidatorError | null }> = { // tslint:disable-line:no-any
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
            expected: null,
        },
        'negative float value':   {
            value:    new FormControl(-123.45),
            expected: null,
        },
        'true value':             {
            value:    new FormControl(true),
            expected: {kitFormsNumber: {actual: true}},
        },
        'false value':            {
            value:    new FormControl(false),
            expected: {kitFormsNumber: {actual: false}},
        },
        'string value':           {
            value:    new FormControl('abc'),
            expected: {kitFormsNumber: {actual: 'abc'}},
        },
        'string integer value':   {
            value:    new FormControl('123'),
            expected: {kitFormsNumber: {actual: '123'}},
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
            expected: {kitFormsNumber: {actual: {}}},
        },
        'object value':           {
            value:    new FormControl(obj),
            expected: {kitFormsNumber: {actual: obj}},
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(NumberValidator(data.value)).toEqual(data.expected);
            expect(Validators.number(data.value)).toEqual(data.expected);
        });
    });
});
