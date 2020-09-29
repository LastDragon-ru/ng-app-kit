import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';
import {HashMap}                                        from '@lastdragon-ru/ng-app-kit-core';
import {using}                                          from '@lastdragon-ru/ng-app-kit-core-testing';
import {InValidatorFactory}                             from './InValidatorFactory';
import {Validators}                                     from './Validators';

describe('InValidatorFactory', () => {
    const dataProvider: HashMap<{ value: AbstractControl; values: any[], expected: ValidationErrors | null }> = { // tslint:disable-line:no-any
        'null value':   {
            value:    new FormControl(null),
            values:   [1, 2, 3],
            expected: null,
        },
        'value in':     {
            value:    new FormControl(1),
            values:   [1, 2, 3],
            expected: null,
        },
        'value not in': {
            value:    new FormControl('1'),
            values:   [1, 2, 3],
            expected: {
                kitFormsIn: {
                    actual: '1',
                    values: [1, 2, 3],
                },
            },
        },
    };

    using(dataProvider, (description, data) => {
        it(description, () => {
            expect(InValidatorFactory(data.values)(data.value)).toEqual(data.expected);
            expect(Validators.in(data.values)(data.value)).toEqual(data.expected);
        });
    });
});
