import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators as AngularValidators,
}                           from '@angular/forms';
import {BooleanValidator}   from './BooleanValidator';
import {FloatValidator}     from './FloatValidator';
import {IntegerValidator}   from './IntegerValidator';
import {InValidatorFactory} from './InValidatorFactory';
import {NumberValidator}    from './NumberValidator';

export class Validators extends AngularValidators {
    public static number(control: AbstractControl): ValidationErrors | null {
        return NumberValidator(control);
    }

    public static integer(control: AbstractControl): ValidationErrors | null {
        return IntegerValidator(control);
    }

    public static float(control: AbstractControl): ValidationErrors | null {
        return FloatValidator(control);
    }

    public static boolean(control: AbstractControl): ValidationErrors | null {
        return BooleanValidator(control);
    }

    public static in(values: any[]): ValidatorFn { // tslint:disable-line:no-any
        return InValidatorFactory(values);
    }
}
