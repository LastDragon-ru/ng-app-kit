import {FormControl, FormGroup} from '@angular/forms';
import {setFormGroupErrors}     from './setFormGroupErrors';

describe('setFormGroupErrors()', () => {
    let group: FormGroup | null     = null;
    let child: FormControl | null   = null;
    let nested: FormGroup | null    = null;
    let control: FormControl | null = null;

    beforeEach(() => {
        group   = new FormGroup({
            control: new FormControl('control'),
            nested:  new FormGroup({
                child: new FormControl('nested.child'),
            }),
        });
        child   = <FormControl> group.get('nested.child');
        nested  = <FormGroup> group.get('nested');
        control = <FormControl> group.get('control');
    });

    it('setup', () => {
        expect(child).not.toBeNull();
        expect(child?.dirty).toBeFalse();
        expect(child?.touched).toBeFalse();

        expect(nested).not.toBeNull();
        expect(nested?.dirty).toBeFalse();
        expect(nested?.touched).toBeFalse();

        expect(control).not.toBeNull();
        expect(control?.dirty).toBeFalse();
        expect(control?.touched).toBeFalse();
    });

    it('FormGroup.setErrors() doesn\'t update errors for nested controls :(', () => {
        group?.setErrors({
            'nested.child': {invalid: true},
            nested:         {
                child: {invalid: true},
            },
        });

        expect(group?.errors).not.toBeNull();
        expect(child?.errors).toBeNull();
    });

    it('no group', () => {
        expect(setFormGroupErrors(null, {error: {invalid: true}})).not.toBeNull();
    });

    it('without touch', () => {
        child?.setErrors({
            existing: true,
        });

        setFormGroupErrors(group, {nested: {child: {invalid: true}}}, false);

        expect(child?.errors).toEqual({
            existing: true,
            invalid:  true,
        });
        expect(child?.dirty).toBeFalse();
        expect(child?.touched).toBeFalse();

        expect(nested?.errors).toBeNull();
        expect(nested?.dirty).toBeFalse();
        expect(nested?.touched).toBeFalse();

        expect(control?.errors).toBeNull();
        expect(control?.dirty).toBeFalse();
        expect(control?.touched).toBeFalse();
    });

    it('with touch', () => {
        setFormGroupErrors(group, {nested: {child: {invalid: true}}}, true);

        expect(child?.errors).toEqual({
            invalid: true,
        });
        expect(child?.dirty).toBeTrue();
        expect(child?.touched).toBeTrue();

        expect(nested?.errors).toBeNull();
        expect(nested?.dirty).toBeTrue();
        expect(nested?.touched).toBeTrue();

        expect(control?.errors).toBeNull();
        expect(control?.dirty).toBeFalse();
        expect(control?.touched).toBeFalse();
    });

    it('with unused', () => {
        expect(setFormGroupErrors(group, {
            nested: {
                child:   {invalid: true},
                control: {invalid: true},
            },
        })).toEqual({
            nested: {
                control: {invalid: true},
            },
        });
    });
});
