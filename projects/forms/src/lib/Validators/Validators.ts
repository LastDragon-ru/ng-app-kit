import {
    AbstractControl,
    ValidationErrors,
    Validators as AngularValidators,
}                         from '@angular/forms';
import {FloatValidator}   from './FloatValidator';
import {IntegerValidator} from './IntegerValidator';

export class Validators extends AngularValidators {
    public static integer(control: AbstractControl): ValidationErrors | null {
        return IntegerValidator(control);
    }

    public static float(control: AbstractControl): ValidationErrors | null {
        return FloatValidator(control);
    }
}
