import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
import {HashMap}                                        from '@lastdragon-ru/ng-app-kit-core';
import {using}                                          from '@lastdragon-ru/ng-app-kit-core-testing';
import {BooleanValidator}                               from './BooleanValidator';
import {Validators}                                     from './Validators';

describe('BooleanValidator', () => {
    const obj                                                                                  = new Date();
    const dataProvider: HashMap<{ value: AbstractControl; expected: ValidationErrors | null }> = { // tslint:disable-line:no-any
        'integer value':          {
            value:    new FormControl(123),
            expected: {kitFormsBoolean: {actual: 123}},
        },
        'negative integer value': {
            value:    new FormControl(-123),
            expected: {kitFormsBoolean: {actual: -123}},
        },
        'float value':            {
            value:    new FormControl(123.45),
            expected: {kitFormsBoolean: {actual: 123.45}},
        },
        'negative float value':   {
            value:    new FormControl(-123.45),
            expected: {kitFormsBoolean: {actual: -123.45}},
        },
        'true value':             {
            value:    new FormControl(true),
            expected: null,
        },
        'false value':            {
            value:    new FormControl(false),
            expected: null,
        },
        'string value':           {
            value:    new FormControl('abc'),
            expected: {kitFormsBoolean: {actual: 'abc'}},
        },
        'string integer value':   {
            value:    new FormControl('123'),
            expected: {kitFormsBoolean: {actual: '123'}},
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
            expected: {kitFormsBoolean: {actual: {}}},
        },
        'object value':           {
            value:    new FormControl(obj),
            expected: {kitFormsBoolean: {actual: obj}},
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(BooleanValidator(data.value)).toEqual(data.expected);
            expect(Validators.boolean(data.value)).toEqual(data.expected);
        });
    });
});
