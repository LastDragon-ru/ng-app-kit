import {BooleanValidatorError} from '../Validators/BooleanValidator';
import {FloatValidatorError}   from '../Validators/FloatValidator';
import {IntegerValidatorError} from '../Validators/IntegerValidator';
import {InValidatorError}      from '../Validators/InValidatorFactory';
import {NotInValidatorError}   from '../Validators/NotInValidatorFactory';
import {NumberValidatorError}  from '../Validators/NumberValidator';
import {SameValidatorError}    from '../Validators/SameValidatorFactory';

export type ValidationErrors = Partial<AngularMinValidatorError
    & AngularMaxValidatorError
    & AngularRequiredValidatorError
    & AngularEmailValidatorError
    & AngularMinLengthValidatorError
    & AngularMaxLengthValidatorError
    & AngularPatternValidatorError
    & BooleanValidatorError
    & FloatValidatorError
    & IntegerValidatorError
    & InValidatorError
    & NotInValidatorError
    & NumberValidatorError
    & SameValidatorError>;

export type AngularMinValidatorError = { min: { 'min': number, 'actual': unknown } };
export type AngularMaxValidatorError = { max: { 'max': number, 'actual': unknown } };
export type AngularRequiredValidatorError = { required: boolean };
export type AngularEmailValidatorError = { email: boolean };
export type AngularMinLengthValidatorError = { minlength: { 'requiredLength': number, 'actualLength': number } };
export type AngularMaxLengthValidatorError = { maxlength: { 'requiredLength': number, 'actualLength': number } };
export type AngularPatternValidatorError = { pattern: { 'requiredPattern': string, 'actualValue': unknown } };
