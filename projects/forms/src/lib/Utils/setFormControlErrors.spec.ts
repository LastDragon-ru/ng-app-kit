import {FormControl}          from '@angular/forms';
import {setFormControlErrors} from './setFormControlErrors';

describe('setFormControlErrors()', () => {
    it('setFormControlErrors()', () => {
        const control = new FormControl('value');
        let changed   = false;

        control.setErrors({existing: 'error'});
        control.statusChanges.subscribe(() => changed = true);

        expect(control.touched).toBeFalse();
        expect(control.dirty).toBeFalse();

        setFormControlErrors(control, {test: 'error'});

        expect(control.errors).toEqual({
            test:     'error',
            existing: 'error',
        });
        expect(control.touched).toBeFalse();
        expect(control.dirty).toBeFalse();
        expect(changed).toBeTrue();

        const errors = control.errors;

        setFormControlErrors(control, {test: 'error'}, true);
        expect(control.errors).not.toBe(errors);
        expect(control.errors).toEqual({
            test:     'error',
            existing: 'error',
        });
        expect(control.touched).toBeTrue();
        expect(control.dirty).toBeTrue();
    });
});
