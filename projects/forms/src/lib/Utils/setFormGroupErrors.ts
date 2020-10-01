import {FormGroup}            from '@angular/forms';
import {ControlErrors}        from '../Classes/ControlErrors';
import {setFormControlErrors} from './setFormControlErrors';

/**
 * Set `FormGroup` errors.
 *
 * @return Unused errors
 */
export function setFormGroupErrors(
    group: FormGroup | null,
    errors: ControlErrors,
    touch: boolean = true,
): ControlErrors | null {
    let unused: ControlErrors | null = null;

    if (group) {
        for (const name in errors) {
            if (!errors.hasOwnProperty(name)) {
                continue;
            }

            const control = group.get(name);

            if (control instanceof FormGroup) {
                const nested = setFormGroupErrors(control, <ControlErrors> errors[name], touch);

                if (nested) {
                    (unused ||= {})[name] = nested;
                }
            } else if (control) {
                setFormControlErrors(control, errors[name], touch);
            } else {
                (unused ||= {})[name] = errors[name];
            }
        }
    } else {
        unused = errors;
    }

    return unused;
}
