import {
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
}                             from '@angular/forms';
import {HashMap}              from '@lastdragon-ru/ng-app-kit-core';
import {using}                from '@lastdragon-ru/ng-app-kit-core-testing';
import {SameValidatorFactory} from './SameValidatorFactory';
import {Validators}           from './Validators';

describe('ConfirmedValidatorFactory', () => {
    const dataProvider: HashMap<{
        control: any, // tslint:disable-line:no-any
        confirm: any, // tslint:disable-line:no-any
        expected: {
            parent: ValidationErrors | null,
            control: ValidationErrors | null,
            confirm: ValidationErrors | null
        }
    }> = {
        'confirmed = true':  {
            control:  123,
            confirm:  123,
            expected: {
                parent:  null,
                control: null,
                confirm: null,
            },
        },
        'confirmed = false': {
            control:  123,
            confirm:  '123',
            expected: {
                parent:  null,
                control: null,
                confirm: {kitFormsSame: true},
            },
        },
    };

    using(dataProvider, (description, data) => {
        const test = (factory: (control: FormControl, confirm: FormControl) => ValidatorFn): void => {
            const control = new FormControl(data.control);
            const confirm = new FormControl(data.confirm);
            const parent  = new FormGroup({
                control: control,
                confirm: confirm,
            });

            expect(factory(control, confirm)(parent)).toEqual(data.expected.parent);

            expect(parent.errors).toEqual(data.expected.parent);
            expect(control.errors).toEqual(data.expected.control);
            expect(confirm.errors).toEqual(data.expected.confirm);
        };

        it(`ConfirmedValidatorFactory: ${description}`, () => {
            test((control, confirm) => SameValidatorFactory(control, confirm));
        });

        it(`Validators.confirmed(): ${description}`, () => {
            test((control, confirm) => Validators.same(control, confirm));
        });
    });
});
