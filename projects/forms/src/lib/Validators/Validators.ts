import {
    AbstractControl,
    ValidationErrors,
    Validators as AngularValidators,
}                         from '@angular/forms';
import {IntegerValidator} from './IntegerValidator';

export class Validators extends AngularValidators {
    public static integer(control: AbstractControl): ValidationErrors | null {
        return IntegerValidator(control);
    }
}
